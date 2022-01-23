import BaseTable from "./BaseTable";

const sectionStyles = {
  borderRadius: '0.5rem',
  backgroundColor: 'aqua',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5vh',
  padding: '5vh 0'
}

const UserPurchases = () => {
  let content = [];

  const purchases = JSON.parse(sessionStorage.getItem("purchases"));

  for (const { orderId, products } of purchases) content.push(<BaseTable key={orderId} orderId={orderId} products={products} />)

  return content.length == 0? <>You have no recent purchases, buy some items to see them!</> : <>{ content }</>;
};

export default UserPurchases;
