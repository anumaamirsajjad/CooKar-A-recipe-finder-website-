from flask import Blueprint, jsonify, request
from db import get_db
from bson import ObjectId, errors

ingredients_routes = Blueprint("ingredients_routes", __name__)

@ingredients_routes.route("/ingredients", methods=["GET"])
def get_ingredients():
    db = get_db()
    ingredients_collection = db["Ingredients"]
    
    ids_param = request.args.get("ids")

    # If no IDs provided → return all ingredients (optional)
    if not ids_param:
        all_ingredients = list(
            ingredients_collection.find({}, {"_id": 0, "name": 1, "quantity": 1})
        )
        return jsonify(all_ingredients)

    valid_ids = []
    for raw_id in ids_param.split(","):
        raw_id = raw_id.strip()
        if not raw_id:
            continue
        try:
            valid_ids.append(ObjectId(raw_id))
        except errors.InvalidId:
            continue

    if not valid_ids:
        return jsonify([])

    # Fetch only name + quantity
    ingredients = list(
        ingredients_collection.find(
            {"_id": {"$in": valid_ids}},
            {"_id": 0, "name": 1, "quantity": 1}
        )
    )

    return jsonify(ingredients)
