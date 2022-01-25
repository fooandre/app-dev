import { object } from 'prop-types';
import { Link } from 'react-router-dom';

const BaseTableRow = ({ product: { id, name, price, date_ordered: date, status, qty } }) => {
  return (
      <tr>
        <td style={{paddingLeft: '1vw'}}><Link to={`/product/${id}`}>{ name }</Link></td>
        <td>{ price.toFixed(2) }</td>
        <td>{ date.split("/").join("-") }</td>
        <td>{ status }</td>
        <td>x{ qty }</td>
      </tr>
  )
};

BaseTableRow.propTypes = {
    product: object.isRequired
}

export default BaseTableRow;
