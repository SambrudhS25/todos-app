from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from db import mongo

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = list(mongo.db.tasks.find({"user_id": user_id}))
    for t in tasks:
        t["_id"] = str(t["_id"])
    return jsonify(tasks)

@task_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    data = request.get_json()
    title = data.get("title")
    if not title:
        return jsonify({"error": "Title is required"}), 400
    task = {
        "title": title,
        "description": data.get("description", ""),
        "status": "to-do",
        "user_id": get_jwt_identity()
    }
    task_id = mongo.db.tasks.insert_one(task).inserted_id
    task["_id"] = str(task_id)
    return jsonify(task), 201


@task_bp.route("/<task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    update_fields = {}
    for field in ["title", "description", "status"]:
        if field in data:
            update_fields[field] = data[field]
    mongo.db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": update_fields})
    return jsonify({"message": "Task updated"}), 200

@task_bp.route("/<task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    mongo.db.tasks.delete_one({"_id": ObjectId(task_id)})
    return jsonify({"message": "Task deleted"}), 200
