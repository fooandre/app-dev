from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import os
import random

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


@app.route('/', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def index():
    method = request.method
    db = mongo.db.data

    if method != 'GET':
        data = request.get_json()
        id = data.get('id')
        name = data.get('name')

    if method == 'POST':
        db.insert_one({'_id': random.randint(1, 100000), 'name': name})
        return "data posted"

    if method == 'PATCH':
        db.update_one({'_id': int(id)}, {'$set': {'name': name}})
        return "data patched"

    if method == 'DELETE':
        if id != None or name != None:
            query = {}

            if id != None:
                query['_id'] = int(id)

            if name != None:
                query['name'] = name

            db.delete_one(query)
            return "data deleted"

        return "something went wrong"

    names = db.find()
    return jsonify([name for name in names])
