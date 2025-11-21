from flask import Blueprint, jsonify, request
from db import get_db
from bson import ObjectId, errors

ingredients_routes = Blueprint("ingredients_routes", __name__)
@ingredients_routes.route("/ingredients/many", methods=["POST"])
def get_ingredients_many():
    db = get_db()
    ingredients_collection = db["Ingredient"]

    data = request.get_json(silent=True) or {}
    ids = data.get("ids", [])

    if not ids:
        return jsonify([])

    valid_ids = []
    for item in ids:
        try:
            valid_ids.append(ObjectId(item))
        except errors.InvalidId:
            continue

    if not valid_ids:
        return jsonify([])

    ingredients = list(
        ingredients_collection.find(
            {"_id": {"$in": valid_ids}},
            {"_id": 0, "name": 1, "quantity": 1}
        )
    )

    return jsonify(ingredients)
