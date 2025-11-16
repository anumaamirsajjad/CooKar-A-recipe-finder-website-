from flask import Blueprint, jsonify, request
from db import get_db  # Change this line

dietary_routes = Blueprint("dietary_routes", __name__)


# CREATE - Add new dietary preference
@dietary_routes.route("/dietary-preferences", methods=["POST"])
def add_dietary_preference():
    db = get_db()
    dietary_collection = db["DietaryPreference"]
    data = request.get_json()
    dietary_collection.insert_one(data)
    return jsonify({"message": "Dietary preference added successfully!"}), 201

# READ - Get all dietary preferences
@dietary_routes.route("/dietary-preferences", methods=["GET"])
def get_dietary_preferences():
    db = get_db()
    dietary_collection = db["DietaryPreference"]
    dietary_preferences = list(dietary_collection.find({}, {"_id": 0}))
    return jsonify(dietary_preferences)

# READ - Get dietary preference by name
@dietary_routes.route("/dietary-preferences/<string:name>", methods=["GET"])
def get_dietary_preference(name):
    db = get_db()
    dietary_collection = db["DietaryPreference"]
    dietary_preference = dietary_collection.find_one({"name": name}, {"_id": 0})
    if dietary_preference:
        return jsonify(dietary_preference)
    return jsonify({"message": "No matching dietary preference found."}), 404

# UPDATE - Edit dietary preference by name
@dietary_routes.route("/dietary-preferences/<string:name>", methods=["PUT"])
def update_dietary_preference(name):
    db = get_db()
    dietary_collection = db["DietaryPreference"]
    data = request.get_json()
    result = dietary_collection.update_one({"name": name}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Dietary preference updated successfully!"})
    return jsonify({"message": "No matching dietary preference found."}), 404

# DELETE - Delete dietary preference by name
@dietary_routes.route("/dietary-preferences/<string:name>", methods=["DELETE"])
def delete_dietary_preference(name):
    db = get_db()
    dietary_collection = db["DietaryPreference"]
    result = dietary_collection.delete_one({"name": name})
    if result.deleted_count:
        return jsonify({"message": "Dietary preference deleted successfully!"})
    return jsonify({"message": "No matching dietary preference found."}), 404