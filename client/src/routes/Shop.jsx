import { array } from 'prop-types';
import AppCategories from '../components/AppCategories';
import AppGrid from '../components/AppGrid';
import BaseProduct from '../components/BaseProduct';

const Shop = ({ products }) => {
    let content = [];

    // console.log(products);
    for (const product of products) {
        if (content.length >= products.length && content.length % rowLength == 0) break;
        content.push(<BaseProduct key={product.id} product={product} />);
    };

    return (
        <>
            <AppCategories showIcons={true} />
            { content.length == 0? <h1>No products to show</h1> : <AppGrid rowLength={5}>{ content }</AppGrid> }
        </>
    )
}

Shop.propTypes = {
    products: array.isRequired
}

export default Shop
