import os
import secrets
import traceback
from cmath import log

import mongoengine
from flask import current_app, redirect, request, session, url_for
from nachD import app
from nachD.models import Order, Product, Review, Status, User
from PIL import Image, ImageOps


class WrongOwner(Exception):
    def __init__(self, message) -> None:
        super().__init__(message)


class NotMerchant(Exception):
    def __init__(self, message) -> None:
        super().__init__(message)

class IncorrectPicFormat(Exception):
    def __init__(self, message) -> None:
        super().__init__(message)

class UpdateQuantityError(Exception):
    def __init__(self, message) -> None:
        super().__init__(message)  

def delete_product(userId: str, productId: str):
    # When deleting product warn the merchant that any outstanding orders with the product will now display as product deleted. Suggest clearing all pending orders first.
    user = User.objects(id=userId).get()
    # product found in merchant's product list.
    for matchingProduct in user.products:
        if str(matchingProduct.id) == productId:
            prod = Product.objects(id=productId).get()
            delete_image(prod)
            prod.delete()
            user.products.remove(prod)
            user.save()
            return user


def save_image(prod, data):
    print(data.files)
    pic_file = data.files.get('picture')

    # if pic_file:
    #     fn, ext = os.path.splitext(pic_file)
    if pic_file.filename:
        fn, ext = os.path.splitext(pic_file.filename)
        ext = ext.lower()
        if ext in ['.jpg', '.png', '.jpeg']:
            print(ext)

            picture_fn = secrets.token_hex(8) + fn + ext
            picture_path = os.path.join(
                current_app.root_path, 'static/product_pics', picture_fn)
            # resizing and saving
            img = Image.open(pic_file)
            fixed_image = ImageOps.exif_transpose(img)
            fixed_image.thumbnail((400, 400))
            fixed_image.save(picture_path)
            prod.img = picture_fn
        else:
            raise IncorrectPicFormat("We only accept jpg, png, jpeg file formats.")
    return prod


def add_product(request, user):
    data = request
    # first check if the user is a merchant, then only add a product.
    product = Product()
    prod = save_image(product, data)

    data = data.form.to_dict()
    prod.name = data["name"]
    prod.price = float(data["price"])
    prod.user = user
    prod.desc = data["desc"]
    prod.qty = int(data["qty"])
    prod.category = data["category"]
    prod.save()

    # After creating the product we also add the product into the User's product list
    user.products.append(prod)
    user.save()

    userId = user.id
    user = User.objects(id=userId).get()
    return user
    # else:
    #   raise NotMerchant("You do not have permission to add a product.")


def delete_image(prod):
    img_path = prod["img"]
    try:
        os.remove(current_app.root_path+"/static/product_pics/"+img_path)
    except FileNotFoundError:
        pass


def replace_image(prod, image_data):
    delete_image(prod)
    return save_image(prod, image_data)


def update_product(request, userId):
    image_data = request
    data = request.form.to_dict()
    # first check if the merchant owns the product, then only update the product.
    prod_id = data["productId"]
    product = Product.objects(id=prod_id).get()
    if str(product.user.id) == userId:
        prod = replace_image(product, image_data)
        prod.name = data["name"]
        prod.price = float(data["price"])
        prod.desc = data["desc"]
        prod.category = data["category"]
        prod.save()

        user = User.objects(id=userId).get()
        return user
    else:
        raise WrongOwner("You do not have permission to update the product.")


def post_review(data, user, product_id):

    order = ""
    # find the order id in purchaser's purchases list. Make sure the user has the order id. Might need to check if they r merchant
    for matchingOrder in user.purchases:
        if str(matchingOrder.id) == data["orderId"]:
            order = Order.objects(id=data["orderId"]).get()
            break

    # if order is not empty, found the order perform below
    if order:
        # find the matching product id
        for order in order.products:
            if str(order.product.id) == product_id:
                # check if status is completed first in orders, before allowing to review the product
                if order.status.value == Status.COMPLETED.value:
                    rev = Review(
                        user=user, rating=data["rating"], comment=data["comment"])
                    # check if the product has already been reviewed by this guy
                    if not order.already_reviewed:
                        prod = Product.objects(id=product_id).get()
                        rev.save()
                        prod.reviews.append(rev)
                        prod.save()

                        return [rev, prod]
    return False


@app.route("/api/product/<product_id>")
def get_one_product(product_id):
    try:
        reviews = []
        prod = Product.objects(id=product_id).get()
        print(prod)
        for review in prod.reviews:
            reviews.append({
                "rating": review.rating,
                "comment": review.comment,
                "date_created": review.date_created,
                "user": review.user.username if review.user else "Deleted User"
            })

        return {
            "success": True,
            "product": {
                "id": product_id,
                "name": prod["name"],
                "price": prod["price"],
                "desc": prod["desc"],
                "qty": prod["qty"],
                "img": prod["img"],
                "category":prod["category"].value,
                "user": {
                    "userId": str(prod["user"]["id"]),
                    "username": prod["user"]["username"]
                },
                "reviews": reviews
            }
        }
    except mongoengine.DoesNotExist:
        return {
            "success": False,
            "message": "Product not found."
        }, 404
    except:
        print(traceback.format_exc())
        return {
            "success": False,
            "message": "Error while retrieving the product. Please try again."
        }, 404

def update_quantity(list_product, userId):
    allProducts = []
    for update_qty in list_product["products"]:
        prod = Product.objects(id=update_qty["id"]).get()
        if str(prod.user.id) == userId:
            prod.qty = update_qty["qty"]
            prod.save()
            allProducts.append(prod)
    return allProducts

@app.route("/api/product", methods=["post"])
def update_products_qty():
    userId = session.get("user")
    
    data = request.get_json()
    try:
        if userId != data["userId"]:   
        # Not logged in
            return {
                "success": False,
                "message": "Please login first."
            }
            
        listofProducts = update_quantity(data,userId)
        user = User.objects(id=userId).get()
        if listofProducts:
            products=[]
            for prod in user.products:
                products.append({
                    "id":str(prod.id),
                    "name":prod.name,
                    "price":prod.price,
                    "qty":prod.qty,
                    "desc": prod.desc,
                    "category": prod.category.value
                })
            return {
                "success":True,
                "products":products
            }
        else:
           raise UpdateQuantityError("There was an error while updating quantity of some products.")
    except UpdateQuantityError as e:
        print(traceback.format_exc())
        return {
            "success":False,
            "message":str(e)
        }
    except:
        print(traceback.format_exc())
        return {
            "success":False
        }


@app.route('/api/product/admin', methods=["Post"])
def add_product_route():
    try:
        userId = session.get("user")

        if userId != request.form.to_dict()["userId"]:
            # Not logged in
            return {
                "success": False,
                "message": "Please login first."
            }
        # Add product
        if request.method == "POST":
            user = User.objects(id=userId).get()
            # Find the user first, then add product
            user = add_product(request, user)
            products = []

            for prod in user.products:
                products.append({
                    "id":str(prod.id),
                    "name":prod.name,
                    "price":prod.price,
                    "qty":prod.qty,
                    "desc": prod.desc,
                    "category": prod.category.value,
                    "img": prod.img
                })

            return {
                "success": True,
                "products": products
            }
    except IncorrectPicFormat as e:
        return {
            "success":False,
            "message":str(e)
        }
    except mongoengine.errors.ValidationError:
        print(traceback.format_exc())
        return{
            "success": False,
            "message": "Please only use Fashion & Accessories, Electronics, Toys & Games, Home & Living for category."
        }
    except (WrongOwner, NotMerchant) as e:
        return {
            "success": False,
            "message": str(e)
        }
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return{
            "success": False,
            "message": "Error while performing the action. Try again."
        }

@app.route('/api/product/admin/edit', methods=["Patch"])
def edit_product_route():
    try:
        userId = session.get("user")

        if userId != request.form.to_dict()["userId"]:
            # Not logged in
            return {
                "success": False,
                "message": "Please login first."
            }
        # Update the products with product id
        if request.method == "PATCH":

            user = update_product(request, userId)
            products = []

            for prod in user.products:
                products.append({
                    "id":str(prod.id),
                    "name":prod.name,
                    "price":prod.price,
                    "qty":prod.qty,
                    "desc": prod.desc,
                    "category": prod.category.value,
                    "img": prod.img
                })

            return {
                "success": True,
                "products": products
            }
    except IncorrectPicFormat as e:
        return {
            "success":False,
            "message":str(e)
        }
    except mongoengine.errors.ValidationError:
        print(traceback.format_exc())
        return{
            "success": False,
            "message": "Please only use Fashion & Accessories, Electronics, Toys & Games, Home & Living for category."
        }
    except (WrongOwner, NotMerchant) as e:
        return {
            "success": False,
            "message": str(e)
        }
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return{
            "success": False,
            "message": "Error while performing the action. Try again."
        }

@app.route('/api/product/admin/<product_id>', methods=["DELETE"])
def product_delete_route(product_id):
    # Delete a products by looking at users array of orders placed with them. And search for the product id.
    # If the product Id exist in the array. Don't allow delete.
    userId = session.get("user")
    data = request.get_json()
    if userId != data["userId"]:   
        # Not logged in
        return {
            "success": False,
            "message": "Please login first."
        }
    try:
        userId = session['user']

        isUser = delete_product(userId, product_id)
        if isUser:
            products=[]
            for prod in isUser.products:
                products.append({
                    "id": str(prod.id),
                    "name": prod["name"],
                    "price": prod["price"],
                    "desc": prod["desc"],
                    "qty": prod["qty"],
                    "img": prod["img"],
                    "category":prod["category"].value,
                    "user": {
                        "userId": str(prod["user"]["id"]),
                        "username": prod["user"]["username"]
                    },
                })
            return {
                "success": True,
                "products": products
            }

        else:
            return {
                "success": False,
                "message": "You do not have permission to delete the product. Please log in with the correct user."
            }
    except:
        print(traceback.format_exc())
        return {
            "success": False,
            "message": "Error deleting product. Try again."
        }


@app.route('/api/product/review/<product_id>', methods=['post'])
def review_product(product_id):
    userId = session.get("user")
    data = request.get_json()
    if userId != data["userId"]:   
        # Not logged in
        return {
            "success": False,
            "message": "Please login first."
        }
    try:
        # The purchaser
        user = User.objects(id=userId).get()

        feedback = post_review(data, user, product_id)
        if not feedback:  # if post_review return false means order not completed yet and cnt review
            return {
                "success": False,
                "message": "You cannot review a product that you didn't purchase or the status is not completed."
            }

    except mongoengine.DoesNotExist:
        print(traceback.format_exc())
        return{
            "success": False,
            "message": "Product does not exist."
        }

    except:
        print(traceback.format_exc())
        return{
            "success": False,
            "message": "Error while reviewing product. Try again."
        }
    else:
        return {
            "success": True,
            "comment": feedback[0]["comment"],
            "rating": feedback[0]["rating"],
            "date_created":feedback[0]["date_created"],
            "product": {
                "productId": str(feedback[1]["id"]),
                "name": feedback[1]["name"],
                "price": feedback[1]["price"],
            }
        }


@app.route("/api/product/all")
def get_all_products():
    try:
        all_products = Product.objects.all()
        products = []

        for eachProduct in all_products:
            reviews = []
            obj = {
                "id": str(eachProduct.id),
                "name": eachProduct["name"],
                "price": eachProduct["price"],
                "desc": eachProduct["desc"],
                "qty": eachProduct["qty"],
                "img": eachProduct["img"],
                "category":eachProduct["category"].value,
                "user": {
                    "userId": str(eachProduct["user"]["id"]),
                    "username": eachProduct["user"]["username"]
                },
            }
            for review in eachProduct.reviews:
                reviews.append({
                    "rating": review.rating,
                    "comment": review.comment,
                    "user": review.user.username if review.user else "Deleted User"
                })

            obj["reviews"] = reviews
            products.append(obj)
        return {
            "success": True,
            "products": products
        }
    except:
        print(traceback.format_exc())
        return {
            "success": False,
            "message": "Error retrieving products."
        }

@app.route('/api/allProducts', methods=['post'])
def get_users_products():
    userId = session.get("user")
    data = request.get_json()

    if userId != data["userId"]:   
        # Not logged in
        return {
            "success": False,
            "message": "Please login first."
        }

    user = User.objects(id=userId).get()

    products = []
    for product in user.products:
       products.append({
            "id":str(product.id),
            "name":product.name,
            "price":product.price,
            "qty":product.qty,
            "desc": product.desc,
            "category": product.category.value,
            "img": product.img
        })

    return {
        "success": True,
        "products": products
    }
