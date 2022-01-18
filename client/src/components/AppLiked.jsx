import { XCircleIcon } from '@heroicons/react/outline';
import AppGrid from '../components/AppGrid';
import BaseProduct from '../components/BaseProduct';

const likedStyles = {
    backgroundColor: '#3f4248',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    height: '80vh',
    width: '80vw',
    position: 'fixed',
    top: '50vh',
    left: '50vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '3vh',
    marginLeft: '5vw',
    padding: '5vh 2vw',
    transform: 'translate(-50%, -50%)',
    opacity: '1',
    zIndex: '10'
}

const spanStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1vw'
}

const svgStyles = {
    height: '3vh'
}

const backgroundStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'fixed',
    height: '100vh',
    width: '95vw',
    marginLeft: '5vw'
}

const AppLiked = ({ close, products }) => {
    let content = [];

    for (const product of products) {
        if (content.length >= products.length && content.length % rowLength == 0) break;
        content.push(<BaseProduct key={product._id} product={product} />);
    };

    return (
        <>
            <dialog id="liked" style={likedStyles}>
                <span style={spanStyles}>
                    <h2>Your Liked Items</h2>
                    <XCircleIcon onClick={close} style={svgStyles} />
                </span>
                
                <AppGrid rowLength={4}>{ content }</AppGrid>
            </dialog>

            <div onClick={close} style={backgroundStyles} />
        </>
    )
}

export default AppLiked
