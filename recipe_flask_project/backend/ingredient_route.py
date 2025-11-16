from flask import Blueprint, jsonify, request
from db import get_db  # Change this line

ingredients_routes = Blueprint("ingredients_routes", __name__)

# CREATE - Add new ingredient
@ingredients_routes.route("/ingredients", methods=["POST"])
def add_ingredient():
    db = get_db()  # Call get_db INSIDE the route function
    ingredients_collection = db["Ingredients"]  # Define collection INSIDE the route
    data = request.get_json()
    ingredients_collection.insert_one(data)
    return jsonify({"message": "Ingredient added successfully!"}), 201

# READ - Get all ingredients
@ingredients_routes.route("/ingredients", methods=["GET"])
def get_ingredients():
    db = get_db()  # Call get_db INSIDE the route function
    ingredients_collection = db["Ingredients"]  # Define collection INSIDE the route
    ingredients = list(ingredients_collection.find({}, {"_id": 0}))
    return jsonify(ingredients)

# READ - Get ingredient by name
@ingredients_routes.route("/ingredients/<string:name>", methods=["GET"])
def get_ingredient(name):
    db = get_db()  # Call get_db INSIDE the route function
    ingredients_collection = db["Ingredients"]  # Define collection INSIDE the route
    ingredient = ingredients_collection.find_one({"name": name}, {"_id": 0})
    if ingredient:
        return jsonify(ingredient)
    return jsonify({"message": "No matching ingredient found."}), 404

# UPDATE - Edit ingredient by name
@ingredients_routes.route("/ingredients/<string:name>", methods=["PUT"])
def update_ingredient(name):
    db = get_db()  # Call get_db INSIDE the route function
    ingredients_collection = db["Ingredients"]  # Define collection INSIDE the route
    data = request.get_json()
    result = ingredients_collection.update_one({"name": name}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Ingredient updated successfully!"})
    return jsonify({"message": "No matching ingredient found."}), 404

# DELETE - Delete ingredient by name
@ingredients_routes.route("/ingredients/<string:name>", methods=["DELETE"])
def delete_ingredient(name):
    db = get_db()  # Call get_db INSIDE the route function
    ingredients_collection = db["Ingredients"]  # Define collection INSIDE the route
    result = ingredients_collection.delete_one({"name": name})
    if result.deleted_count:
        return jsonify({"message": "Ingredient deleted successfully!"})
    return jsonify({"message": "No matching ingredient found."}), 404