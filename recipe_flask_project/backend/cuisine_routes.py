from flask import Blueprint, jsonify, request
from db import get_db  # Change this line

cuisine_routes = Blueprint("cuisine_routes", __name__)

# CREATE - Add new cuisine
@cuisine_routes.route("/cuisines", methods=["POST"])
def add_cuisine():
    db = get_db()  # Call get_db INSIDE the route function
    cuisine_collection = db["Cuisine"]  # Define collection INSIDE the route
    
    data = request.get_json()
    cuisine_collection.insert_one(data)
    return jsonify({"message": "Cuisine added successfully!"}), 201

# READ - Get all cuisines
@cuisine_routes.route("/cuisines", methods=["GET"])
def get_cuisines():
    db = get_db()  # Call get_db INSIDE the route function
    cuisine_collection = db["Cuisine"]  # Define collection INSIDE the route
    
    cuisines = list(cuisine_collection.find({}, {"_id": 0}))
    return jsonify(cuisines)

# UPDATE - Edit cuisine by name
@cuisine_routes.route("/cuisines/<string:name>", methods=["PUT"])
def update_cuisine(name):
    db = get_db()  # Call get_db INSIDE the route function
    cuisine_collection = db["Cuisine"]  # Define collection INSIDE the route
    
    data = request.get_json()
    result = cuisine_collection.update_one({"name": name}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Cuisine updated successfully!"})
    return jsonify({"message": "No matching cuisine found."}), 404

# DELETE - Delete cuisine by name
@cuisine_routes.route("/cuisines/<string:name>", methods=["DELETE"])
def delete_cuisine(name):
    db = get_db()  # Call get_db INSIDE the route function
    cuisine_collection = db["Cuisine"]  # Define collection INSIDE the route
    
    result = cuisine_collection.delete_one({"name": name})
    if result.deleted_count:
        return jsonify({"message": "Cuisine deleted successfully!"})
    return jsonify({"message": "No matching cuisine found."}), 404
