# Main entry point (like server.js)

from flask import Flask
from routes.comment_routes import comment_routes
from routes.cuisine_routes import cuisine_routes

app = Flask(__name__)

# Register routes
app.register_blueprint(comment_routes)
app.register_blueprint(cuisine_routes)

@app.route("/")
def home():
    return "✅ Flask connected with MongoDB Atlas successfully!"

if __name__ == "__main__":
    app.run(debug=True)
