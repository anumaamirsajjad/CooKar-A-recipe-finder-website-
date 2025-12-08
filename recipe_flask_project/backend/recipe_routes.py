# # from flask import Blueprint, jsonify, request, Response
# # from db import get_db
# # import urllib.parse
# # from bson.json_util import dumps  # handles ObjectId serialization


# # recipe_routes = Blueprint("recipe_routes", __name__)

# # # Helper: Validate required fields
# # def validate_recipe(data):
# #     required_fields = ["recipe_id", "title", "cooking_time", "calories", "serving_size", "youtube_link"]
# #     missing = [field for field in required_fields if field not in data]
# #     if missing:
# #         return False, f"Missing fields: {', '.join(missing)}"
# #     return True, None

# # # CREATE - Add new recipe
# # @recipe_routes.route("/recipes", methods=["POST"])
# # def add_recipe():
# #     db = get_db()
# #     recipe_collection = db["Recipe"]
    
# #     data = request.get_json()
# #     valid, error = validate_recipe(data)
    
# #     if not valid:
# #         return jsonify({"error": error}), 400
    
# #     recipe_collection.insert_one(data)
# #     return jsonify({"message": "Recipe added successfully!"}), 201



# # @recipe_routes.route("/recipes/<string:name>", methods=["GET"])
# # def get_recipe_by_name(name):
# #     db = get_db()
# #     recipe_collection = db["Recipe"]
    
# #     decoded_name = urllib.parse.unquote(name)

# #     recipe = recipe_collection.find_one({
# #         "$or": [
# #             {"title": decoded_name},
# #             {"name": decoded_name}
# #         ]
# #     })

# #     if not recipe:
# #         return jsonify({"message": "No matching recipe found."}), 404

# #     # Use dumps to safely convert ObjectId
# #     return Response(
# #         dumps(recipe),
# #         mimetype="application/json"
# #     )


# # # READ - Get all recipes
# # @recipe_routes.route("/recipes", methods=["GET"])
# # def get_recipes():
# #     db = get_db()
# #     recipe_collection = db["Recipe"]
    
# #     recipes = list(recipe_collection.find({}))
# #     return Response(dumps(recipes), mimetype="application/json")

# # # UPDATE - Edit recipe by recipe_id
# # @recipe_routes.route("/recipes/update/<string:recipe_id>", methods=["PUT"])
# # def update_recipe(recipe_id):
# #     db = get_db()
# #     recipe_collection = db["Recipe"]
    
# #     data = request.get_json()
# #     result = recipe_collection.update_one({"recipe_id": recipe_id}, {"$set": data})
    
# #     if result.modified_count:
# #         return jsonify({"message": "Recipe updated successfully!"})
    
# #     return jsonify({"message": "No matching recipe found."}), 404

# # # DELETE - Delete recipe by recipe_id
# # @recipe_routes.route("/recipes/delete/<string:recipe_id>", methods=["DELETE"])
# # def delete_recipe(recipe_id):
# #     db = get_db()
# #     recipe_collection = db["Recipe"]
    
# #     result = recipe_collection.delete_one({"recipe_id": recipe_id})
    
# #     if result.deleted_count:
# #         return jsonify({"message": "Recipe deleted successfully!"})
    
# #     return jsonify({"message": "No matching recipe found."}), 404


# from flask import Blueprint, jsonify, Response
# from db import get_db
# import urllib.parse
# from bson.json_util import dumps, ObjectId

# # ✅ Define the Blueprint
# recipe_routes = Blueprint("recipe_routes", __name__)

# def resolve_ids(id_list):
#     """Helper to normalize IDs (ObjectId, dict with $oid, or string)."""
#     ids = []
#     for i in id_list:
#         if isinstance(i, dict) and "$oid" in i:
#             ids.append(ObjectId(i["$oid"]))
#         elif isinstance(i, ObjectId):
#             ids.append(i)
#         elif isinstance(i, str):
#             try:
#                 ids.append(ObjectId(i))
#             except:
#                 pass
#     return ids

# def enrich_recipe(recipe, db):
#     """Attach cuisine, dietary, ingredients, comments, ratings to recipe."""
#     ingredients_collection = db["Ingredients"]
#     cuisine_collection = db["Cuisine"]
#     diet_collection = db["Dietary"]
#     comments_collection = db["Comments"]
#     ratings_collection = db["Ratings"]
# @recipe_routes.route("/cuisines", methods=["GET"])
# def get_cuisines():
#     db = get_db()
#     cuisines = list(db["Cuisine"].find({}, {"name": 1}))
#     return Response(dumps(cuisines), mimetype="application/json")

# @recipe_routes.route("/dietary-preferences", methods=["GET"])
# def get_dietary_preferences():
#     db = get_db()
#     dietary_collection = db["DietaryPreference"]
#     dietary = list(dietary_collection.find({}, {"name": 1}))
#     return Response(dumps(dietary), mimetype="application/json")
#     # ✅ Cuisine
#     if recipe.get("cuisine_ids"):
#         ids = resolve_ids(recipe["cuisine_ids"])
#         if ids:
#             cuisines = [c.get("name") for c in cuisine_collection.find({"_id": {"$in": ids}})]
#             recipe["cuisineNames"] = cuisines

#     # ✅ Dietary Preferences
#     if recipe.get("diet_ids"):
#         ids = resolve_ids(recipe["diet_ids"])
#         if ids:
#             diets = [d.get("name") for d in diet_collection.find({"_id": {"$in": ids}})]
#             recipe["dietaryNames"] = diets

#     # ✅ Ingredients
#     if recipe.get("ingredients"):
#         ids = resolve_ids(recipe["ingredients"])
#         if ids:
#             resolved = list(ingredients_collection.find({"_id": {"$in": ids}}))
#             recipe["ingredientNames"] = [
#                 f"{r.get('quantity','')} {r.get('name','')}".strip()
#                 for r in resolved
#             ]

#     # ✅ Comments
#     recipe_oid = recipe.get("_id")
#     if recipe_oid:
#         comments = list(comments_collection.find({
#             "$or": [
#                 {"recipe_id": recipe_oid},
#                 {"recipe_id": str(recipe_oid)}
#             ]
#         }).limit(3))
#         recipe["comments"] = [c.get("comment") for c in comments]

#     # ✅ Ratings
#     if recipe_oid:
#         ratings = list(ratings_collection.find({
#             "$or": [
#                 {"recipe_id": recipe_oid},
#                 {"recipe_id": str(recipe_oid)}
#             ]
#         }))
#         if ratings:
#             scores = [float(r.get("rating", 0)) for r in ratings]
#             recipe["ratingAvg"] = sum(scores) / len(scores)
#             recipe["ratingCount"] = len(ratings)

#     return recipe



# @recipe_routes.route("/recipes/<string:name>", methods=["GET"])
# def get_recipe_by_name(name):
#     db = get_db()
#     recipe_collection = db["Recipe"]

#     decoded_name = urllib.parse.unquote(name)

#     decoded_name = urllib.parse.unquote(name)
#     recipe = recipe_collection.find_one({
#         "$or": [
#             {"title": decoded_name},
#             {"name": decoded_name}
#         ]
#     })

#     if not recipe:
#         return jsonify({"message": "No matching recipe found."}), 404

#     recipe = enrich_recipe(recipe, db)
#     return Response(dumps(recipe), mimetype="application/json")


#     # Return JSON safely including ObjectId → converted automatically
#     return Response(
#         dumps(recipe),
#         mimetype="application/json"
#     )

# # READ - Get all recipes
# @recipe_routes.route("/recipes", methods=["GET"])
# def get_recipes():
#     db = get_db()
#     recipe_collection = db["Recipe"]

#     recipes = list(recipe_collection.find({}))
#     enriched = [enrich_recipe(r, db) for r in recipes]

#     return Response(dumps(enriched), mimetype="application/json")


from flask import Blueprint, jsonify, Response, request
from db import get_db
import urllib.parse
from bson.json_util import dumps, ObjectId
from datetime import datetime

# ✅ Define the Blueprint
recipe_routes = Blueprint("recipe_routes", __name__)

def resolve_ids(id_list):
    """Helper to normalize IDs (ObjectId, dict with $oid, or string)."""
    ids = []
    for i in id_list:
        if isinstance(i, dict) and "$oid" in i:
            ids.append(ObjectId(i["$oid"]))
        elif isinstance(i, ObjectId):
            ids.append(i)
        elif isinstance(i, str):
            try:
                ids.append(ObjectId(i))
            except:
                pass
    return ids

def enrich_recipe(recipe, db):
    """Attach cuisine, dietary, ingredients, comments, ratings to recipe."""
    ingredients_collection = db["Ingredients"]
    cuisine_collection = db["Cuisine"]
    diet_collection = db["DietaryPreference"]
    comments_collection = db["Comments"]
    ratings_collection = db["Ratings"]

    # ✅ Cuisine
    if recipe.get("cuisine_ids"):
        ids = resolve_ids(recipe["cuisine_ids"])
        if ids:
            cuisines = [c.get("name") for c in cuisine_collection.find({"_id": {"$in": ids}})]
            recipe["cuisineNames"] = cuisines

    # ✅ Dietary Preferences
    if recipe.get("diet_ids"):
        ids = resolve_ids(recipe["diet_ids"])
        if ids:
            diets = [d.get("name") for d in diet_collection.find({"_id": {"$in": ids}})]
            recipe["dietaryNames"] = diets

    # ✅ Ingredients
    if recipe.get("ingredients"):
        ids = resolve_ids(recipe["ingredients"])
        if ids:
            resolved = list(ingredients_collection.find({"_id": {"$in": ids}}))
            recipe["ingredientNames"] = [
                f"{r.get('quantity','')} {r.get('name','')}".strip()
                for r in resolved
            ]

    # ✅ Comments
    recipe_oid = recipe.get("_id")
    if recipe_oid:
        comments = list(comments_collection.find({
            "$or": [
                {"recipe_id": recipe_oid},
                {"recipe_id": str(recipe_oid)}
            ]
        }).limit(3))
        recipe["comments"] = [c.get("comment") for c in comments]

    # ✅ Ratings
    if recipe_oid:
        ratings = list(ratings_collection.find({
            "$or": [
                {"recipe_id": recipe_oid},
                {"recipe_id": str(recipe_oid)}
            ]
        }))
        if ratings:
            scores = [float(r.get("rating", 0)) for r in ratings]
            recipe["ratingAvg"] = sum(scores) / len(ratings)
            recipe["ratingCount"] = len(ratings)

    return recipe

# ✅ Get all cuisines
@recipe_routes.route("/cuisines", methods=["GET"])
def get_cuisines():
    db = get_db()
    cuisines = list(db["Cuisine"].find({}, {"name": 1}))
    return Response(dumps(cuisines), mimetype="application/json")

# ✅ Get all dietary preferences
@recipe_routes.route("/dietary-preferences", methods=["GET"])
def get_dietary_preferences():
    db = get_db()
    dietary_collection = db["DietaryPreference"]
    dietary = list(dietary_collection.find({}, {"name": 1}))
    return Response(dumps(dietary), mimetype="application/json")

# ✅ Get recipe by name
@recipe_routes.route("/recipes/<string:name>", methods=["GET"])
def get_recipe_by_name(name):
    db = get_db()
    recipe_collection = db["Recipe"]

    decoded_name = urllib.parse.unquote(name)
    recipe = recipe_collection.find_one({
        "$or": [
            {"title": decoded_name},
            {"name": decoded_name}
        ]
    })

    if not recipe:
        return jsonify({"message": "No matching recipe found."}), 404

    recipe = enrich_recipe(recipe, db)
    return Response(dumps(recipe), mimetype="application/json")

# ✅ Get all recipes
@recipe_routes.route("/recipes", methods=["GET"])
def get_recipes():
    db = get_db()
    recipe_collection = db["Recipe"]

    recipes = list(recipe_collection.find({}))
    # Don't enrich - recipes already have cuisineNames, dietaryNames, ingredients embedded
    return Response(dumps(recipes), mimetype="application/json")


@recipe_routes.route("/recipes", methods=["POST"])
def add_recipe():
    db = get_db()
    recipe_collection = db["Recipe"]
    cuisine_collection = db["Cuisine"]
    diet_collection = db["DietaryPreference"]

    data = request.get_json()

    # Basic validation
    required_fields = ["title", "ingredients", "instructions", "servingSize", "image"]
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    # Validate ingredients
    if not isinstance(data.get("ingredients"), list) or len(data.get("ingredients")) == 0:
        return jsonify({"error": "Ingredients must be a non-empty list"}), 400

    for idx, ing in enumerate(data.get("ingredients", [])):
        if not isinstance(ing, dict) or not ing.get("name") or ing.get("quantity") in (None, "") or not ing.get("measurement"):
            return jsonify({"error": f"Ingredient at index {idx} is missing required fields (name, quantity, measurement)"}), 400

    # Normalize cuisines: accept `cuisineNames` (array of names) or single `cuisine` string
    cuisine_names = []
    if data.get("cuisineNames") and isinstance(data.get("cuisineNames"), list):
        cuisine_names = [c for c in data.get("cuisineNames") if c]
    elif data.get("cuisine"):
        cuisine_names = [data.get("cuisine")]

    cuisine_ids = []
    for name in cuisine_names:
        existing = cuisine_collection.find_one({"name": name})
        if existing:
            cuisine_ids.append(existing.get("_id"))
        else:
            res = cuisine_collection.insert_one({"name": name})
            cuisine_ids.append(res.inserted_id)

    # Normalize dietary preferences: accept `dietaryNames` or `dietaryPreference`
    diet_names = []
    if data.get("dietaryNames") and isinstance(data.get("dietaryNames"), list):
        diet_names = [d for d in data.get("dietaryNames") if d]
    elif data.get("dietaryPreference"):
        diet_names = [data.get("dietaryPreference")]

    diet_ids = []
    for name in diet_names:
        existing = diet_collection.find_one({"name": name})
        if existing:
            diet_ids.append(existing.get("_id"))
        else:
            res = diet_collection.insert_one({"name": name})
            diet_ids.append(res.inserted_id)

    # Prepare the document to insert
    recipe_doc = {
        "title": data.get("title"),
        "ingredients": data.get("ingredients"),
        "instructions": data.get("instructions"),
        "servingSize": data.get("servingSize"),
        "image": data.get("image"),
        "created_at": datetime.utcnow(),
    }

    if cuisine_ids:
        recipe_doc["cuisine_ids"] = cuisine_ids
        recipe_doc["cuisineNames"] = cuisine_names

    if diet_ids:
        recipe_doc["diet_ids"] = diet_ids
        recipe_doc["dietaryNames"] = diet_names

    try:
        result = recipe_collection.insert_one(recipe_doc)
        # Fetch and enrich the created recipe before returning
        created = recipe_collection.find_one({"_id": result.inserted_id})
        created = enrich_recipe(created, db)
        return Response(dumps(created), mimetype="application/json"), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500