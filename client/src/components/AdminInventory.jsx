import { PlusSmIcon } from '@heroicons/react/outline';
import AdminInventoryRow from './AdminInventoryRow';

const divStyles = {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '2vh',
  padding: '2vh 2vw',
  marginBottom: '3vh'
}

const addNewStyles = {
  backgroundColor: 'green',
  border: 'none',
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

const AdminInventory = () => {
  const products = JSON.parse(sessionStorage.getItem('products'))
  
  const addNewProduct = () => {};
  
  if (products.length === 0) return (
    <>
      <button onClick={addNewProduct} style={addNewStyles}>Add new product<PlusSmIcon style={{height: '3vh'}} /></button>
      <span>You do not have any products, add some to start selling!</span>
    </>
  )
  
  let content = [];
  
  for (const product of products) {
    const updateQty = async (operation, productId, qty) => {
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

  const deleteProduct = async productId => {
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
    
    content.push(<AdminInventoryRow key={product.id} product={product} updateQty={updateQty} deleteProduct={deleteProduct} />);
  }
  
  return (
      <>
        <div style={divStyles}>
            <h3 style={{color: 'rgb(63, 66, 72)'}}>Your products&#58;</h3>
            
            <table>
                <thead>
                <tr>
                    <td>Product name</td>
                    <td>Price ($)</td>
                    <td>In stock</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>{ content }</tbody>
            </table>
        </div>

        <button onClick={addNewProduct} style={addNewStyles}>New<PlusSmIcon style={{height: '3vh'}} /></button>

    </>
  )
};

export default AdminInventory;
