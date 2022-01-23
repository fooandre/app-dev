import { array } from 'prop-types';

const reviewsStyles = {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1vh'
}

const reviewsH3Styles = {
    fontWeight: '700'
}

const hrStyles = {
    width: 'calc(85%)'
}

const addReviewStyles = {
    fontSize: '0.75rem',
    position: 'absolute',
    right: '0'
}

const ProductReviews = ({ reviews }) => {
    let renderReviews = [];
    
    for (const { id, ...review } of reviews) {;
        if (renderReviews.length >= reviews.length) break;
        renderReviews.push(<ProductReview key={id} review={review} />);
    }

    return (
        <div style={reviewsStyles}>
            <h3 style={reviewsH3Styles}>Reviews</h3>
            <hr style={hrStyles} />
            <button style={addReviewStyles}>Add review</button>
            { renderReviews.length == 0? <h3>No reviews to display</h3> : renderReviews }
        </div>
    )
};

ProductReviews.propTypes = {
    reviews: array.isRequired
}

export default ProductReviews;
