from flask import Flask,request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
import os

# Import blueprints
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp
from db import init_db

app = Flask(__name__)

# Config
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "supersecretkey")
app.config['MONGO_URI'] = os.getenv("MONGO_URI", "mongodb://localhost:27017")

# Init extensions
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
init_db(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(task_bp, url_prefix="/api/tasks")

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Handle preflight OPTIONS requests globally
@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        return '', 200

@app.route("/", methods=["GET"])
def home():
    return {"message": "Kanban API is running"}

if __name__ == "__main__":
    app.run(debug=True)
