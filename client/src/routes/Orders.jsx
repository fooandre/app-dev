import { RefreshIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTable from '../components/BaseTable';
import OrdersRow from '../components/OrdersRow';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column'
};

const Orders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const merchant = JSON.parse(sessionStorage.getItem('products')).length > 0;
    if (!merchant) return navigate('/Inventory');
  });

  let [orders, setOrders] = useState(JSON.parse(sessionStorage.getItem('orders')));

  const fetchOrders = async () => {
    try {
      const res = await fetch('api/order/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: JSON.parse(sessionStorage.getItem('userId')) })
      });

      let { success, orders, message } = await res.json();

      if (success) {
        for (const { orderId, products: order } of orders)
          for (const { status } of order)
            if (status === 'Completed')
              orders = orders.filter((order) => order.orderId !== orderId);
        setOrders(orders);
        return sessionStorage.setItem('orders', JSON.stringify(orders));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (orderId, productId, { target: { value } }) => {
    if (value === 'Completed')
      if (
        !confirm(
          'Updating this product to completed will remove it from your pending orders, continue?'
        )
      )
        return;

    try {
      const res = await fetch(`api/order/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: JSON.parse(sessionStorage.getItem('userId')),
          product: productId,
          status: value
        })
      });

      let { success, message, orders } = await res.json();

      if (success) {
        for (const { orderId, products: order } of orders)
          for (const { status } of order)
            if (status === 'Completed')
              orders = orders.filter((order) => order.orderId !== orderId);
        setOrders(orders);
        return sessionStorage.setItem('orders', JSON.stringify(orders));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  let content = [];

  for (const { orderId, products: order } of orders) {
    let body = [];
    for (const product of order)
      if (product.name !== 'Deleted product')
        body.push(
          <OrdersRow
            key={product.id}
            orderId={orderId}
            order={product}
            updateStatus={updateStatus}
          />
        );
    if (body.length > 0)
      content.unshift(
        <BaseTable
          key={orderId}
          label={`Order id: ${orderId}`}
          columns={[
            'Product name',
            'Price',
            'Quantity',
            'Purchase date',
            'Shipping address',
            'Order status'
          ]}>
          {body}
        </BaseTable>
      );
  }

  if (orders)
    return (
      <section style={{ gap: '5vh', ...sectionStyles }}>
        <h3 style={{ color: 'rgb(63, 66, 72)' }}>Pending orders&#58;</h3>
        <button id="refresh-orders" onClick={fetchOrders}>
          Refresh page
          <RefreshIcon style={{ height: '3vh' }} />
        </button>
        {orders.length === 0 && <span>You have no orders to manage, start marketing now!</span>}
        {orders.length > 0 && <>{content}</>}
      </section>
    );

  return (
    <section style={{ gap: '5vh', ...sectionStyles }}>
      <h3 style={{ color: 'rgb(63, 66, 72)' }}>Pending orders&#58;</h3>
      <button id="refresh-orders" onClick={fetchOrders}>
        Refresh page
        <RefreshIcon style={{ height: '3vh' }} />
      </button>
      "Fetching orders..."
    </section>
  );
};

export default Orders;
