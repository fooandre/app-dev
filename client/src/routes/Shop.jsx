import { array } from 'prop-types'
import AppCategories from '../components/AppCategories'
import AppProducts from '../components/AppProducts'

const Shop = ({ products }) => {
    return (
        <>
            <AppCategories showIcons={true} />
            <AppProducts products={products} rowLength={5} />
        </>
    )
}

Shop.propTypes = {
    products: array.isRequired
}

export default Shop
