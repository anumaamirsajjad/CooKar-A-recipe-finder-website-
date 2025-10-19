from flask import Blueprint, jsonify, request
from db import get_db

recipe_routes = Blueprint("recipe_routes", __name__)
db = get_db()
recipe_collection = db["Recipe"]

# Helper: Validate required fields
def validate_recipe(data):
    required_fields = ["recipe_id", "name", "cooking_time", "calories", "serving_size", "youtube_link"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return False, f"Missing fields: {', '.join(missing)}"
    return True, None

# CREATE - Add new recipe
@recipe_routes.route("/recipes", methods=["POST"])
def add_recipe():
    data = request.get_json()
    valid, error = validate_recipe(data)
    if not valid:
        return jsonify({"error": error}), 400
    recipe_collection.insert_one(data)
    return jsonify({"message": "Recipe added successfully!"}), 201

# READ - Get all recipes
@recipe_routes.route("/recipes", methods=["GET"])
def get_recipes():
    recipes = list(recipe_collection.find({}, {"_id": 0}))
    return jsonify(recipes)

# UPDATE - Edit recipe by recipe_id
@recipe_routes.route("/recipes/<string:recipe_id>", methods=["PUT"])
def update_recipe(recipe_id):
    data = request.get_json()
    result = recipe_collection.update_one({"recipe_id": recipe_id}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Recipe updated successfully!"})
    return jsonify({"message": "No matching recipe found."}), 404

# DELETE - Delete recipe by recipe_id
@recipe_routes.route("/recipes/<string:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    result = recipe_collection.delete_one({"recipe_id": recipe_id})
    if result.deleted_count:
        return jsonify({"message": "Recipe deleted successfully!"})
    return jsonify({"message": "No matching recipe found."}), 404