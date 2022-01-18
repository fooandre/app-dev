import datetime
import traceback
from configparser import Error

import mongoengine
from flask import jsonify, redirect, request, session, url_for
from nachD import app
from nachD.models import Order, Product, Products_Order, Status, User


class NotEnufQuatityError(Exception):
	def __init__(self, message):
			super().__init__(message)

def check_product_quantity(purchased_products):
	for ordered_product in purchased_products:
		print(ordered_product["id"])
		prod = Product.objects(id=ordered_product["id"]).get()
	# check first whether enough quantity of stock 
		if not prod["qty"] >= ordered_product["qty"]:
			raise NotEnufQuatityError("One of the product do not have enough stock for the order placed.")

def place_new_order(purchased_products, purchaserId): # list of purchased_products
	check_product_quantity(purchased_products)
	ord = Order()
	merchants = []

	user = User.objects(id=purchaserId).get()
	for ordered_product in purchased_products:
		prod = Product.objects(id=ordered_product["id"]).get()
		prod.qty -= ordered_product["qty"]
		prod.qty_sold += ordered_product["qty"]
		prod.save()
		#Create the products_order class with qty, status, etc, with reference to the product. Then saved in order.products
		prod_ordered = Products_Order()
		prod_ordered.product= prod
		prod_ordered.qty = ordered_product["qty"]
		prod_ordered.merchant = prod.user.id
		prod_ordered.save()
		ord.products.append(prod_ordered)

		# Only append unique merchants into merchants
		if prod.user not in merchants:
			print(prod.user)
			merchants.append(prod.user)
		

	ord.save()
	# Add products into the purchaser's orders list
	print(ord)
	user.orders.append(ord)
	user.save()

	# Then add the order into the merchants's order list
	for merchant in merchants:
		merchant.orders.append(ord)
		merchant.save()

	return ord

def get_one_order(order_id, userId):
	user = User.objects(id=userId).get()
	isMerchant = user.merchant
	ord = Order.objects(id=order_id).get()

	obj = []	

	for order in ord.products:
		print(order)
		# check if the product still exist as it might have been deleted. If product exist means uer exist, due to cascade in product.
		if isMerchant:
			if not str(order.merchant) == userId:
				continue
		if order.product == None:
			obj.append({
				"name":"Deleted product",
				"qty":order.qty,
				"status":order.status.value,
			})
		else:
			obj.append({
				"id":str(order.product["id"]),
				"name":order.product["name"],
				"price":order.product["price"],
				"qty":order.qty,
				"status":order.status.value,
				"img":order.product["img"],
				"date_ordered":datetime.datetime.strftime(order.date_ordered, "%d/%m/%Y"),
				"user":{
						"user":str(order.product["user"]["id"]), 
						"username":order.product["user"]["username"]
				}        
			})
	return obj

def update_order_status(data, order_id, userId):
	ord = Order.objects(id=order_id).get()
	updated_orders = {}

	for order in ord.products:
		# check if the logged in user(merchant) is the user himself and which product Id he wants to update
		if str(order.product.user.id) == userId and str(order.product.id) == data["product"]:
			if data["status"] == Status.COMPLETED.value:
				order.status=Status.COMPLETED.value
				order.completed=True
				order.save()
				updated_orders["order"] = order
				break # because we only update one order's product's status per time
			else:
				order.status=data["status"]
				order.save()
				updated_orders["order"] = order
				break

	return updated_orders




@app.route('/order', methods = ["post"])
def place_order():

	data = request.get_json()

	# Login first before placing order
	if "user" not in session:
			# Not logged in
			return {
					"auth":False,
					"message":"Please login first."
			}
	try:

			userId = session["user"]
			place_new_order(data["products"], userId)
			return {
					"success":True,
					"messaage":"Order placed",
			}
	except NotEnufQuatityError as e:
		print(traceback.format_exc())	
		return {
			"success":False,
			"message":str(e)
		}
	except:
			print(traceback.format_exc())
			return {
					"success":False,
					"message":"Error while placing order! Try again."
			}, 404
			
@app.route('/order/<order_id>', methods=["Get", "patch"])
def get_order(order_id):

	try:
		userId = session["user"]
		if request.method == "GET":
			# Need to implement only the logged in user with that order Id can view it LATER ON
			ord = get_one_order(order_id, userId) # products get auto with orders
			return {
					"success":True, 
					"products":ord
			}
		elif request.method == "PATCH":
				data = request.get_json()
				updated_order = update_order_status(data ,order_id=order_id, userId=userId)
				if updated_order: # if updated_order is not empty, means successfully updated one order's product
					updated_order = updated_order["order"]
					return {
							"success":True,
							"name":updated_order.product.name,
							"status":updated_order.status.value,
							"completed":updated_order.completed
									
					}
				else:
						return {
								"success":False,
								"message": "You do not have permission to update the status. Please log in with the correct user."
						}
	except mongoengine.DoesNotExist:
		print(traceback.format_exc())
		return {
				"success":False,
				"message":"Order does not exist. Please check if order exist and try again."
		}, 404
	except mongoengine.ValidationError:
			return {
					"success":False,
					"message":"Choose status only from the options."
			}
	except:
		print(traceback.format_exc())
		return {
				"success":False,
				"message":"Error while getting order! Please try again."
		}, 404
