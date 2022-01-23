import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { bool, func, string } from 'prop-types';
import { useState } from 'react';

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
  color: 'red',
  height: '4vh',
  margin: '1px'
}

const counterStyles = {
  border: '1px solid red',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '1vw',
  padding: '1vh 1vw'
}

const addToCartStyles = {
  backgroundColor: 'red',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '1vh',
  fontSize: '0.8rem',
  fontWeight: '700'
}

const disabledStyles = {
  backgroundColor: 'gray',
  pointerEvents: 'none'
}

const ProductButtons = ({ productId, liked, toggleLiked, addToCart }) => {
  let [ loggedIn, setLoggedIn ] = useState("userId" in sessionStorage);
  let inCart = false;

  if (loggedIn) {   
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    for (const { id, qty } of cart) if (productId === id) inCart = true;

    return (
      <span style={callToActionStyles}>
        <HeartIcon onClick={toggleLiked} id="heart" style={liked? {...heartStyles, fill:'red'} : heartStyles} />
        { inCart && <button style={{...addToCartStyles, ...disabledStyles}}>Item in cart</button> }
        { inCart || <button onClick={addToCart} style={addToCartStyles}>Add to Cart <ShoppingCartIcon style={{height: '3vh'}} /></button> }
      </span>
    )
  }

  return (
    <span style={callToActionStyles}>
      <button onClick={addToCart} style={{...addToCartStyles, ...disabledStyles}}>Add to Cart</button>
    </span>
  )
};

ProductButtons.propTypes = {
  productId: string.isRequired,
  liked: bool.isRequired,
  toggleLiked: func.isRequired,
  addToCart: func.isRequired,
}

export default ProductButtons;
