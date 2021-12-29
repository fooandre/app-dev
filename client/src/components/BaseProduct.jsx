import { string, number } from 'prop-types'
import { Link } from 'react-router-dom'

const BaseProduct = ({ cls, id, name, price, image }) => {
    return (
        <Link to="/product">
            <figure id={id} className={cls}>
                <figcaption>
                    <h3>{ name }</h3>
                    <h3>${ price }</h3>
                </figcaption>
            
                <img src={image} />
            </figure>
        </Link>
    )
}

BaseProduct.propTypes = {
    cls: string,
    id: string,
    name: string,
    price: number,
    image: string
}

export default BaseProduct
