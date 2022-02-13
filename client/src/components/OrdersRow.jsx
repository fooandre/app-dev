import { func, object, string } from 'prop-types';
import { Link } from 'react-router-dom';

const selectStyles = {
  borderRadius: '5px',
  padding: '1vh 1vw'
};

const OrdersRow = ({
  orderId,
  order: {
    id: productId,
    name,
    price,
    qty,
    date_ordered: date,
    purchaser: { address },
    status
  },
  updateStatus
}) => {
  return (
    <tr className={status === 'Completed' ? 'order-completed' : ''}>
      <td style={{ paddingLeft: '1vw' }}>
        <Link to={`/product/${productId}`}>{name}</Link>
      </td>
      <td>{price.toFixed(2)}</td>
      <td>x{qty}</td>
      <td>{date.split('/').join('-')}</td>
      <td>{address}</td>
      <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <select
          onChange={(event) => updateStatus(orderId, productId, event)}
          value={status}
          style={selectStyles}
        >
          <option value="Order Placed">Order placed</option>
          <option value="Packing Order">Packing</option>
          <option value="Delivery">Delivering</option>
          <option value="Completed">Completed</option>
        </select>
      </td>
    </tr>
  );
};

OrdersRow.propTypes = {
  orderId: string.isRequired,
  order: object.isRequired,
  updateStatus: func.isRequired
};

export default OrdersRow;
