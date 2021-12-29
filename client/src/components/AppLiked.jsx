import { XCircleIcon } from '@heroicons/react/outline'
import AppProducts from './AppProducts'

const AppLiked = ({ close, products }) => {
    return (
        <>
            <dialog id="liked">
                <span>
                    <h2>Your Liked Items</h2>
                    <XCircleIcon onClick={close} />
                </span>
                
                <AppProducts products={products} rowLength={4} />
            </dialog>

            <div className="background" onClick={close} />
        </>
    )
}

export default AppLiked
