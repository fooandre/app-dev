from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from uuid import uuid4, UUID
import os

app = Flask(__name__)
CORS(app)


class Product:
    def __init__(self, merchant_id, name, category, price, description, image):
        self.name, self.category, self.price, self.description, self.image = name, category, price, description, image
        self.__id = f'{merchant_id}-uuid4()'

    def get_id(self): return self.__id

    def __str__(self):
        return f"{self.name} under {self.category} costs {self.price}\n{self.description}"


@app.route('/api/db')
def api():
    data_set = mongo.db.names.find()
    return jsonify([data for data_set in data_set])
