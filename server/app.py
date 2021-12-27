from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from mongoengine import *
import os

app = Flask(__name__)
CORS(app)

connect(host=os.getenv("MONGO_URI"))
