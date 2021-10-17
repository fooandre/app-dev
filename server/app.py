from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo
from uuid import uuid4, UUID
import os

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


class Person:
    def __init__(self, name):
        self.name = name
        self.id = uuid4()

    def __str__(self):
        return f"Name: {self.name}, Id: {self.id}"

    def to_json(self):
        return {
            '_id': self.id,
            'name': self.name
        }


@app.route('/', methods=['GET', 'POST', 'PATCH',  'DELETE'])
def index():
    method = request.method
    db = mongo.db.data

    if method != 'GET':
        data = request.get_json()
        id = data.get('id')
        name = data.get('name')

    if method == 'POST':
        new_person = Person(name)
        db.insert_one(new_person.to_json())

        return redirect(url_for('index'))

    if method == 'PATCH':
        query = {'_id': UUID(id)}

        updated_person = {'name': name}
        db.update_one(query, {'$set': updated_person})

        return redirect(url_for('index'))

    if method == 'DELETE':
        query = {}
        query.update({'_id': UUID(id)}) if id != None else None
        query.update({'name': name}) if name != None else None

        db.delete_many(query)

        return redirect(url_for('index'))

    names = db.find()
    return jsonify([name for name in names])
