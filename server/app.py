from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import os
import random

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
