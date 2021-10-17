from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo
from uuid import uuid4, UUID
import os

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
