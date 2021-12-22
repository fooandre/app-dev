from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from uuid import uuid4, UUID
import shelve
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def api():
    return "hello"

@app.route('/product/admin', methods=["post", "patch", "delete"])
def product_route():
    if request.method == 'post':
        data = request.get_json()

        prodDict = {}

        db = shelve.open('product.db','c')
        if 'product' in db: 
            prodDict= db['product'] 
        else:
            db['product'] = prodDict

        return "product", 200
    