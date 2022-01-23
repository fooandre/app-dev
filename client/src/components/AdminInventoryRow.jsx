import { BanIcon, DotsHorizontalIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

const buttonStyles = {
    height: '3vh',
    cursor: 'pointer',
    marginLeft: '1vh'
}

const AdminInventoryRow = ({ product: { id, name, price, qty }, updateQty, deleteProduct  }) => {
    return (
        <tr>
            <td style={{paddingLeft: '1vw', cursor: 'pointer'}}><Link to={`/product/${id}`}>{ name }</Link></td>
            <td>{ +price.toFixed(2) }0</td>
            <td>x{ qty }</td>
            <td style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <MinusCircleIcon style={buttonStyles} onClick={() => updateQty("dec")} />
                <PlusCircleIcon style={buttonStyles} onClick={() => updateQty("inc")} />
                <BanIcon style={{color: 'red', ...buttonStyles}} onClick={() => deleteProduct(id)} />
                <DotsHorizontalIcon style={{...buttonStyles, marginLeft: '1vw'}} onClick={() => {}} />
            </td>
        </tr>
      )
};

AdminInventoryRow.propTypes = {
    product: object.isRequired
};

export default AdminInventoryRow;
