from flask import Blueprint, jsonify, request, Response, make_response
from db import get_db
from bson.json_util import dumps
from bson import ObjectId

comment_routes = Blueprint("comment_routes", __name__)

# POST + OPTIONS (preflight)
@comment_routes.route("/comments", methods=["POST", "OPTIONS"])
def add_comment():

    # Handle CORS preflight
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200
    
    db = get_db()
    comment_collection = db.Comment

    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body cannot be empty"}), 400

    required_fields = ["user", "recipeId", "commentText", "date"]
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), 400

    comment_doc = {
        "user": data["user"],
        "recipeId": ObjectId(data["recipeId"]),
        "commentText": data["commentText"],
        "date": data["date"],
    }
    print("Incoming data:", data)
    print("Inserting doc:", comment_doc)
    print("Using DB:", db.name)
    print("Collections:", db.list_collection_names())
    print("Inserting into:", comment_collection)

    comment_collection.insert_one(comment_doc)

    return jsonify({"message": "Comment added successfully!"}), 201


# GET all comments
@comment_routes.route("/comments", methods=["GET"])
def get_comments():
    db = get_db()
    comment_collection = db.Comment

    comments = list(comment_collection.find({}))
    return Response(dumps(comments), mimetype="application/json")


# UPDATE
@comment_routes.route("/comments/<string:name>", methods=["PUT"])
def update_comment(name):
    db = get_db()
    comment_collection = db.Comment

    data = request.get_json()
    if not data:
        return jsonify({"message": "Update data cannot be empty"}), 400

    result = comment_collection.update_one({"name": name}, {"$set": data})

    if result.matched_count == 0:
        return jsonify({"message": "No matching comment found."}), 404

    return jsonify({"message": "Comment updated successfully!"}), 200


# DELETE
@comment_routes.route("/comments/<string:name>", methods=["DELETE"])
def delete_comment(name):
    db = get_db()
    comment_collection = db.Comment

    result = comment_collection.delete_one({"name": name})

    if result.deleted_count == 0:
        return jsonify({"message": "No matching comment found."}), 404

    return jsonify({"message": "Comment deleted successfully!"}), 200


# COUNT comments per recipe
@comment_routes.route("/comments/count/<string:recipe_id>", methods=["GET"])
def get_comments_count(recipe_id):
    db = get_db()
    comment_collection = db.Comment

    try:
        oid = ObjectId(recipe_id)
    except:
        return jsonify({"error": "Invalid recipe_id"}), 400

    count = comment_collection.count_documents({"recipeId": oid})
    return jsonify({"comments_count": count})
