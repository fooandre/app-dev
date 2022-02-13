import { ArrowSmLeftIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column'
};

const backBtnStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1vh'
};

const NotFound = () => {
  return (
    <section style={{ gap: '5vh', ...sectionStyles }}>
      <h3 style={{ color: 'rgb(63, 66, 72)' }}>Page not found</h3>
      <Link style={backBtnStyles} className="back-to-shop" to="/">
        <ArrowSmLeftIcon />
        Back to shop
      </Link>
    </section>
  );
};

export default NotFound;
