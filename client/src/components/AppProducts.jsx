import { array, number } from 'prop-types'
import BaseProduct from './BaseProduct'

const AppProducts = ({ products, rowLength }) => {
    let content = []

    for (const product of products) {
        if (content.length >= products.length && content.length % rowLength == 0) break

        const { _id, name, price, image } = product;
        content.push(<BaseProduct key={_id} id={_id} name={name} price={price} image={image} />)
    };

    if (content.length % rowLength != 0) while (content.length % rowLength != 0) content.push(<BaseProduct key={content.length} cls="hide" />)

    return <div className="products">{ content }</div>
}

AppProducts.propTypes = {
    products: array.isRequired,
    rowLength: number.isRequired
}

export default AppProducts
