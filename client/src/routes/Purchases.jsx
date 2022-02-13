import BaseTable from '../components/BaseTable';
import PurchasesRow from '../components/PurchasesRow';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column'
};

const Purchases = () => {
  const address = JSON.parse(sessionStorage.getItem('address'));
  const purchases = JSON.parse(sessionStorage.getItem('purchases'));

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
          columns={['Product name', 'Price', 'Quantity', 'Purchase date', 'Order status']}
        >
          {body}
        </BaseTable>
      );
  }

  return (
    <section style={{ gap: '5vh', ...sectionStyles }}>
      <span>
        <h3 style={{ color: 'rgb(63, 66, 72)' }}>Your recent purchases&#58;</h3>
        <h4 style={{ fontWeight: '500' }}>Shipping address: {address}</h4>
      </span>

      {purchases.length === 0 && (
        <span>You have no recent purchases, buy some items to see them!</span>
      )}
      {purchases.length > 0 && <>{content}</>}
    </section>
  );
};

export default Purchases;
