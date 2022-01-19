import { bool } from 'prop-types';
import { Link } from 'react-router-dom';

const categoriesStyles = {
    backgroundColor: '#fafafa',
    color: 'black',
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 25vw',
    marginBottom: '2vh'
}

const figureStyles = {
    borderRadius: '10px',
    width: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1vh',
    overflow: 'visible'
}

const imgStyles = {
    height: '5vh',
    width: 'fit-content',
    objectFit: 'contain'
}

const AppCategories = ({ showIcons }) => {
    const categories = {
        "Home & Living": "../../static/Home.png",
        "Fashion & Accessories": "../../static/Shirt.png",
        "Electronics": "../../static/Laptop.png",
        "Toys & Games": "../../static/Ball.png"
    };

    let content = [];

    for (const category in categories) {
        content.push(<Link key={category} to="/search">
                        <figure style={figureStyles}>
                            <img src={categories[category]} style={showIcons? imgStyles : {display: 'none'}} />
                            <figcaption>{category}</figcaption>
                        </figure>
                    </Link>)
    };

    return <div id="categories" style={categoriesStyles}>{ content }</div>
}

AppCategories.propTypes = { showIcons: bool }
AppCategories.defaultProps = { showIcons: false }

export default AppCategories
