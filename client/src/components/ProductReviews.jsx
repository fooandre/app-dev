import { array } from 'prop-types';
import { useState } from 'react';
import ProductReview from './ProductReview';

const reviewsStyles = {
  width: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1vh'
};

const reviewsH3Styles = {
  height: '3vh',
  fontWeight: '700',
  marginTop: '1vh'
};

const hrStyles = {
  width: '100%'
};

const ProductReviews = ({ reviews }) => {
  let [loggedIn, setLoggedIn] = useState('userId' in sessionStorage);

  let renderReviews = [];

  for (const review of reviews) {
    if (renderReviews.length >= reviews.length) break;
    renderReviews.push(<ProductReview key={renderReviews.length} review={review} />);
  }

  return (
    <div style={reviewsStyles}>
      <h3 style={reviewsH3Styles}>Reviews</h3>
      <hr style={hrStyles} />
      {renderReviews.length == 0 ? (
        <h3 style={{ fontWeight: '300' }}>No reviews to display</h3>
      ) : (
        renderReviews
      )}
    </div>
  );
};

ProductReviews.propTypes = {
  reviews: array.isRequired
};

export default ProductReviews;
