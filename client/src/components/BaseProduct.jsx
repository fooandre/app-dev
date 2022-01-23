import { func, object } from 'prop-types';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const figureStyles = {
    borderRadius: '5px',
    width: '17vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    gap: '1vh',
    padding: '1vh 1vw',
    margin: '2px'
}

const figcaptionStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
}

const imgStyles = {
    borderRadius: '5px',
    width: '15vw',
    height: '15vw'
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
                <figcaption style={figcaptionStyles}>
                    <h4>{ name }</h4>
                    <h3>${ price }</h3>
                </figcaption>            
                
                <img src={src} style={imgStyles} />
            </figure>
        </Link>
    )
}

BaseProduct.propTypes = {
    product: object.isRequired,
    close: func
}

export default BaseProduct
