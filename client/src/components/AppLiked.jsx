import { XCircleIcon } from '@heroicons/react/outline';
import { func } from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BaseGrid from './BaseGrid';
import BaseProduct from './BaseProduct';

const likedStyles = {
  backgroundColor: '#3f4248',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  height: '80vh',
  width: '75vw',
  position: 'fixed',
  top: '50vh',
  left: '45vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '3vh',
  marginLeft: '5vw',
  padding: '5vh 3vw',
  transform: 'translate(-50%, -50%)',
  opacity: '1',
  zIndex: '20'
};

const spanStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1.25vw'
};

const svgStyles = {
  height: '3vh'
};

const backgroundStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  position: 'fixed',
  left: '3.5vw',
  height: '100vh',
  width: '96.5vw',
  zIndex: '15'
};

const AppLiked = ({ close }) => {
  const location = useLocation();
  let [currentPath, setCurrent] = useState(location.pathname);
  useEffect(() => {
    if (location.pathname !== currentPath) close();
  }, [location]);

  let [content, updateContent] = useState([]);

  useEffect(() => {
    const likedProducts = JSON.parse(sessionStorage.getItem('likedProducts'));
    for (const product of likedProducts)
      updateContent((content) => [...content, <BaseProduct key={product.id} product={product} />]);
  }, []);

  if (content)
    return (
      <>
        <dialog id="liked" style={likedStyles}>
          <span style={spanStyles}>
            <h2>Your Liked Items</h2>
            <XCircleIcon onClick={close} style={svgStyles} />
          </span>

          <div>
            {content.length == 0 ? (
              <span>No products to display, like some products to get started!</span>
            ) : (
              <BaseGrid rowLength={3}>{content}</BaseGrid>
            )}
          </div>
        </dialog>

        <div onClick={close} style={backgroundStyles} />
      </>
    );

  return 'Fetching your liked products...';
};

AppLiked.propTypes = {
  close: func.isRequired
};

export default AppLiked;
