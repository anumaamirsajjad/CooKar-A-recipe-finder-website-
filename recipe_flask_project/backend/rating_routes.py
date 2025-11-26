from flask import Blueprint, jsonify, Response,request
from bson import ObjectId, errors
from bson.json_util import dumps
from db import get_db

rating_routes = Blueprint("rating_routes", __name__)

@rating_routes.route("/ratings/<string:recipe_id>", methods=["GET"])
def get_rating(recipe_id):
    db = get_db()
    rating_collection = db["Rating"]

    rating = None

    # Try matching as ObjectId
    try:
        oid = ObjectId(recipe_id)
        rating = rating_collection.find_one({"recipe_id": oid})
    except errors.InvalidId:
        pass

    # If not found, try matching as string (in case recipe_id stored as string)
    if not rating:
        rating = rating_collection.find_one({"recipe_id": recipe_id})

    # If still not found, return default
    if not rating:
        return jsonify({"rating": 0, "reviews_count": 0})

    # Return safely with dumps to handle ObjectId
    return Response(dumps(rating), mimetype="application/json")



@rating_routes.route("/ratings", methods=["POST"])
def add_rating():
    db = get_db()
    rating_collection = db.Rating

    data = request.get_json()
    if not data or "recipe_id" not in data or "rating" not in data:
        return jsonify({"message": "Invalid data"}), 400

    recipe_id = ObjectId(data["recipe_id"])
    new_rating = float(data["rating"])

    # Check if rating already exists for this recipe
    existing_rating_doc = rating_collection.find_one({"recipe_id": recipe_id})

    if existing_rating_doc is None:
        # FIRST RATING → insert directly
        rating_collection.insert_one({
            "recipe_id": recipe_id,
            "rating": new_rating
        })
        updated_avg = new_rating
    else:
        # AVERAGE = (old_avg + new_rating) / 2
        old_avg = float(existing_rating_doc["rating"])
        updated_avg = (old_avg + new_rating) / 2  # running average

        # Update the single document
        rating_collection.update_one(
            {"recipe_id": recipe_id},
            {"$set": {"rating": updated_avg}}
        )

    return jsonify({
        "message": "Rating updated successfully!",
        "average_rating": round(updated_avg, 2)
    }), 201
