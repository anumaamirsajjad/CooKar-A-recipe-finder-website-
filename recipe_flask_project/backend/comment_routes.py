from flask import Blueprint, jsonify, request
from db import get_db
from bson.json_util import dumps
from flask import Response


comment_routes = Blueprint("comment_routes", __name__)


# CREATE - Add new comment
@comment_routes.route("/comments", methods=["POST"])
def add_comment():
    db = get_db()
    comment_collection = db.Comment

    data = request.get_json()
    if not data:
        return jsonify({"message": "Request body cannot be empty"}), 400

    comment_collection.insert_one(data)
    return jsonify({"message": "Comment added successfully!"}), 201



@comment_routes.route("/comments", methods=["GET"])
def get_comments():
    db = get_db()
    comment_collection = db.Comment

    comments = list(comment_collection.find({}))
    return Response(dumps(comments), mimetype="application/json")


# UPDATE - Edit comment by name
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


# DELETE - Delete comment by name
@comment_routes.route("/comments/<string:name>", methods=["DELETE"])
def delete_comment(name):
    db = get_db()
    comment_collection = db.Comment

    result = comment_collection.delete_one({"name": name})

    if result.deleted_count == 0:
        return jsonify({"message": "No matching comment found."}), 404

    return jsonify({"message": "Comment deleted successfully!"}), 200
