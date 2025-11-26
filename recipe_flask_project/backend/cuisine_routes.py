
from flask import Blueprint, request, jsonify
from db import get_db
from bson import ObjectId, errors

cuisines_routes = Blueprint("cuisines_routes", __name__)

@cuisines_routes.route("/cuisines/many", methods=["POST"])
def get_many_cuisines():
    data = request.get_json()
    ids = data.get("ids", [])

    valid_ids = []
    for cid in ids:
        try:
            valid_ids.append(ObjectId(cid))
        except errors.InvalidId:
            continue

    if not valid_ids:
        return jsonify([])

    db = get_db()
    cuisine_collection = db["Cuisine"]

    cuisines = list(
        cuisine_collection.find(
            {"_id": {"$in": valid_ids}},
            {"_id": 0}  # do not return objectId
        )
    )

    return jsonify(cuisines)
