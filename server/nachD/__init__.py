from flask import Flask
from flask_cors import CORS
import os
from mongoengine import connect
from configparser import ConfigParser
from flask_bcrypt import Bcrypt

configdir = '/'.join([os.path.dirname(os.path.realpath(__file__)),'config.ini'])
config = ConfigParser()
config.read(configdir)

app = Flask(__name__,static_url_path='/static')
CORS(app)
bcrypt = Bcrypt(app)
app.secret_key = config["secret"]["SECRET_KEY"]
connect(host=config["MongoDb"]["MONGO_URI"])

from nachD.routes import orders_routes, product_routes, user_routes