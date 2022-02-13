import { StarIcon } from '@heroicons/react/outline';

const reviewStyles = {
  borderRadius: '5px',
  border: '1px solid black',
  width: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  gap: '1vh',
  margin: '0.5vh 0 0 0',
  padding: '1vh 1vw'
};

const inlineStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const h2Styles = {
  fontSize: 'inherit'
};

const h3Styles = {
  fontStyle: 'italic',
  fontSize: '0.9rem'
};

const ProductReview = ({ review }) => {
  const { user, rating, comment, date_created: date } = review;

  const stars = [];
  for (let i = 1; i <= rating; i++)
    stars.push(<StarIcon style={{ height: '2vh', fill: 'yellowgreen' }} key={i} />);

  const msPerDay = 1000 * 60 * 60 * 24;
  const dateUtc = Date.UTC(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    new Date(date).getDate()
  );
  const currentDate = new Date();
  const currentUtc = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const dateDiff = Math.floor((currentUtc - dateUtc) / msPerDay);
  const dateDiffInHours = Math.floor(((currentUtc - dateUtc) / msPerDay) * 24);

  return (
    <div style={reviewStyles}>
      <div style={inlineStyles}>
        <h2 style={h2Styles}>
          @{user} {stars}
        </h2>
        {dateDiff >= 365 * 2 && <h3 style={h3Styles}>{Math.floor(dateDiff / 365)} years ago</h3>}
        {dateDiff >= 365 && <h3 style={h3Styles}>{Math.floor(dateDiff / 365)} year ago</h3>}
        {dateDiff > 1 && <h3 style={h3Styles}>{dateDiff} days ago</h3>}
        {dateDiff === 1 && <h3 style={h3Styles}>{dateDiff} day ago</h3>}
        {dateDiff === 0 && <h3 style={h3Styles}>Today</h3>}
      </div>

      <p>{comment}</p>
    </div>
  );
};

export default ProductReview;
