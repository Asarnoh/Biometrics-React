from flask import Blueprint, json, jsonify

main = Blueprint("main", __name__)


@main.route("/add_face", methods=["POST"])
def add_face():
    return "Done", 201


@main.route("/faces")
def faces():
    faces = []
    return jsonify({"faces": faces})
