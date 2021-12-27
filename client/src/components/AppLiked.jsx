import { useState } from 'react'
import { array } from 'prop-types'
import { XCircleIcon } from '@heroicons/react/outline'
import BaseProduct from './BaseProduct'

const AppLiked = ({ products, closeLiked }) => {
    let [ content, updateContent ] = useState([]);

    for (const product of products) {
        if (content.length >= products.length && content.length % 4 == 0) break

        const { _id, name, price, image } = product;
        content.push(<BaseProduct key={_id} id={_id} name={name} price={price} image={image} />)
    };

    if (content.length % 4 != 0) while (content.length % 4 != 0) content.push(<BaseProduct cls="hide" />)

    return (
        // <div className="background" onBlur={(e) => closeLiked(e)}>
        <div id="liked" onBlur={closeLiked} tabIndex="0">
            <span>
                <h2>Your Liked Items</h2>
                <XCircleIcon onClick={closeLiked} />
            </span>
            
            <div className="products">
                { content }
            </div>
        </div>
        // </div>
    )
}

AppLiked.propTypes = {
    products: array.isRequired
}

export default AppLiked
