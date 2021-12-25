from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from mongoengine import *
import os

app = Flask(__name__)
CORS(app)

connect(host=os.getenv("MONGO_URI"))


class Product(EmbeddedDocument):
    name = StringField(required=True)
    price = FloatField(required=True)
    desc = StringField(required=True)
    qty = IntField(default=0)


class Order(Document):
    products = EmbeddedDocumentListField(Product)


@app.route('/db/orders', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def orders():
    method = request.method

    if method == "POST":
        data = request.get_json()
        products = data['products']

        print(products)

        Order(products=products).save()
        return redirect(url_for("orders"))

    if method == "DELETE":
        Order.objects().delete()
        return redirect(url_for("orders"))

    return Order.objects().to_json()
