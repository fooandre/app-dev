from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo
from uuid import uuid4, UUID
import os

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


@app.route('/api/db')
def api():
    data_set = mongo.db.names.find()
    return jsonify([data for data_set in data_set])
