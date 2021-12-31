from enum import Enum
from mongoengine.base.fields import ObjectIdField
from mongoengine.fields import BooleanField, DateField, FloatField, EnumField,  StringField
from mongoengine import  ValidationError, Document, ListField, ReferenceField
import mongoengine
from mongoengine.fields import BooleanField, EnumField, IntField, ReferenceField
import datetime

class Status(Enum):
	ORDER_PLACED = "Order Placed"
	PACKING_ORDER = "Packing Order"
	DELIVERING = "Delivery"
	COMPLETED = "Completed"


def validate_status(status):

	avail_status = [Status.ORDER_PLACED, Status.PACKING_ORDER, Status.DELIVERING, Status.COMPLETED]

	if status not in avail_status:
		raise ValidationError("Choose status only from the options.")

class Products_Order(Document):
	product=ReferenceField("Product")
	qty=IntField(default=1)
	date_ordered = DateField(default=datetime.date.today().strftime("%d/%m/%Y"))
	status=EnumField(Status, default=Status.ORDER_PLACED)
	completed = BooleanField(default=False)
	merchant = ObjectIdField(required=True)

	def __str__(self):
			return f"Products_Order(product={self.product}, qty={self.qty}, status={self.status}, completed={self.completed})"

class Order(Document):
	products =ListField(ReferenceField("Products_Order")) # Deleting a product deletes the whole order if with cascade

	meta = {
		'collection':'orders'
	}

	def __str__(self):
			return f"Orders(products={self.products})"


class Product(Document):

	name= StringField(required=True)
	price = FloatField(required=True)
	user =  ReferenceField("User")
	desc = StringField(required=True)
	qty = IntField(default=0)
	img = StringField(default="default.png")
	qty_sold = IntField(default=0)

	reviews = ListField(ReferenceField("Review"))

	meta = {
		'collection':'products'
	}

	def __str__(self):
			return f"Product(name={self.name}, price={self.price}, user={self.user}, reviews=[{self.reviews}])"

class User(Document):
	username= StringField(required=True,unique=True)
	orders=ListField(ReferenceField("Order"))
	products=ListField(ReferenceField("Product"))
	merchant=BooleanField(default=False)

	meta = {
		'collection':'user'
	}

	def __str__(self):
				return f"User(username={self.username})"


class Review(Document):
	user = ReferenceField("User") 
	date_created = DateField(default=datetime.date.today().strftime("%d/%m/%Y"))
	rating = IntField(default=0)
	comment = StringField(required=True)

def __str__(self):
			return f"Reviews(user={self.user}, rating={self.rating}, comment={self.comment})"

Product.register_delete_rule(User, "products" ,mongoengine.NULLIFY)
Product.register_delete_rule(Products_Order, "product", mongoengine.NULLIFY)
# Product.register_delete_rule(Order, 'products', mongoengine.PULL)