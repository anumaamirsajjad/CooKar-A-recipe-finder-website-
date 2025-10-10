from flask import Flask, render_template, request, redirect
from pymongo import MongoClient

app = Flask(__name__)

# connect to your MongoDB cluster
client = MongoClient("mongodb+srv://l230893_db_user:FuFtw6DUTItdC74F@cluster0.q3zi5uv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client["students_db"]
collection = db["students"]

@app.route('/')
def index():
    students = list(collection.find())
    return render_template('index.html', students=students)

@app.route('/add', methods=['GET', 'POST'])
def add_student():
    if request.method == 'POST':
        name = request.form['name']
        course = request.form['course']
        collection.insert_one({"name": name, "course": course})
        return redirect('/')
    return render_template('add_student.html')

if __name__ == '__main__':
    app.run(debug=True)
