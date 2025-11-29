from flask import Blueprint, jsonify, request, Response, make_response
from db import get_db
from bson.json_util import dumps
from bson import ObjectId

comment_routes = Blueprint("comment_routes", __name__)

# POST + OPTIONS (preflight)
@comment_routes.route("/comments", methods=["POST", "OPTIONS"])
def add_comment():

    # Handle CORS preflight
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200
    
    db = get_db()
    comment_collection = db["Comments"]

    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body cannot be empty"}), 400

    # Accept both field name formats
    recipe_id_field = data.get("recipeId") or data.get("recipe_id")
    comment_text = data.get("commentText") or data.get("comment")
    
    if not recipe_id_field or not data.get("user") or not comment_text or not data.get("date"):
        return jsonify({"message": "Missing required fields: user, recipe_id/recipeId, comment/commentText, date"}), 400

    comment_doc = {
        "user": data["user"],
        "recipe_id": ObjectId(recipe_id_field),
        "comment": comment_text,
        "date": data["date"],
    }

    result = comment_collection.insert_one(comment_doc)

    return jsonify({"message": "Comment added successfully!", "id": str(result.inserted_id)}), 201


# GET all comments
@comment_routes.route("/comments", methods=["GET"])
def get_comments():
    db = get_db()
    comment_collection = db["Comments"]

    comments = list(comment_collection.find({}))
    return Response(dumps(comments), mimetype="application/json")


# UPDATE
@comment_routes.route("/comments/<string:name>", methods=["PUT"])
def update_comment(name):
    db = get_db()
    comment_collection = db["Comments"]

    data = request.get_json()
    if not data:
        return jsonify({"message": "Update data cannot be empty"}), 400

    result = comment_collection.update_one({"name": name}, {"$set": data})

    if result.matched_count == 0:
        return jsonify({"message": "No matching comment found."}), 404

    return jsonify({"message": "Comment updated successfully!"}), 200


# DELETE
@comment_routes.route("/comments/<string:name>", methods=["DELETE"])
def delete_comment(name):
    db = get_db()
    comment_collection = db["Comments"]

    result = comment_collection.delete_one({"name": name})

    if result.deleted_count == 0:
        return jsonify({"message": "No matching comment found."}), 404

    return jsonify({"message": "Comment deleted successfully!"}), 200


# COUNT comments per recipe
@comment_routes.route("/comments/count/<string:recipe_id>", methods=["GET"])
def get_comments_count(recipe_id):
    db = get_db()
    comment_collection = db["Comments"]

    try:
        oid = ObjectId(recipe_id)
    except:
        return jsonify({"error": "Invalid recipe_id"}), 400

    # Check both field name formats
    count = comment_collection.count_documents({
        "$or": [
            {"recipe_id": oid},
            {"recipeId": oid}
        ]
    })
    return jsonify({"comments_count": count})


# GET comments for a specific recipe
@comment_routes.route("/comments/recipe/<string:recipe_id>", methods=["GET"])
def get_recipe_comments(recipe_id):
    db = get_db()
    comment_collection = db["Comments"]

    try:
        oid = ObjectId(recipe_id)
    except:
        return jsonify({"error": "Invalid recipe_id"}), 400

    # Fetch all comments for this recipe, checking both field formats
    comments = list(comment_collection.find({
        "$or": [
            {"recipe_id": oid},
            {"recipeId": oid}
        ]
    }).sort("date", -1))  # Sort by date, newest first
    
    return Response(dumps(comments), mimetype="application/json")
