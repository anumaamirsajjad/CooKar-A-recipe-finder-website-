from flask import Blueprint, jsonify, request
from db import get_db

rating_routes = Blueprint("rating_routes", __name__)
db = get_db()
rating_collection = db["Rating"]

# CREATE - Add new rating
@rating_routes.route("/ratings", methods=["POST"])
def add_rating():
    data = request.get_json()
    rating_collection.insert_one(data)
    return jsonify({"message": "Rating added successfully!"}), 201

# READ - Get all ratings
@rating_routes.route("/ratings", methods=["GET"])
def get_ratings():
    ratings = list(rating_collection.find({}, {"_id": 0}))
    return jsonify(ratings)

# UPDATE - Edit rating by name
@rating_routes.route("/ratings/<string:name>", methods=["PUT"])
def update_rating(name):
    data = request.get_json()
    result = rating_collection.update_one({"name": name}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Rating updated successfully!"})
    return jsonify({"message": "No matching rating found."}), 404

# DELETE - Delete rating by name
@rating_routes.route("/ratings/<string:name>", methods=["DELETE"])
def delete_rating(name):
    result = rating_collection.delete_one({"name": name})
    if result.deleted_count:
        return jsonify({"message": "Rating deleted successfully!"})
    return jsonify({"message": "No matching rating found."}), 404