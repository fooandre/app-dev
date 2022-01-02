import { string, object } from 'prop-types'
import { Link } from 'react-router-dom'

const figureStyles = {
    borderRadius: '5px',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    gap: '1vh',
    padding: '1vh 1vw'
}

const figcaptionStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

const imgStyles = {
    borderRadius: '5px',
    width: '15vw',
    height: '15vw'
}


const BaseProduct = ({ cls, product }) => {
    const { _id: id, name, price, image } = product;
    const disabled = cls == "hide";
    
    return (
        <Link to={`/product/${id}`} onClick={disabled? e => e.preventDefault(): {}}>
            <figure style={disabled? {...figureStyles, opacity:'0',cursor:'default'} : figureStyles}>
                <figcaption style={figcaptionStyles}>
                    <h3>{ name }</h3>
                    <h3>${ price }</h3>
                </figcaption>
            
                <img src={image} style={imgStyles} />
            </figure>
        </Link>
    )
}

BaseProduct.propTypes = {
    cls: string,
    product: object
}

BaseProduct.defaultProps = {
    product: {
		'_id': null,
		'name': null,
		'price': 0,
		'user': null,
		'category': null,
		'desc': null,
		'qty': 0,
		'image': 'null',
		'reviews': []
	},
}

export default BaseProduct
