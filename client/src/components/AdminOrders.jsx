import BaseTable from "./BaseTable";

const divStyles = {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2vh',
  padding: '2vh 2vw',
  marginBottom: '3vh'
}

const AdminOrders = () => {
  let content = [];

  const orders = JSON.parse(sessionStorage.getItem("orders"));

  for (const { orderId, products } of orders) content.push(<BaseTable key={orderId} orderId={orderId} products={products} />)

  return content.length == 0? <>You have no ongoing orders.</> : <>{ content }</>;
};

export default AdminOrders;
