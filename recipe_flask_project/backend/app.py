from flask import Flask
from flask_cors import CORS
from db import get_db

# Import routes
from cuisine_routes import cuisines_routes
from ingredient_route import ingredients_routes
from dietary_routes import dietary_routes
from recipe_routes import recipe_routes
from comment_routes import comment_routes
from rating_routes import rating_routes



app = Flask(__name__)

# Apply CORS to blueprint BEFORE registration
CORS(comment_routes, resources={r"/*": {"origins": "*"}})
CORS(rating_routes, resources={r"/*": {"origins": "*"}})
# Register blueprints
app.register_blueprint(cuisines_routes, url_prefix="/api")
app.register_blueprint(ingredients_routes, url_prefix="/api")
app.register_blueprint(dietary_routes, url_prefix="/api")
app.register_blueprint(recipe_routes, url_prefix="/api")
app.register_blueprint(comment_routes, url_prefix="/api")
app.register_blueprint(rating_routes, url_prefix="/api")




@app.route("/test-db")
def test_db():
    """
    Simple endpoint to test MongoDB connection.
    """
    try:
        db = get_db()
        collections = db.list_collection_names()

        return {"status": "success", "collections": collections}
    except Exception as e:
        return {"status": "error", "message": str(e)}
# Optionally keep global CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

if __name__ == "__main__":
    app.run(debug=True)
