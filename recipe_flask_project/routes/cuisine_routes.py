from flask import Blueprint, jsonify, request
from db import get_db

cuisine_routes = Blueprint("cuisine_routes", __name__)
db = get_db()
cuisine_collection = db["Cuisine"]

# CREATE - Add new cuisine
@cuisine_routes.route("/cuisines", methods=["POST"])
def add_cuisine():
    data = request.get_json()
    cuisine_collection.insert_one(data)
    return jsonify({"message": "Cuisine added successfully!"}), 201

# READ - Get all cuisines
@cuisine_routes.route("/cuisines", methods=["GET"])
def get_cuisines():
    cuisines = list(cuisine_collection.find({}, {"_id": 0}))
    return jsonify(cuisines)

# UPDATE - Edit cuisine by name
@cuisine_routes.route("/cuisines/<string:name>", methods=["PUT"])
def update_cuisine(name):
    data = request.get_json()
    result = cuisine_collection.update_one({"name": name}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Cuisine updated successfully!"})
    return jsonify({"message": "No matching cuisine found."}), 404

# DELETE - Delete cuisine by name
@cuisine_routes.route("/cuisines/<string:name>", methods=["DELETE"])
def delete_cuisine(name):
    result = cuisine_collection.delete_one({"name": name})
    if result.deleted_count:
        return jsonify({"message": "Cuisine deleted successfully!"})
    return jsonify({"message": "No matching cuisine found."}), 404
