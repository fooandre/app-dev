import { XCircleIcon } from '@heroicons/react/outline'
import AppProducts from './AppProducts'

const likedStyles = {
    backgroundColor: '#3f4248',
    borderRadius: '5px',
    color: 'white',
    height: '80vh',
    width: '80vw',
    position: 'fixed',
    top: '50vh',
    left: '50vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'flex-start',
    gap: '2vh',
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
    position: 'fixed',
    height: '100vh',
    width: '95vw',
    marginLeft: '5vw'
}

const AppLiked = ({ close, products }) => {
    return (
        <>
            <dialog id="liked" style={likedStyles}>
                <span style={spanStyles}>
                    <h2>Your Liked Items</h2>
                    <XCircleIcon onClick={close} style={svgStyles} />
                </span>
                
                <AppProducts products={products} rowLength={4} />
            </dialog>

            <div onClick={close} style={backgroundStyles} />
        </>
    )
}

export default AppLiked
