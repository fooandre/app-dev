import { ExclamationIcon, LogoutIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import BaseTable from '../components/BaseTable';
import CartRow from '../components/CartRow';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2vh'
};

const divStyles = {
  width: '93vw',
  position: 'absolute',
  bottom: '3vh',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between'
};

const spanStyles = {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '1vw'
};

const clearCartStyles = {
  border: 'none',
  backgroundColor: 'red',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '1vh',
  fontSize: '0.7rem',
  fontWeight: '700'
};

const checkoutStyles = {
  border: 'none',
  backgroundColor: 'green',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '1vh',
  fontSize: '0.7rem',
  fontWeight: '700'
};

const Cart = () => {
  const user = JSON.parse(sessionStorage.getItem('userId'));
  let [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')));

  if (cart.length === 0)
    return (
      <section style={sectionStyles}>
        <h3 style={{ color: 'rgb(63, 66, 72)' }}>Items in cart&#58;</h3>
        <span>Your cart is empty, add some items to view them!</span>
      </section>
    );

  let content = [];
  let total = 0;

  const updateCart = async (operation, productId, qty) => {
    try {
      const method = qty === 0 ? 'DELETE' : 'POST';

      if (method === 'DELETE')
        if (!confirm('This removes this item from your cart, proceed?')) return;

      const res = await fetch('api/updateUserCart', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user,
          productId: productId,
          qty: qty
        })
      });

      const { success, cart, message } = await res.json();

      if (success) {
        setCart(cart);
        return sessionStorage.setItem('cart', JSON.stringify(cart));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    if (!confirm('Are you sure you want to remove this item? (this action is irreversible!)'))
      return;

    try {
      const res = await fetch('/api/updateUserCart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user,
          productId: productId,
          qty: 0
        })
      });

      const { success, cart, message } = await res.json();

      if (success) {
        setCart(cart);
        return sessionStorage.setItem('cart', JSON.stringify(cart));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  for (const product of cart) {
    content.push(
      <CartRow
        key={product.id}
        product={product}
        updateCart={updateCart}
        removeFromCart={removeFromCart}
      />
    );
    total += product.price * product.qty;
  }

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart? (this action is irreversible!)'))
      return;

    try {
      const res = await fetch('/api/deleteUserCart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user })
      });

      const { success, cart, message } = await res.json();

      if (success) {
        setCart(cart);
        return sessionStorage.setItem('cart', JSON.stringify(cart));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  const checkout = async () => {
    if (!confirm('Proceed to checkout?')) return;

    try {
      const res = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user })
      });

      const { success, purchases, message } = await res.json();

      if (success) {
        setCart([]);
        sessionStorage.setItem('cart', JSON.stringify([]));
        sessionStorage.setItem('purchases', JSON.stringify(purchases));
        return;
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section style={sectionStyles}>
      <h3 style={{ color: 'rgb(63, 66, 72)' }}>Items in cart&#58;</h3>

      <BaseTable columns={['Product name', 'Price', 'Quantity', '']}>{content}</BaseTable>

      <div style={divStyles}>
        <h2>Total: ${total.toFixed(2)}</h2>

        <span style={spanStyles}>
          <button onClick={clearCart} style={clearCartStyles}>
            Clear cart
            <ExclamationIcon />
          </button>
          <button onClick={checkout} style={checkoutStyles}>
            Checkout!
            <LogoutIcon />
          </button>
        </span>
      </div>
    </section>
  );
};

export default Cart;
