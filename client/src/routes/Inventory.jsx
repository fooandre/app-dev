import { PlusSmIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import BaseTable from '../components/BaseTable';
import InventoryProductAdmin from '../components/InventoryProductAdmin';
import InventoryRow from '../components/InventoryRow';

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5vh'
};

const searchbarStyles = {
  borderRadius: '5px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  position: 'absolute',
  top: '5vh',
  left: '45vw',
  width: '25vw',
  color: 'whitesmoke',
  transform: 'translate(-50%, -50%)'
};

const Inventory = () => {
  const user = JSON.parse(sessionStorage.getItem('userId'));
  let [products, setProducts] = useState(JSON.parse(sessionStorage.getItem('products')));
  let [showAdmin, toggleAdmin] = useState(false);
  let [action, setAction] = useState(null);
  let [editId, setEditId] = useState(null);

  useEffect(async () => {
    if (showAdmin) return;

    try {
      const res = await fetch('api/allProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user })
      });

      const { success, products } = await res.json();

      if (success) {
        sessionStorage.setItem('products', JSON.stringify(products));
        return setProducts(products);
      }
    } catch (error) {}
  }, [showAdmin]);

  const search = (value) => {
    value = value.trim();
    if (value === '') return setProducts(JSON.parse(sessionStorage.getItem('products')));
    setProducts(
      products.filter(
        ({ name, desc, category }) =>
          name.includes(value) || desc.includes(value) || category.includes(value)
      )
    );
  };

  const addNewProduct = () => {
    toggleAdmin(!showAdmin);
    setAction('Add');
  };

  const editProduct = (id) => {
    toggleAdmin(!showAdmin);
    setEditId(id);
    setAction('Edit');
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this item? (this action is irreversible!)'))
      return;

    const orders = JSON.parse(sessionStorage.getItem('orders'));
    for (const { products } of orders)
      for (const { id: productId } of products)
        if (id === productId) return alert('You cannot delete this item, it is in pending orders.');

    try {
      const res = await fetch(`/api/product/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user })
      });

      const { success, products, message } = await res.json();

      if (success) {
        setProducts(products);
        return sessionStorage.setItem('products', JSON.stringify(products));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQty = async (id, qty) => {
    if (qty < 0) return alert('This product is out of stock, you can only increase its quantity.');

    try {
      const res = await fetch('api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user,
          products: [
            {
              id: id,
              qty: qty
            }
          ]
        })
      });

      const { success, products, message } = await res.json();

      if (success) {
        setProducts(products);
        return sessionStorage.setItem('products', JSON.stringify(products));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  let content = [];

  for (const product of products)
    content.push(
      <InventoryRow
        key={product.id}
        product={product}
        updateQty={updateQty}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />
    );

  return (
    <section style={sectionStyles}>
      <h3 style={{ color: 'rgb(63, 66, 72)' }}>Your products&#58;</h3>
      <input
        onChange={({ target: { value } }) => search(value)}
        style={searchbarStyles}
        id="searchbar"
        type="text"
        placeholder="Search from your products"
      />
      <button id="add-new-product" onClick={addNewProduct}>
        Add new product
        <PlusSmIcon style={{ height: '3vh' }} />
      </button>
      {showAdmin && (
        <InventoryProductAdmin editId={editId} action={action} close={() => toggleAdmin(false)} />
      )}
      {content.length === 0 && products.length !== 0 && <span>No results returned</span>}
      {products.length === 0 && (
        <span>You are not a merchant yet, become one by simply adding a product!</span>
      )}
      {products.length > 0 && (
        <BaseTable columns={['Product name', 'Price', 'Quantity', '']}>{content}</BaseTable>
      )}
    </section>
  );
};

export default Inventory;
