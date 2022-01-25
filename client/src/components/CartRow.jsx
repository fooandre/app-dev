import { BanIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { func, object } from 'prop-types';
import { Link } from 'react-router-dom';

const buttonStyles = {
  height: '3vh',
  cursor: 'pointer',
  marginLeft: '1vh'
}

const CartRow = ({ product: { id, name, price, qty }, updateCart, removeFromCart }) => {
  return (
    <tr>
      <td style={{paddingLeft: '1vw', cursor: 'pointer'}}><Link to={`/product/${id}`}>{ name }</Link></td>
      <td>{ price.toFixed(2) }</td>
      <td>x{ qty }</td>
      <td style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <MinusCircleIcon style={buttonStyles} onClick={() => updateCart("dec", id, qty-1)} />
        <PlusCircleIcon style={buttonStyles} onClick={() => updateCart("inc", id, qty+1)} />
        <BanIcon style={{color: 'red', ...buttonStyles}} onClick={() => removeFromCart(id)} />
        </td>
    </tr>
  )
};

CartRow.propTypes = {
    product: object.isRequired,
    updateCart: func.isRequired,
    removeFromCart: func.isRequired
}

export default CartRow;
