import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppCategories from '../components/AppCategories';
import ProductButtons from '../components/ProductButtons';
import ProductReviews from '../components/ProductReviews';


const productStyles = {
    position: 'relative',
    left: '45vw',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '2vw',
    transform: 'translateX(-50%)'
}

const sectionStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
}

const leftStyles = {
    width: '20vw',
    justifyContent: 'space-between',
    gap: '1vh'
}

const rightStyles = {
    width: '50vw',
    gap: '5vh'
}

const titleStyles = {
    width: 'inherit',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
}

const rightTitleStyles = {
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
    height: '5vh',
    alignItems: 'center',
    padding: '1vh 1vw'
}

const h3Styles = {
    fontWeight: '100'
}

const descH3Styles = {
    maxWidth: 'inherit'
}

const imgStyles = {
    borderRadius: '5px',
    width: '20vw',
    height: '20vw'
}

const infoStyles = {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '3vh'
}

const spanStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1vh',
    margin: '0 1vw'
}


const Product = () => {
    const loggedIn = "userId" in sessionStorage;    
    const user = JSON.parse(sessionStorage.getItem('userId'));
    const { productId } = useParams();
    
    let [ product, setProduct ] = useState(null);
    let [ src, setSrc ] = useState("");
    let [ reviews, setReviews ] = useState([]);
    let [ liked, setLiked ] = useState(false);
    
    useEffect(async () => {
        let res = await fetch(`http://127.0.0.1:5000/api/product/${productId}`);
        const { product } = await res.json();
        
        const { id, img: image, reviews, qty } = product;
        
        res = await fetch(`http://127.0.0.1:5000/static/product_pics/${image}`);
        
        setSrc(URL.createObjectURL(await res.blob()));
        setProduct(product);
        setReviews(reviews);

        if (loggedIn) {
            const likedProducts = JSON.parse(sessionStorage.getItem("likedProducts"));
            for (const { id } of likedProducts) if (productId === id) return setLiked(true);
        }
    }, [])
    
    const toggleLiked = async () => {
        try {
            setLiked(!liked);
            const method = liked? "PATCH" : "POST";

            const res = await fetch("/api/likedProduct", {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "userId": user,
                    "productId": productId
                })
            })

            const { success, message, likedProducts } = await res.json();

            if (success) {
                sessionStorage.setItem('likedProducts', JSON.stringify(likedProducts));
                return window.location.reload();
            }

            alert(message);
        } catch (err) { console.error(err) };
    }

    const addToCart = async () => {
        let p = prompt("How many do you want to add to cart?");

        if (parseInt(p) > product.qty) return alert(`Sorry, item only has ${product.qty} left in stock.`);
        if (p === null || p === "") return alert("Process cancelled.");
        
        const qty = parseInt(p);

        try {
            const res = await fetch("/api/updateUserCart", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "userId": user,
                    "productId": productId,
                    "qty": qty
                })
            })

            const { cart } = await res.json();
            sessionStorage.setItem('cart', JSON.stringify(cart));
            alert("Item added to your cart!");
            window.location.reload();
        } catch (err) { console.error(err) };
    }

    // TODO: add review function
    const addReview = () => {}
    
    return (
        <>
            <AppCategories />

            { product && <section style={productStyles}>
                <section style={{...sectionStyles, ...leftStyles}}>
                    <img src={src} style={imgStyles} />
                    <title style={titleStyles}>
                        <h2 style={{textTransform:'capitalize'}}>{ product.user.username }</h2>
                    </title>
                </section>

                <section style={{...sectionStyles, ...rightStyles}}>
                    <div style={infoStyles}>
                        <title style={{...titleStyles, ...rightTitleStyles}}>
                            <h2>{ product.name }</h2>
                            <h3 style={h3Styles}>${ product.price }</h3>
                        </title>

                        <ProductButtons productId={productId} liked={liked} toggleLiked={toggleLiked} addToCart={addToCart} />

                        <span style={spanStyles}>
                            <h2>Category</h2>
                            <h3 style={h3Styles}>{ product.category }</h3>
                        </span>
                        
                        <span style={spanStyles}>
                            <h2>Description</h2>
                            <h3 style={{...h3Styles, ...descH3Styles}}>{ product.desc }</h3>
                        </span>
                    </div>

                    <ProductReviews reviews={reviews} />
                </section>
            </section> }
        </>
    )
}

export default Product
