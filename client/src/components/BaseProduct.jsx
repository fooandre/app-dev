import { string, number } from 'prop-types'

const BaseProduct = ({ cls, id, name, price, image }) => {
    return (
        <figure id={id} className={cls}>
            <figcaption>
                <h3>{ name }</h3>
                <h3>${ price }</h3>
            </figcaption>
        
            <img src={image} />
        </figure>
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
