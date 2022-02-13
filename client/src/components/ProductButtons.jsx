import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { EmojiSadIcon } from '@heroicons/react/solid';
import { bool, func, number, string } from 'prop-types';

const callToActionStyles = {
  position: 'absolute',
  top: '8vh',
  right: '0',
  display: 'flex',
  alignItems: 'center',
  gap: '1vw'
};

const disabledStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  boxShadow: 'none',
  color: 'white',
  fontWeight: '500',
  fontSize: '1rem',
  cursor: 'default'
};

const ProductButtons = ({
  productId,
  liked,
  toggleLiked,
  inCart,
  addToCart,
  qtyInCart,
  qtyInStock
}) => {
  const loggedIn = 'userId' in sessionStorage;

  if (qtyInStock === 0)
    return (
      <span style={callToActionStyles}>
        <HeartIcon onClick={toggleLiked} id="heart" style={liked ? { fill: 'red' } : {}} />
        <button id="add-to-cart" style={disabledStyles}>
          Out of stock <EmojiSadIcon />
        </button>
      </span>
    );

  if (loggedIn)
    return (
      <span style={callToActionStyles}>
        <HeartIcon onClick={toggleLiked} id="heart" style={liked ? { fill: 'red' } : {}} />
        {inCart && (
          <button id="add-to-cart" style={disabledStyles}>
            In cart &nbsp; x{qtyInCart}
          </button>
        )}
        {inCart || (
          <button id="add-to-cart" onClick={addToCart}>
            Add to Cart <ShoppingCartIcon />
          </button>
        )}
      </span>
    );

  return (
    <span style={callToActionStyles}>
      <button onClick={(e) => e.preventDefault()} style={disabledStyles}>
        Add to Cart
      </button>
    </span>
  );
};

ProductButtons.propTypes = {
  productId: string.isRequired,
  liked: bool.isRequired,
  toggleLiked: func.isRequired,
  inCart: bool.isRequired,
  addToCart: func.isRequired,
  qtyInCart: number.isRequired,
  qtyInStock: number.isRequired
};

export default ProductButtons;
