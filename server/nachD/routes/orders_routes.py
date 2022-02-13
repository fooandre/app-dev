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
class EmptyCart(Exception):
	def __init__(self, message):
			super().__init__(message)

def check_product_quantity(purchased_products):
	for ordered_product in purchased_products:
		print(ordered_product["productId"])
		prod = Product.objects(id=ordered_product["productId"]).get()
	# check first whether enough quantity of stock 
		if not prod["qty"] >= ordered_product["qty"]:
			raise NotEnufQuatityError("One of the product do not have enough stock for the order placed.")

def place_new_purchase_order(purchaserId): # list of purchased_products
	user = User.objects(id=purchaserId).get()
	purchased_products = user.cart
	# list is empty 
	if not purchased_products:
		raise EmptyCart("Your cart is empty. Add something before checking out.")
	check_product_quantity(purchased_products)
	ord = Order()
	merchants = []

	for ordered_product in purchased_products:
		prod = Product.objects(id=ordered_product["productId"]).get()
		prod.qty -= ordered_product["qty"]
		prod.qty_sold += ordered_product["qty"]
		prod.save()
		#Create the products_order class with qty, status, etc, with reference to the product. Then saved in order.products
		prod_ordered = Products_Order()
		prod_ordered.purchaser = user
		prod_ordered.product= prod
		prod_ordered.qty = ordered_product["qty"]
		prod_ordered.merchant = prod.user
		prod_ordered.save()
		ord.products.append(prod_ordered)

		# Only append unique merchants into merchants
		if prod.user not in merchants:
			print(prod.user)
			merchants.append(prod.user)
		

	ord.save()
	# Add products into the purchaser's orders list
	user.purchases.append(ord)
	user.cart = []
	user.save()

	# Then add the order into the merchants's order list
	for merchant in merchants:
		merchant.orders.append(ord)
		merchant.save()

	return user

# Getting the seller's orders being placed with the seller
def get_one_order(order_id, userId):
	ord = Order.objects(id=order_id).get()

	obj = []	

	for order in ord.products:
		print(order)
		# check if the product still exist as it might have been deleted. If product exist means uer exist, due to cascade in product.
		
		if not str(order.merchant.id) == userId: # if the seller Id is not the merchant in the order, means he does not owns that product, so skip. 
			# Then skip those ordered products that those not belong to the merchant
			continue
		if order.product == None:
			obj.append({
				"name":"Deleted product",
				"qty":order.qty,
				"status":order.status.value,
			})
		else:
			obj.append({
				"productId":str(order.product["id"]),
				"name":order.product["name"],
				"price":order.product["price"],
				"qty":order.qty,
				"status":order.status.value,
				"img":order.product["img"],
				"date_ordered":datetime.datetime.strftime(order.date_ordered, "%d/%m/%Y"),
				"purchaser":{
					"userId": str(order.purchaser.id),
					"address":order.purchaser.address,
					"username":order.purchaser.username
				},
				"merchant":{
						"userId":str(order.product["user"]["id"]), 
						"username":order.product["user"]["username"]
				}        
			})
	return obj

def update_order_status(data, order_id, userId):
	ord = Order.objects(id=order_id).get()
	

	for order in ord.products:
		# check if the logged in user(merchant) is the user himself and which product Id he wants to update
		print(str(order.merchant.id), userId, str(order.product.id), data["product"])
		if str(order.merchant.id) == userId and str(order.product.id) == data["product"]:
			if data["status"] == Status.COMPLETED.value:
				order.status=Status.COMPLETED.value
				order.completed=True
				order.save()
				return order # because we only update one order's product's status per time
			else:
				print(data["status"])
				order.status=data["status"]
				order.completed=False
				order.save()
				return order
	return False	



# purchase a product
@app.route('/api/purchase', methods = ["post"])
def place_purchase():

	try:
			userId = session.get("user")
			data = request.get_json()
			# Login first before placing order
			if userId != data["userId"]:   
					# Not logged in
					return {
							"success": False,
							"message": "Please login first."
					}

			user = place_new_purchase_order(userId)
			purchases = []
			for ord in user.purchases:
				obj = {
						"orderId": str(ord.id),
						"products":[]
				}
				for order in ord.products:
						if order.product == None:
								obj["products"].append({
										"name":"Deleted product",
										"qty":order.qty,
										"status":order.status.value,
										"date_ordered":datetime.datetime.strftime(order.date_ordered, "%d/%m/%Y")
								})
						else:
								obj["products"].append({
										"id":str(order.product["id"]),
										"name":order.product["name"],
										"price":order.product["price"],
										"qty":order.qty,
										"status":order.status.value,
										"img":order.product["img"],
										"status":order.status.value,
										"orderId":str(ord.id),
										"category":order.product["category"].value,
										"date_ordered":datetime.datetime.strftime(order.date_ordered, "%d/%m/%Y"),
										"user":{
												"userId":str(order.product["user"]["id"]), 
												"username":order.product["user"]["username"]
										}          
								})
				purchases.append(obj)
			return {
					"success":True,
					"purchases": purchases
			}
	except (NotEnufQuatityError,EmptyCart) as e:
		print(traceback.format_exc())	
		return {
			"success":False,
			"message":str(e)
		}
	except:
			print(traceback.format_exc())
			return {
					"success":False,
					"message":"Error while placing purchase order! Try again."
			}

@app.route('/api/order/all', methods=["Post"])
def get_all_orders():
	userId = session.get("user")
	data = request.get_json()

	if userId != data["userId"]:
		# Not logged in
		return {
			"success": False,
			"message": "Please login first."
		}

	user = User.objects(id=userId).get()
	orders=[]
	
	for eachOrder in user.orders:
		obj = {
				"orderId": str(eachOrder.id),
				"products":[]
		}
		for prod_order in eachOrder.products:
				if not str(prod_order.merchant.id) == userId: # if the seller Id is not the merchant in the order, means he does not owns that product, so skip. 
						# Then skip those ordered products that those not belong to the merchant
						continue
				if prod_order.product == None:
						obj["products"].append({
								"name":"Deleted product",
								"qty":prod_order.qty,
								"status":prod_order.status.value,
								"purchaser": {
									"address": prod_order.purchaser.address
								},
						})
				else:
						obj["products"].append({
								"id":str(prod_order.product["id"]),
								"name":prod_order.product["name"],
								"price":prod_order.product["price"],
								"qty": prod_order["qty"],
								"img":prod_order.product["img"],
								"status":prod_order.status.value,
								"desc": prod_order.product["desc"],
								"orderId": str(eachOrder.id),
								"category":prod_order.product["category"].value,
								"date_ordered":datetime.datetime.strftime(prod_order.date_ordered, "%d/%m/%Y"),
								"purchaser": {
									"address": prod_order.purchaser.address
								},
								"user":{
										"userId":str(prod_order.product["user"]["id"]),
										"username":prod_order.product["user"]["username"]
								}
						})
		orders.append(obj)
	return {
		"success":True,
		"orders":orders
	}

# look at seller's orders
@app.route('/api/order/<order_id>', methods=["Post", "patch"])
def seller_order(order_id):

	try:
		userId = session.get("user")
		data = request.get_json()
		# Login first before placing order
		if userId != data["userId"]:
				# Not logged in
				return {
						"success": False,
						"message": "Please login first."
				}
		if request.method == "POST":
			# Need to implement only the logged in user (the seller) that owns the product Id can view it
			ord = get_one_order(order_id, userId) 
			return {
					"success":True, 
					"products":ord
			}
		elif request.method == "PATCH":
				data = request.get_json()
				updated_order = update_order_status(data ,order_id=order_id, userId=userId)
				user = User.objects(id=userId).get()
				if updated_order: # if updated_order is not empty, means successfully updated one order's product
					orders=[]
					for eachOrder in user.orders:
						obj = {
								"orderId": str(eachOrder.id),
								"products":[]
						}
						for prod_order in eachOrder.products:
								if not str(prod_order.merchant.id) == userId: # if the seller Id is not the merchant in the order, means he does not owns that product, so skip. 
										# Then skip those ordered products that those not belong to the merchant
										continue
								if prod_order.product == None:
										obj["products"].append({
												"name":"Deleted product",
												"qty":prod_order.qty,
												"status":prod_order.status.value,
												"purchaser": {
													"address": prod_order.purchaser.address
												},
										})
								else:
										obj["products"].append({
												"id":str(prod_order.product["id"]),
												"name":prod_order.product["name"],
												"price":prod_order.product["price"],
												"qty": prod_order["qty"],
												"img":prod_order.product["img"],
												"status":prod_order.status.value,
												"desc": prod_order.product["desc"],
												"orderId": str(eachOrder.id),
												"category":prod_order.product["category"].value,
												"date_ordered":datetime.datetime.strftime(prod_order.date_ordered, "%d/%m/%Y"),
												"purchaser": {
													"address": prod_order.purchaser.address
												},
												"user":{
														"userId":str(prod_order.product["user"]["id"]),
														"username":prod_order.product["user"]["username"]
												}
										})
						orders.append(obj)
					return {
						"success":True,
						"orders":orders
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
			print(traceback.format_exc())
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

def see_purchase_order(order_id, userId):
	ord = Order.objects(id=order_id).get()

	obj = []	

	for order in ord.products:
		# check if the product still exist as it might have been deleted. If product exist means uer exist, due to cascade in product.
		
		if order.product == None:
			obj.append({
				"name":"Deleted product",
				"qty":order.qty,
				"status":order.status.value,
			})
		else:
			obj.append({
				"productId":str(order.product["id"]),
				"name":order.product["name"],
				"price":order.product["price"],
				"qty":order.qty,
				"status":order.status.value,
				"img":order.product["img"],
				"date_ordered":datetime.datetime.strftime(order.date_ordered, "%d/%m/%Y"),
				"merchant":{
						"userId":str(order.product["user"]["id"]), 
						"username":order.product["user"]["username"]
				}        
			})
	return obj

@app.route('/api/purchase_order/<order_id>', methods=["Post"])
def purchaser_order(order_id):
	try:
		userId = session.get("user")
		data = request.get_json()
		# Login first before seeing placed order
		if userId != data["userId"]:   
				# Not logged in
				return {
						"success": False,
						"message": "Please login first."
				}
	
		# logged in user (the purchaser) can view all products they purchase
		ord = see_purchase_order(order_id, userId) 
		return {
				"success":True, 
				"products":ord
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
