from flask import Flask
from flask_cors import CORS

# Import your route blueprints
from cuisine_routes import cuisine_routes
from ingredient_route import ingredients_routes
from dietary_routes import dietary_routes
from recipe_routes import recipe_routes

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Register all blueprints with URL prefixes
app.register_blueprint(cuisine_routes, url_prefix="/api")
app.register_blueprint(ingredients_routes, url_prefix="/api")
app.register_blueprint(dietary_routes, url_prefix="/api")
app.register_blueprint(recipe_routes, url_prefix="/api")

# Optional: Add a root route to test if server is running
@app.route('/')
def home():
    return jsonify({"message": "Recipe Finder API is running!"})

@app.route('/api/health')
def health_check():
    return jsonify({"status": "healthy", "message": "API is working!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)