import BaseTable from "../components/BaseTable";
import PurchasesRow from '../components/PurchasesRow';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5vh'
}

const Purchases = () => {
  let content = [];

  const purchases = JSON.parse(sessionStorage.getItem("purchases"));

  if (purchases.length == 0) return <>You have no recent purchases, buy some items to see them!</>

  for (const { orderId, products } of purchases) {
    let body = [];

    for (const product of products) body.push(<PurchasesRow key={product.id} product={product} />);
    content.unshift(<BaseTable key={orderId} label={`Order id: ${orderId}`} columns={["Product name", "Price", "Quantity", "Purchase date", "Order status"]}>{ body }</BaseTable>);
  }

  return (
    <section style={sectionStyles}>
      <h3 style={{color: 'rgb(63, 66, 72)'}}>Your recent purchases&#58;</h3>
      { content }
    </section>
  )
};

export default Purchases;
