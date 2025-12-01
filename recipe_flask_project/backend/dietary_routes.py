
# from flask import Blueprint, jsonify, request, Response
# from db import get_db
# from bson.json_util import dumps
# dietary_routes = Blueprint("dietary_routes", __name__)
# # CREATE - Add new dietary preference
# @dietary_routes.route("/dietary-preferences", methods=["POST"])
# def add_dietary_preference():
#     db = get_db()
#     dietary_collection = db["DietaryPreference"]
#     data = request.get_json()
#     dietary_collection.insert_one(data)
#     return jsonify({"message": "Dietary preference added successfully!"}), 201
# # READ - Get all dietary preferences
# @dietary_routes.route("/dietary-preferences", methods=["GET"])
# def get_dietary_preferences():
#     db = get_db()
#     dietary_collection = db["DietaryPreference"]
#     dietary_preferences = list(dietary_collection.find({}))
#     return Response(dumps(dietary_preferences), mimetype="application/json")
# # READ - Get dietary preference by name
# @dietary_routes.route("/dietary-preferences/<string:name>", methods=["GET"])
# def get_dietary_preference(name):
#     db = get_db()
#     dietary_collection = db["DietaryPreference"]
#     dietary_preference = dietary_collection.find_one({"name": name})
#     if dietary_preference:
#         return Response(dumps(dietary_preference), mimetype="application/json")
#     return jsonify({"message": "No matching dietary preference found."}), 404
# # UPDATE - Edit dietary preference by name
# @dietary_routes.route("/dietary-preferences/<string:name>", methods=["PUT"])
# def update_dietary_preference(name):
#     db = get_db()
#     dietary_collection = db["DietaryPreference"]
#     data = request.get_json()
#     result = dietary_collection.update_one({"name": name}, {"$set": data})
#     if result.modified_count:
#         return jsonify({"message": "Dietary preference updated successfully!"})
#     return jsonify({"message": "No matching dietary preference found."}), 404
# # DELETE - Delete dietary preference by name
# @dietary_routes.route("/dietary-preferences/<string:name>", methods=["DELETE"])
# def delete_dietary_preference(name):
#     db = get_db()
#     dietary_collection = db["DietaryPreference"]
#     result = dietary_collection.delete_one({"name": name})
#     if result.deleted_count:
#         return jsonify({"message": "Dietary preference deleted successfully!"})
#     return jsonify({"message": "No matching dietary preference found."}), 404




from flask import Blueprint, jsonify, request
from db import get_db
from bson import ObjectId

dietary_routes = Blueprint("dietary_routes", __name__)

@dietary_routes.route("/dietary-preferences", methods=["GET"])
def get_dietary_preferences():
    db = get_db()
    dietary_collection = db["DietaryPreference"]

    prefs = list(
        dietary_collection.find({}, {"_id": 0, "name": 1})
    )
    return jsonify(prefs)


@dietary_routes.route("/dietary-preferences/many", methods=["POST"])
def get_many_dietary_preferences():
    try:
        db = get_db()
        data = request.get_json()
        ids = data.get("ids", [])

        # Convert string IDs into ObjectId objects
        object_ids = [ObjectId(i) for i in ids]

        dietary_collection = db["DietaryPreference"]

        prefs = list(
            dietary_collection.find({"_id": {"$in": object_ids}})
        )

        # Convert ObjectId → string
        for p in prefs:
            p["_id"] = str(p["_id"])

        return jsonify(prefs), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
