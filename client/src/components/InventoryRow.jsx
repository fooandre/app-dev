import { BanIcon, MinusCircleIcon, PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { func, object } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const buttonStyles = {
  height: '3vh',
  cursor: 'pointer',
  marginLeft: '1vh'
};

const InventoryRow = ({
  product: { id, name, price, qty },
  updateQty,
  deleteProduct,
  editProduct
}) => {
  let [update, setUpdate] = useState([]);

  const handleEdit = async () => {
    try {
      let res = await fetch(`http://127.0.0.1:5000/api/product/${id}`);
      const { product } = await res.json();
      sessionStorage.setItem('editProduct', JSON.stringify(product));
      editProduct(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr>
      <td style={{ paddingLeft: '1vw', cursor: 'pointer' }}>
        <Link to={`/product/${id}`}>{name}</Link>
      </td>
      <td>{price.toFixed(2)}</td>
      {qty === 0 ? <td>Out of stock</td> : <td>x{qty}</td>}
      <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <MinusCircleIcon style={buttonStyles} onClick={() => updateQty(id, qty - 1)} />
        <PlusCircleIcon style={buttonStyles} onClick={() => updateQty(id, qty + 1)} />
        <BanIcon style={{ color: 'red', ...buttonStyles }} onClick={() => deleteProduct(id)} />
        <PencilAltIcon style={{ ...buttonStyles, marginLeft: '1vw' }} onClick={handleEdit} />
      </td>
    </tr>
  );
};

InventoryRow.propTypes = {
  product: object.isRequired,
  updateQty: func.isRequired,
  deleteProduct: func.isRequired,
  editProduct: func.isRequired
};

export default InventoryRow;
