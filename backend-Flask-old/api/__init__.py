from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .views import main

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database_faces.db"
    app.register_blueprint(main)
    db.init_app(app)

    return app
