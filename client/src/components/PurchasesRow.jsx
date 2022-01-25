import { object } from 'prop-types';
import { Link } from 'react-router-dom';

const PurchasesRow = ({ product: { id, name, price, date_ordered: date, status, qty } }) => {
  return (
      <tr>
        <td style={{paddingLeft: '1vw'}}><Link to={`/product/${id}`}>{ name }</Link></td>
        <td>{ price.toFixed(2) }</td>
        <td>x{ qty }</td>
        <td>{ date.split("/").join("-") }</td>
        <td style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>{ status }</td>
    </tr>
  )
};

PurchasesRow.propTypes = {
    product: object.isRequired
}

export default PurchasesRow;
