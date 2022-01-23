import { array, string } from 'prop-types';
import BaseTableRow from './BaseTableRow';

const divStyles = {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2vh',
  padding: '2vh 2vw',
  marginBottom: '3vh'
}

const BaseTable = ({ orderId, products }) => {
  let content = [];
  
  for (const product of products) content.push(<BaseTableRow key={product.id} product={product} />);

  return (
    <div style={divStyles}>
      <h3 style={{color: 'rgb(63, 66, 72)'}}>Order id: { orderId }</h3>
      
      <table>
        <thead>
          <tr>
            <td>Product name</td>
            <td>Price ($)</td>
            <td>Date ordered</td>
            <td>Status of Delivery</td>
            <td>Quantity</td>
            </tr>
          </thead>
        <tbody>{ content }</tbody>
      </table>
    </div>
  )
};

BaseTable.propTypes = {
  orderId: string.isRequired,
  products: array.isRequired
}

export default BaseTable;
