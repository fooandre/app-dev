import { AnnotationIcon } from '@heroicons/react/outline';
import { object, string } from 'prop-types';
import { Link } from 'react-router-dom';

const PurchasesRow = ({
  orderId,
  product: { id, name, price, date_ordered: date, status, qty }
}) => {
  const addReview = async () => {
    let rating, comment;

    rating = prompt('Input a rating for this product (0-5).');
    if (rating === null) return alert('Process cancelled.');
    if (
      parseInt(rating) < 0 ||
      parseInt(rating) > 5 ||
      rating.trim() === '' ||
      Number.isNaN(parseInt(rating))
    )
      return alert(`Please only input an number between 0 and 5 (inclusive).`);
    rating = Math.round(rating);

    comment = prompt('Please enter a comment as part of your review');
    if (comment === null || comment.trim() === '')
      return alert('Please include a comment in your review.');

    if (!confirm(`Post review \u{0022}${comment}\u{0022} with rating ${rating}?`))
      return alert('Process cancelled.');

    try {
      const res = await fetch(`api/product/review/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: JSON.parse(sessionStorage.getItem('userId')),
          orderId: orderId,
          rating: rating,
          comment: comment
        })
      });

      const { success, message } = await res.json();

      if (success) return alert('Comment added');
      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr>
      <td style={{ paddingLeft: '1vw' }}>
        <Link to={`/product/${id}`}>{name}</Link>
      </td>
      <td>{price.toFixed(2)}</td>
      <td>x{qty}</td>
      <td>{date.split('/').join('-')}</td>
      {status === 'Completed' || (
        <td
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1vw' }}
        >
          {status}
        </td>
      )}
      {status === 'Completed' && (
        <td
          className="completed-order"
          onClick={addReview}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1vw',
            cursor: 'pointer'
          }}
        >
          {status}
          <AnnotationIcon />
        </td>
      )}
    </tr>
  );
};

PurchasesRow.propTypes = {
  orderId: string.isRequired,
  product: object.isRequired
};

export default PurchasesRow;
