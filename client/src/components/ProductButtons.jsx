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

const counterStyles = {
  border: '1px solid red',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '1vw',
  padding: '1vh 1vw'
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
        <HeartIcon onClick={toggleLiked} id="heart" style={liked? {fill: 'red'} : {}} />
        { inCart && <button id="add-to-cart" style={disabledStyles}>Item in cart</button> }
        { inCart || <button id="add-to-cart" onClick={addToCart}>Add to Cart <ShoppingCartIcon /></button> }
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
