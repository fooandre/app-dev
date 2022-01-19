import { HeartIcon } from '@heroicons/react/outline';
import { array, bool } from 'prop-types';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import AppCategories from '../components/AppCategories';
import BaseReview from '../components/ProductReview';

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
    padding: '0 1vw'
}

const h3Styles = {
    fontWeight: '100'
}

const descH3Styles = {
    maxWidth: 'inherit'
}

const reviewsH3Styles = {
    fontWeight: '700'
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

const callToActionStyles = {
    position: 'absolute',
    top: '8vh',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '1vw'
}

const heartStyles = {
    borderRadius: '5px',
    color:'red',
    height:'4vh',
    outline: '1px solid black',
    padding: '1vh'
}

const addToCartStyles = {
    backgroundColor: 'red',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: '700'
}

const disabledStyles = {
    backgroundColor: 'gray',
    pointerEvents: 'none'
}

const spanStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1vh',
    margin: '0 1vw'
}

const reviewsStyles = {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1vh'
}

const hrStyles = {
    width: 'inherit'
}


const Product = ({ loggedIn, likedItems, products }) => {
    const product = products.filter(product => product._id == useParams().productId)[0];
    const { _id: id, name, price, user: { username }, category, desc, qty, image, reviews } = product;
    
    // let liked = likedItems.map(({ _id: id }) => id).includes(productId);
    let [ liked, toggleLiked ] = useState(false);

    let productReviews = [];

    for (const review of reviews) {
        if (productReviews.length >= reviews.length) break

        let item = <BaseReview key={review._id} review={review} />

        productReviews.push(item);
    }

    return (
        <>
            <AppCategories />

            <section style={productStyles}>
                <section style={{...sectionStyles, ...leftStyles}}>
                    <img src={image} style={imgStyles} />
                    <title style={titleStyles}>
                        <h2 style={{textTransform:'capitalize'}}>{ username }</h2>
                    </title>
                </section>

                <section style={{...sectionStyles, ...rightStyles}}>
                    <div style={infoStyles}>
                        <title style={{...titleStyles, ...rightTitleStyles}}>
                            <h2>{ name }</h2>
                            <h3 style={h3Styles}>${ price }</h3>
                        </title>

                        <span style={callToActionStyles}>
                            <HeartIcon onClick={() => toggleLiked(!liked)} id="heart" style={!loggedIn? {display:'none'} : liked? {...heartStyles, fill:'red'} : heartStyles} />
                            <button id="addToCart" style={loggedIn? addToCartStyles : {...addToCartStyles, ...disabledStyles}}>Add to Cart</button> 
                        </span>

                        <span style={spanStyles}>
                            <h2>Category</h2>
                            <h3 style={h3Styles}>{ category }</h3>
                        </span>
                        
                        <span style={spanStyles}>
                            <h2>Description</h2>
                            <h3 style={{...h3Styles, ...descH3Styles}}>{ desc }</h3>
                        </span>
                    </div>

                    <div style={reviewsStyles}>
                        <h3 style={reviewsH3Styles}>Reviews</h3>
                        <hr style={hrStyles} />
                        { productReviews }
                    </div>
                </section>
            </section>
        </>
    )
}

Product.propTypes = { 
    loggedIn: bool.isRequired,
    likedItems: array.isRequired,
    products: array.isRequired
}

Product.defaultProps = {
    loggedIn: false
}

export default Product
