import { ExclamationIcon } from '@heroicons/react/outline';
import UserCartRow from './UserCartRow';

const divStyles = {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '2vh',
    padding: '2vh 2vw',
    marginBottom: '3vh'
}

const clearCartStyles = {
    backgroundColor: 'red',
    color: 'white',
    position: 'absolute',
    top: '7vh',
    right: '5vw',
    display: 'flex',
    alignItems: 'center',
    gap: '1vh',
    fontSize: '0.8rem',
    fontWeight: '700',
}

const spanStyles = {
    width: '70vw',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
}

const checkoutStyles = {
    backgroundColor: 'yellowgreen',
    color: 'white',
    fontWeight: '700'
}

const UserCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    const user = JSON.parse(sessionStorage.getItem("userId"));
    
    if ( cart.length === 0) return <div styles={divStyles}>Your cart is empty, add some items to view them!</div>

    let content = [];
    let total = 0;

    for (const product of cart) {
        const updateCart = async (operation, productId, qty) => {
            try {
                const method = qty === 0? "DELETE" : "POST";

                const res = await fetch("api/updateUserCart", {
                    method: method,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "userId": user,
                        "productId": productId,
                        "qty": qty
                    })
                })

                const { cart } = await res.json();
                sessionStorage.setItem('cart', JSON.stringify(cart));
                window.location.reload();
            } catch (err) { console.error(err) };
        }
    
        const removeFromCart = async productId => {
            if (!confirm("Are you sure you want to remove this item? (this action is irreversible!)")) return;
    
            try {  
                const res = await fetch("/api/updateUserCart", {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "userId": user,
                        "productId": productId,
                        "qty": 0
                    })
                })
            
                const { cart } = await res.json();
                sessionStorage.setItem('cart', JSON.stringify(cart));
                window.location.reload();
            } catch (err) { console.error(err) };
        }

        content.push(<UserCartRow key={product.id} product={product} updateCart={updateCart} removeFromCart={removeFromCart} />);
        total += product.price * product.qty;
    }

    const clearCart = async () => {
        if (!confirm("Are you sure you want to clear your cart? (this action is irreversible!)")) return;
        
        try {    
            const res = await fetch("/api/deleteUserCart", {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ "userId": user })
            })

            const { cart } = await res.json();
            sessionStorage.setItem('cart', JSON.stringify(cart));
            window.location.reload();
        } catch (err) { console.error(err) };
    };

    const checkout = async () => {
        if (!confirm("Proceed to checkout?")) return;
        
        try {    
            const res = await fetch("/api/purchase", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ "userId": user })
            })

            const { purchases } = await res.json();
            sessionStorage.setItem('cart', JSON.stringify([]));
            sessionStorage.setItem('purchases', JSON.stringify(purchases));
            window.location.reload();
        } catch (err) { console.error(err) };
    }
    
    return (
        <>
            <div style={divStyles}>
                <h3 style={{color: 'rgb(63, 66, 72)'}}>Items in cart&#58;</h3>
                
                <table>
                    <thead>
                    <tr>
                        <td>Product name</td>
                        <td>Price ($)</td>
                        <td>Quantity</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>{ content }</tbody>
                </table>
            </div>

            <button onClick={clearCart} style={clearCartStyles}>Clear cart<ExclamationIcon style={{height: '3vh'}} /></button>
            
            <span style={spanStyles}>
                <h2>Total: ${ +total.toFixed(2) }0</h2>
                <button onClick={checkout} style={checkoutStyles}>Checkout!</button>
            </span>
        </>
    )
}

export default UserCart