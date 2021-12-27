from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from uuid import uuid4, UUID
import os

app = Flask(__name__)
CORS(app)
