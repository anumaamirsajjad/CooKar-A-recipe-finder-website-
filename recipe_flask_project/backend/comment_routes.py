from flask import Blueprint, jsonify, request
from db import get_db  # Change this line

comment_routes = Blueprint("comment_routes", __name__)


# CREATE - Add new comment
@comment_routes.route("/comments", methods=["POST"])
def add_comment():
    db = get_db()
    comment_collection = db["Comment"]
    data = request.get_json()
    comment_collection.insert_one(data)
    return jsonify({"message": "Comment added successfully!"}), 201

# READ - Get all comments
@comment_routes.route("/comments", methods=["GET"])
def get_comments():
    db = get_db()
    comment_collection = db["Comment"]
    comments = list(comment_collection.find({}, {"_id": 0}))
    return jsonify(comments)

# UPDATE - Edit comment by name or id
@comment_routes.route("/comments/<string:name>", methods=["PUT"])
def update_comment(name):
    db = get_db()
    comment_collection = db["Comment"]
    data = request.get_json()
    result = comment_collection.update_one({"name": name}, {"$set": data})
    if result.modified_count:
        return jsonify({"message": "Comment updated successfully!"})
    return jsonify({"message": "No matching comment found."}), 404

# DELETE - Delete comment by name
@comment_routes.route("/comments/<string:name>", methods=["DELETE"])
def delete_comment(name):
    db = get_db()
    comment_collection = db["Comment"]
    result = comment_collection.delete_one({"name": name})
    if result.deleted_count:
        return jsonify({"message": "Comment deleted successfully!"})
    return jsonify({"message": "No matching comment found."}), 404
