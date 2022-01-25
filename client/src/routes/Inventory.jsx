import BaseTable from "../components/BaseTable";
import InventoryRow from '../components/InventoryRow';

const sectionStyles = {
  width: '91vw',
  display: 'flex',
  flexDirection: 'column',
  gap: '2vh'
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

const Inventory = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const products = JSON.parse(sessionStorage.getItem('products'))
  
  const addNewProduct = () => {};
  
  if ( products.length === 0) return (
    <section style={sectionStyles}>
      <button onClick={addNewProduct} style={addNewStyles}>Add new product<PlusSmIcon style={{height: '3vh'}} /></button>
      <h3 style={{color: 'rgb(63, 66, 72)'}}>Items in cart&#58;</h3>
      <span>Your cart is empty, add some items to view them!</span>
    </section>
)
  
  let content = [];
  
  for (const product of products) {
    // FIXME: update product qty
    const updateQty = async products => {
      try {
          const res = await fetch("api/product", {
              method: "POST",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  "userId": user,
                  "products": products
              })
          })

          // TODO: get products after update from res
          // const { products } = await res.json();
          // sessionStorage.setItem('products', JSON.stringify(products));
          window.location.reload();
      } catch (err) { console.error(err) };
    }

    // FIXME: delete product
    const deleteProduct = async id => {
        if (!confirm("Are you sure you want to delete this item? (this action is irreversible!)")) return;

        try {  
            const res = await fetch(`/api/product/admin/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ "userId": user })
            })

            // TODO: get products after deleting from res
            // const { products } = await res.json();
            // sessionStorage.setItem('products', JSON.stringify(products));
            window.location.reload();
        } catch (err) { console.error(err) };
    }
    
    content.push(<InventoryRow key={product.id} product={product} updateQty={updateQty} deleteProduct={deleteProduct} />);
  }
  
  return (
    <section style={sectionStyles}>
        <h3 style={{color: 'rgb(63, 66, 72)'}}>Your products&#58;</h3>
        <BaseTable columns={["Product name", "Price", "Quantity", ""]}>{ content }</BaseTable>
    </section>
)
};

export default Inventory;
