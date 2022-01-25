import BaseTable from '../components/BaseTable';
import OrdersRow from "../components/OrdersRow";

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5vh'
}

const divStyles = {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2vh',
  padding: '2vh 2vw',
  marginBottom: '3vh'
}

const Orders = () => {
  let content = [];
  let body = [];

  const orders = JSON.parse(sessionStorage.getItem("orders"));

  if (orders.length == 0) return <>You have no orders to manage!</>

  for (const { orderId, products } of orders) {
    for (const product of products) body.push(<OrdersRow key={product.id} order={product} />);
    content.unshift(<BaseTable key={orderId} label={`Order id: ${orderId}`} columns={["Product name", "Price", "Quantity", "Purchase date", "Order status"]}>{ body }</BaseTable>);
  }

  return (
    <section style={sectionStyles}>
      <h3 style={{color: 'rgb(63, 66, 72)'}}>Your orders&#58;</h3>
      { content }
    </section>
  )
};

export default Orders;
