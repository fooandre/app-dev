import { XCircleIcon } from '@heroicons/react/outline';
import BaseGrid from './BaseGrid';
import BaseProduct from './BaseProduct';

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
    padding: '5vh 3vw',
    transform: 'translate(-50%, -50%)',
    opacity: '1',
    zIndex: '20'
}

const spanStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

const svgStyles = {
    height: '3vh'
}

const backgroundStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    zIndex: '15'
}

const AppLiked = ({ close }) => {
    let content = [];
    const likedProducts = JSON.parse(sessionStorage.getItem("likedProducts"));
    for (const { id, ...product } of likedProducts) content.push(<BaseProduct key={id} product={{id, ...product}} closeLiked={close} />);

    return (
        <>
            <dialog id="liked" style={likedStyles}>
                <span style={spanStyles}>
                    <h2>Your Liked Items</h2>
                    <XCircleIcon onClick={close} style={svgStyles} />
                </span>

                { content.length == 0? <span>No products to display, like some products to get started!</span> : <BaseGrid rowLength={3}>{ content }</BaseGrid> }
            </dialog>

            <div onClick={close} style={backgroundStyles} />
        </>
    )
}

export default AppLiked
