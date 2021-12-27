import { Link } from 'react-router-dom'

const AppCategories = () => {
    const categories = {
        "Home & Living": "../../static/Home.png",
        "Fashion & Accessories": "../../static/Shirt.png",
        "Electronics": "../../static/Laptop.png",
        "Toys & Games": "../../static/Ball.png"
    };

    let content = [];

    for (const category in categories) {
        content.push(<Link to="/search">
                        <figure>
                            <img src={categories[category]} />
                            <figcaption>{category}</figcaption>
                        </figure>
                    </Link>)
    };

    return (
        <div id="categories">
            { content }
        </div>
    )
}

export default AppCategories
