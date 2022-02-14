import { RefreshIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import BaseTable from '../components/BaseTable';
import PurchasesRow from '../components/PurchasesRow';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column'
};

const Purchases = () => {
  const address = JSON.parse(sessionStorage.getItem('address'));
  let [purchases, setPurchases] = useState(JSON.parse(sessionStorage.getItem('purchases')));

  const fetchPurchases = async () => {
    try {
      const res = await fetch('api/purchase/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: JSON.parse(sessionStorage.getItem('userId')) })
      });

      let { success, purchases, message } = await res.json();

      if (success) {
        setPurchases(purchases);
        return sessionStorage.setItem('purchases', JSON.stringify(purchases));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  let content = [];

  for (const { orderId, products: purchase } of purchases) {
    let body = [];
    for (const product of purchase)
      if (product.name !== 'Deleted product')
        body.push(<PurchasesRow key={product.id} orderId={orderId} product={product} />);
    if (body.length > 0)
      content.unshift(
        <BaseTable
          key={orderId ?? content.length}
          label={`Order id: ${orderId}`}
          columns={['Product name', 'Price', 'Quantity', 'Purchase date', 'Order status']}>
          {body}
        </BaseTable>
      );
  }

  if (purchases)
    return (
      <section style={{ gap: '5vh', ...sectionStyles }}>
        <span>
          <h3 style={{ color: 'rgb(63, 66, 72)' }}>Your recent purchases&#58;</h3>
          <h4 style={{ fontWeight: '500' }}>Shipping address: {address}</h4>
        </span>
        <button id="refresh-orders" onClick={fetchPurchases}>
          Refresh page
          <RefreshIcon style={{ height: '3vh' }} />
        </button>
        {purchases.length === 0 && (
          <span>You have no recent purchases, buy some items to see them!</span>
        )}
        {purchases.length > 0 && <>{content}</>}
      </section>
    );

  return (
    <section style={{ gap: '5vh', ...sectionStyles }}>
      <span>
        <h3 style={{ color: 'rgb(63, 66, 72)' }}>Your recent purchases&#58;</h3>
        <h4 style={{ fontWeight: '500' }}>Shipping address: {address}</h4>
      </span>
      <button id="refresh-orders" onClick={fetchPurchases}>
        Refresh page
        <RefreshIcon style={{ height: '3vh' }} />
      </button>
      "Fetching purchases.."
    </section>
  );
};

export default Purchases;
