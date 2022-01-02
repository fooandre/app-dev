import { array, number } from 'prop-types'
import BaseProduct from './BaseProduct'

const productsStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
}

const AppProducts = ({ products, rowLength }) => {
    let content = []

    for (const product of products) {
        if (content.length >= products.length && content.length % rowLength == 0) break

        const { _id: id } = product;
        content.push(<BaseProduct key={id} product={product} />)
    };
    
    if (content.length % rowLength != 0) while (content.length % rowLength != 0) content.push(<BaseProduct key={content.length} cls="hide" />)
    
    return <div style={productsStyles}>{ content }</div>
}

AppProducts.propTypes = {
    products: array.isRequired,
    rowLength: number.isRequired
}

export default AppProducts
