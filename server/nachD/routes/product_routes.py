from flask import request, redirect, url_for,session
from nachD.models import User, Order, Product, Review, Status
import mongoengine
import traceback
from nachD import app
import os
import secrets
from flask import current_app
from PIL import Image, ImageOps


def delete_product(userId:str, productId:str):
# When deleting product warn the merchant that any outstanding orders with the product will now display as product deleted. Suggest clearing all pending orders first.
    user = User.objects(id=userId).get()
    # product found in merchant's product list. 
    for matchingProduct in user.products:
        if str(matchingProduct.id) == productId:
            prod = Product.objects(id=productId).get()
            delete_image(prod)
            isSuccess = prod.delete()
            print(isSuccess)
            return isSuccess

def save_image(prod, data):
    pic_file = data.files.get('picture')
    if pic_file.filename:
        
        
        fn, ext = os.path.splitext(pic_file.filename)
        ext = ext.lower()
        if ext in ['.jpg', '.png', '.jpeg']:
            print(ext)
            

            picture_fn = secrets.token_hex(8) + fn + ext
            picture_path = os.path.join(current_app.root_path, 'static/product_pics',picture_fn)
            # resizing and saving
            img = Image.open(pic_file)
            fixed_image = ImageOps.exif_transpose(img)
            fixed_image.thumbnail((400,400))
            fixed_image.save(picture_path)
            prod.img = picture_fn
        else:
            raise mongoengine.errors.ValidationError 
    return prod
		
def add_product(request, user):
    data = request
    product = Product()
    prod = save_image(product, data)
    
    data = data.form.to_dict()
    prod.name = data["name"]
    prod.price = float(data["price"])
    prod.user = user
    prod.desc = data["desc"]
    prod.qty = int(data["qty"])
    prod.save()

	# After creating the product we also add the product into the User's product list
    user.products.append(prod)
    user.save()

    return prod
def delete_image(prod):
    img_path = prod["img"]
    try:
        os.remove(current_app.root_path+"/static/product_pics/"+img_path)
    except FileNotFoundError:
        pass

def replace_image(prod, image_data):
    delete_image(prod)
    return save_image(prod, image_data)

def update_product(request):
    image_data = request
    data = request.form.to_dict()
    product = Product.objects(id=data["productId"]).get()
    
    prod = replace_image(product, image_data)
    
    product.name=data["name"]
    prod.price=float(data["price"])
    prod.desc=data["desc"]
    prod.qty=int(data["qty"])
    prod.save()

    return prod

def post_review(data, user, product_id):
	
	order = ""
	# find the order id in purchaser's order list. Make sure the user has the order id. Might need to check if they r merchant
	for matchingOrder in user.orders:
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
					rev = Review(user=user, rating=data["rating"], comment=data["comment"])
					prod = Product.objects(id=product_id).get()
					rev.save()
					prod.reviews.append(rev)
					prod.save()

					return [rev, prod]
	return False
@app.route("/product/<product_id>")
def get_one_product(product_id):
    try:

        reviews = []
        prod = Product.objects(id=product_id).get()
        print(prod)
        for review in prod.reviews:
            reviews.append({
                "rating":review.rating,
                "comment":review.comment,
                "user": review.user.username if review.user else "Deleted User"
            })
        
        return {
            "success":True,
            "product":{
                "id":product_id,
                "name":prod["name"],
                "price":prod["price"],
                "desc":prod["desc"],
                "qty": prod["qty"],
                "img":prod["img"],
                "user":{
                    "user":str(prod["user"]["id"]),
                    "username":prod["user"]["username"]
                },
                "reviews":reviews
            }
        }
    except mongoengine.DoesNotExist:
        return {
            "success":False,
            "message":"Product not found."
        }, 404
    except:
        print(traceback.format_exc())
        return {
            "success":False,
            "message":"Error while retrieving the product. Please try again."
        }, 404

@app.route('/product/admin', methods=["Post", "Patch"])
def product_route():

    if "user" not in session:
         # Not logged in
        return {
            "auth":False,
            "message":"Please login first."
        }
    try:
        userId = session["user"]
        user = User.objects(id=userId).get() 

        # Add product
        if request.method == "POST":
            # Find the user first, then add product
            prod = add_product(request,user)
            return {
                "success":True,
                "id":str(prod["id"]),
                "name":prod["name"],
                "price":prod["price"],
                "desc": prod["desc"],
                "qty": prod["qty"],
                "img":prod["img"],
                "user": str(prod["user"]["id"])
            }

        # Update the products with product id
        elif request.method == "PATCH":
            
            
            prod = update_product(request)
            return {
                "success":True,
                "id":str(prod["id"]),
                "name":prod["name"],
                "price":prod["price"],
                "desc": prod["desc"],
				"qty": prod["qty"],
                "img":prod["img"],
                "user": str(prod["user"]["id"])
            }

    except mongoengine.errors.ValidationError:
        print(traceback.format_exc())
        return{
            "success":False,
            "message":"We only accept jpg, png, jpeg file formats."
        }
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return{
            "success":False,
            "message":"Error while performing the action. Try again."
        }


@app.route('/product/admin/<product_id>', methods=["DELETE"])
def product_delete_route(product_id):
    # Delete a products by looking at users array of orders placed with them. And search for the product id.
    # If the product Id exist in the array. Don't allow delete.

    if "user" not in session:
        # Not logged in
        return {
            "auth":False,
            "message":"Please login first."
        }
    try:
        userId = session['user']
 
        return_code = delete_product(userId, product_id)
        if bool(return_code):
            return {
                "success":True,
                "message":"Product deleted."
            }
        
        # elif return_code == 2:
        #     return {
        #         "success":False,
        #         "message": "Product could not be deleted as there are pending orders. Complete orders before deleting them."
        #     }
        else:
            return {
                "success":False,
                "message": "You do not have permission to delete the product. Please log in with the correct user."
            }
    except:
        print(traceback.format_exc())
        return {
            "success":False,
            "message": "Error deleting product. Try again."
        }

   
@app.route('/product/review/<product_id>',methods=['post'])
def review_product(product_id):

    data = request.get_json()
    if "user" not in session:
        # Not logged in
        return {
            "auth":False,
            "message":"Please login first."
        }
    try:
        userId = session["user"]
        
        # The purchaser
        user = User.objects(id=userId).get()
        
        feedback = post_review(data,user, product_id)
        if not feedback: # if post_review return false means order not completed yet and cnt review
            return {
                "success":False,
                "message":"You cannot review a product that you didn't purchase or the status is not completed."
            }
           
    except mongoengine.DoesNotExist:
        print(traceback.format_exc())
        return{
            "success":False,
            "message":"Product does not exist."
        }

    except:
        print(traceback.format_exc())
        return{
            "success":False,
            "message":"Error while reviewing product. Try again."
        }
    else:
        return {
            "success":True,
            "comment":feedback[0]["comment"],
            "rating":feedback[0]["rating"],
            "product":{
                "id":str(feedback[1]["id"]),
                "name":feedback[1]["name"],
                "price":feedback[1]["price"],
            }
        }