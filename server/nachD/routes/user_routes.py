import datetime
import traceback
from inspect import trace

import mongoengine
from flask import jsonify, redirect, request, session, url_for
from nachD import app, bcrypt
from nachD.models import Order, Product, User


def create_account(data):
    user = User()
    user.username = data["username"]
    user.email = data["email"]
    user.password = data["password"]
    user.address = data["address"]
    user.phoneNumber = data["phoneNumber"]
    user.save()

def add_new_user(data):
    user = User()
    password_hash = bcrypt.generate_password_hash(data["password"]).decode('utf-8')
    user.password = password_hash
    user.username = data["username"]
    user.email = data["email"]
    user.password = password_hash
    user.address = data["address"]
    user.phoneNumber = data["phoneNumber"]
    user.save()

    return user


def delete_user(userId:str):
    user = User.objects(id=userId).delete() # return 1 if success 0 if fail
    return user

@app.route('/abcd')
def api():
    return {"hello":"world"}

@app.route("/api/signup", methods=["post", "delete"])
def add_user():
    data = request.get_json()
    try:
        if request.method == "POST":
            add_new_user(data)
            return {
                "success":True
            }

        elif request.method == "DELETE":
            userId = session["user"]
            success = User.delete_user(userId)
            return {"deleted":success}
    except mongoengine.NotUniqueError:
        print(traceback.format_exc())
        return {
            "success":False,
            "message":"Username, phone number, or phone number already exist! "
        }

def changeUserDetails(userID, data):
    currentUserObject = User.objects().filter(id = userID).first()
    print(currentUserObject)
    for i in data:
        if i == "username":
            currentUserObject.username = data[i]
            
        elif i == "password":
            currentUserObject.password = data[i]
            
        elif i == "email":
            currentUserObject.email = data[i]   

        elif i == "address":
            currentUserObject.address = data[i]
        else:
            currentUserObject.phoneNumber = data[i]
            
    currentUserObject.save()

@app.route('/api/changeUserInfo', methods=["PUT"])
def changeUserInfo():
    userId = session.get("user")
    data = request.get_json()
    if "user" in session and userId == data["userId"]:     
        try:
            changeUserDetails(userId, data)
            return {
                "success": True,
            }
        except mongoengine.NotUniqueError as e:
            return {
                "success": False,
                "message": "The username or email already exist. Please try another."
            }
        except:
            print(traceback.format_exc())
            return {
                "success": False,
                "message": "Error updating inputs. Please try again."
            }
    else:
        return {
            "success": False,
            "message": "Please log in first."
        }

def addToLikedProducts(productId, userID):
    user = User.objects(id = userID).get()
    product = Product.objects(id=productId).get()
    for i in range(len(user.likedProducts)):
        print(user.likedProducts[i])
        print(product)
        if product == user.likedProducts[i]:
            return False
        else:
            continue
    user.likedProducts.append(product)
    print(user.likedProducts)
    user.save()
    return user

def removeFromLiked(productId, UserID):
    user = User.objects(id = UserID).get()
    product = Product.objects(id=productId).get()
    for i in range(len(user.likedProducts)):
        print(user.likedProducts[i])
        print(product)
        if product == user.likedProducts[i]:
            user.likedProducts.pop(i)
            user.save()
            return user
        else:
            continue
    return False

def addToUserCart(productId, userID):
    user = User.objects(id = userID).get()
    prod = Product.objects(id=productId).get()
    user.cart.append(prod)
    user.save()

@app.route('/api/addToCart', methods=["POST"])
def addToCart():
    userID = session.get("user")
    data = request.get_json()
    try:
        if "user" in session and session.get("user") == data["userId"]:  
            addToUserCart(data["productId"], userID)
            
            return {
                "success": True,
                "message": "sucessfully added to cart"
            }
        else:
            return {
                "success": False,
                "message": "Please log in first."
            }
    except:
        print(traceback.format_exc())
        return {
            "success":False,
            "message":"Error while adding product to Cart. Please try again."
        }

@app.route('/api/likedProduct', methods=["POST","PATCH"])
def addToLiked():
    userID = session.get("user")
    data = request.get_json()
    try:
        if "user" in session and session.get("user") == data["userId"]:  
            if request.method == "POST":
                isUser = addToLikedProducts(data["productId"], userID)
                if isUser:
                    likedProducts = []
                    for likedProduct in isUser.likedProducts:
                        likedProducts.append({
                            "id":str(likedProduct.id),
                            "name":likedProduct.name,
                            "price":likedProduct.price,
                            "img":likedProduct.img
                        })
                    return {
                        "success": True,
                        "likedProducts": likedProducts
                    }
                else:
                    return {
                        "success":False,
                        "message":"Already in liked products."
                    }
            elif request.method == "PATCH":
                isUser = removeFromLiked(data["productId"], userID)
                if isUser:
                    likedProducts = []
                    for likedProduct in isUser.likedProducts:
                        likedProducts.append({
                            "id":str(likedProduct.id),
                            "name":likedProduct.name,
                            "price":likedProduct.price,
                            "img":likedProduct.img
                        })
                    return {
                        "success": True,
                        "likedProducts": likedProducts
                    }
                else:
                    return {
                        "success":False,
                        "message":"Product does not exist in your liked products."
                    }
        else:
            return {
                "success": False,
                "message": "Please log in first."
            }
    except:
        print(traceback.format_exc())
        return {
            "success":False,
            "message":"Error while liking product. Please try again."
        }

@app.route("/api/login", methods=["post"])
def get_user():
    data = request.get_json()
    try:
        usernameInput = data["username"]
        plain_password = data["password"]
        user = User.objects().filter(username = usernameInput).first()
        if user == None:
            return {
                "success": False,
                "message": "Username does not exist"
            }  
    
        if bcrypt.check_password_hash(user.password, plain_password):
            session["user"] = str(user.id)
            userId = session["user"]
            user = User.objects().filter(id = userId).first()

            orders=[]
            products=[]
            purchases = []
            likedProducts=[]
            cart=[]
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
            for eachOrder in user.orders:
                obj = {
                    "orderId": str(eachOrder.id),
                    "products":[]
                }
                for prod_order in eachOrder.products:
                    if not str(prod_order.merchant.id) == userId: # if the seller Id is not the merchant in the order, means he does not owns that product, so skip. 
                        # Then skip those ordered products that those not belong to the merchant
                        continue
                    if order.product == None:
                        obj["products"].append({
                            "name":"Deleted product",
                            "qty":prod_order.qty,
                            "status":prod_order.status.value,
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
                            "user":{
                                "userId":str(prod_order.product["user"]["id"]),
                                "username":prod_order.product["user"]["username"]
                            }
                        })
                orders.append(obj)
            for eachProduct in user.products:
                products.append({
                    "id":str(eachProduct["id"]),
                    "name":eachProduct["name"],
                    "price":eachProduct["price"],
                    "desc": eachProduct["desc"],
                    "qty": eachProduct["qty"],
                    "img":eachProduct["img"],
                    "category":eachProduct["category"].value,
                })
            for eachLikedProducts in user.likedProducts:
                likedProducts.append({
                    "id":str(eachLikedProducts["id"]),
                    "name":eachLikedProducts["name"],
                    "price":eachLikedProducts["price"],
                    "desc": eachLikedProducts["desc"],
                    "img":eachLikedProducts["img"],
                    "user":{
                        "userId":str(eachLikedProducts["user"]["id"]), 
                        "username":eachLikedProducts["user"]["username"]
                    }
                })
            for eachCartItem in user.cart:
                cartItem = Product.objects(id=eachCartItem["productId"]).get()
                cart.append({
                    "id":str(cartItem["id"]),
                    "name":cartItem["name"],
                    "price":cartItem["price"],
                    "qty":eachCartItem["qty"]
                })
            return {
                "success": True,
                "userId":str(user.id),
                "message": "User logged in",
                "username": user.username,
                "email":user.email,
                "address":user.address,
                "phoneNumber":user.phoneNumber,
                "products":products,
                "orders":orders,
                "purchases":purchases,
                "likedProducts":likedProducts,
                "cart":cart
            }
        else:
            return{
                "success": False,
                "message":"Incorrect password."
            }
    except:
        print(traceback.format_exc())
        return {
            "success": False,
            "message": "Problem logging in. Please try again."
        }

@app.route("/api/get_user", methods=['post'])
def login_user():
    data = request.get_json()
    if "user" in session and session.get("user") == data["userId"]:
        userId = session["user"]
        user = User.objects().filter(id = userId).first()

        orders=[]
        products=[]
        purchases = []
        likedProducts=[]
        cart=[]
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
        for eachProduct in user.products:
            products.append({
                "id":str(eachProduct["id"]),
                "name":eachProduct["name"],
                "price":eachProduct["price"],
                "desc": eachProduct["desc"],
                "qty": eachProduct["qty"],
                "img":eachProduct["img"],
                "category":eachProduct["category"].value,
            })
        for eachLikedProducts in user.likedProducts:
            likedProducts.append({
                "id":str(eachLikedProducts["id"]),
                "name":eachLikedProducts["name"],
                "price":eachLikedProducts["price"],
                "desc": eachLikedProducts["desc"],
                "img":eachLikedProducts["img"],
                "user":{
                    "userId":str(eachLikedProducts["user"]["id"]), 
                    "username":eachLikedProducts["user"]["username"]
                }
            })
        for eachOrder in user.orders:
            for prod_order in eachOrder.products:
                
                orders.append({
                    "orderId":str(eachOrder.id),
                    "productId":str(prod_order.product["id"]),
                    "name":prod_order.product["name"],
                    "price":prod_order.product["price"],
                    "desc": prod_order.product["desc"],
                    "qty": prod_order["qty"],
                    "img":prod_order.product["img"],
                    "status":prod_order.status.value
                })
        for eachCartItem in user.cart:
            cartItem = Product.objects(id=eachCartItem["productId"]).get()
            cart.append({
                "id":str(cartItem["id"]),
                "name":cartItem["name"],
                "price":cartItem["price"],
                "qty":eachCartItem["qty"]
            })
        return {
            "success": True,
            "userId":str(user.id),
            "message": "User logged in",
            "username": user.username,
            "email":user.email,
            "address":user.address,
            "phoneNumber":user.phoneNumber,
            "products":products,
            "orders":orders,
            "purchases":purchases,
            "likedProducts":likedProducts,
            "cart":cart
        }
    else:
        return{
            "success":False,
            "message":"Please log in first."
        }

def updateUserCart(productIdObj, userID):
    user = User.objects(id = userID).get()
    for i in range(len(user.cart)):
        if productIdObj["productId"] == user.cart[i]["productId"]:
            # if productIdObj["qty"] != user.cart[i]["qty"]:
            user.cart[i]["qty"] = productIdObj["qty"]
            user.save()
            return user
#            return True
            # else:
            #     return False

    # if doesnt match anything in user cart
    user.cart.append(productIdObj)
    user.save()
    return user
#    return True

def removeFromUserCart(productIdObj, UserID):
    user = User.objects(id = UserID).get()
    for i in range(len(user.cart)):
        print(user.cart[i]["productId"])
        if productIdObj["productId"] == user.cart[i]["productId"]:
            user.cart.pop(i)
            user.save()
            return user
        
    return False
def returnCart(user):
    cart = []
    for item in user.cart:
        prod = Product.objects(id=item["productId"]).get()
        cart.append({
            "id":str(prod.id),
            "name":prod.name,
            "price":prod.price,
            "qty": item["qty"]
        })
    return cart


@app.route('/api/deleteUserCart',methods=["DELETE"])
def delete_cart():
    data = request.get_json()
    if "user" in session and session.get("user") == data["userId"]:
        userId = session["user"]
        try:
            user = User.objects(id=userId).get()
            user.cart = []
            user.save()
            cart = returnCart(user)
            return {
                "success":True,
                "cart":cart
            }
        except:
            print(traceback.format_exc())
            return{
                "success": False,
                "message": "Error updating your cart. Make sure correct product Id and quantity is provided."
            }
    else:
        return {
            "success": False,
            "message": "Please log in first."
        }

@app.route('/api/updateUserCart', methods=["POST", "DELETE"])
def update_cart():
    data = request.get_json()
    if "user" in session and session.get("user") == data["userId"]:
        userId = session["user"]
        try:
            productIdObj = {
                    "productId": data["productId"],
                    "qty":data["qty"]
                }
            if request.method == "POST":
                user = updateUserCart(productIdObj, userId)
                # if success == True:
                cart = returnCart(user)
                return {
                        "success": True,
                        "cart": cart
                    }
                # else:
                #     return{
                #         "success": False,
                #         "message": "You are trying to add a duplicate of the same item with same qty"
                #     }
            elif request.method == "DELETE":
                user = removeFromUserCart(productIdObj, userId)
                if user:
                    cart = returnCart(user)
                    return {
                        "success":True,
                        "cart":cart
                    }
                else:
                    return {
                        "success":False,
                        "message":"Item does not exist in your cart."
                    }
        except:
            print(traceback.format_exc())
            return{
                "success": False,
                "message": "Error updating your cart. Make sure correct product Id and quantity is provided."
            }
          
    else:
        return {
            "success": False,
            "message": "Please log in first."
        }

@app.route("/api/logout", methods = ["post"])
def logout():
    session.pop("user", None)
    return {
        "success":True,
        "message":"logged out"
    }
