from flask import Blueprint, jsonify, request
from db import get_db
import urllib.parse

recipe_routes = Blueprint("recipe_routes", __name__)

# Helper: Validate required fields
def validate_recipe(data):
    required_fields = ["recipe_id", "title", "cooking_time", "calories", "serving_size", "youtube_link"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return False, f"Missing fields: {', '.join(missing)}"
    return True, None

# CREATE - Add new recipe
@recipe_routes.route("/recipes", methods=["POST"])
def add_recipe():
    db = get_db()
    recipe_collection = db["Recipe"]
    
    data = request.get_json()
    valid, error = validate_recipe(data)
    
    if not valid:
        return jsonify({"error": error}), 400
    
    recipe_collection.insert_one(data)
    return jsonify({"message": "Recipe added successfully!"}), 201


# GET recipe by name/title
@recipe_routes.route("/recipes/<string:name>", methods=["GET"])
def get_recipe_by_name(name):
    db = get_db()
    recipe_collection = db["Recipe"]
    
    decoded_name = urllib.parse.unquote(name)
    print(f"Searching for recipe: {decoded_name}")

    # Search by title or name (covers Spoonacular + custom)
    recipe = recipe_collection.find_one({
        "$or": [
            {"title": decoded_name},
            {"name": decoded_name}
        ]
    })

    if not recipe:
        print(f"Recipe NOT found: {decoded_name}")
        return jsonify({"message": "No matching recipe found."}), 404

    # Convert ObjectId to string
    recipe["_id"] = str(recipe["_id"])
    print(f"Recipe found: {recipe.get('title') or recipe.get('name')}")

    return jsonify(recipe)


# READ - Get all recipes
@recipe_routes.route("/recipes", methods=["GET"])
def get_recipes():
    db = get_db()
    recipe_collection = db["Recipe"]
    recipes = list(recipe_collection.find({}, {"_id": 0}))
    return jsonify(recipes)


# UPDATE - Edit recipe by recipe_id
@recipe_routes.route("/recipes/update/<string:recipe_id>", methods=["PUT"])
def update_recipe(recipe_id):
    db = get_db()
    recipe_collection = db["Recipe"]
    
    data = request.get_json()
    result = recipe_collection.update_one({"recipe_id": recipe_id}, {"$set": data})
    
    if result.modified_count:
        return jsonify({"message": "Recipe updated successfully!"})
    
    return jsonify({"message": "No matching recipe found."}), 404


# DELETE - Delete recipe by recipe_id
@recipe_routes.route("/recipes/delete/<string:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    db = get_db()
    recipe_collection = db["Recipe"]
    
    result = recipe_collection.delete_one({"recipe_id": recipe_id})
    
    if result.deleted_count:
        return jsonify({"message": "Recipe deleted successfully!"})
    
    return jsonify({"message": "No matching recipe found."}), 404
