import { func, object } from 'prop-types';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const figureStyles = {
    borderRadius: '5px',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    gap: '1vh',
    cursor: 'pointer',
    padding: '2vh 1vw',
    margin: '6px'
}

const imgStyles = {
    borderRadius: '5px',
    width: '20vw',
    aspectRatio: '4/3',
    objectFit: 'cover',
    objectPosition: '50% 50%'
}

const BaseProduct = ({ product, closeLiked }) => {
    const { id, name, price, img: image } = product;

    let [ src, setSrc ] = useState();

    useEffect(async () => {
        const res = await fetch(`http://127.0.0.1:5000/static/product_pics/${image}`);
        setSrc(URL.createObjectURL(await res.blob()));
    }, [])
    
    return (
        <Link to={`/product/${id}`} onClick={closeLiked}>
            <figure style={figureStyles}>
                <img src={src} style={imgStyles} />
                
                <figcaption>
                    <h4 style={{fontWeight: '500'}}>{ name }</h4>
                    <h3>${ price.toFixed(2) }</h3>
                </figcaption>            
                
            </figure>
        </Link>
    )
}

BaseProduct.propTypes = {
    product: object.isRequired,
    close: func
}

export default BaseProduct
