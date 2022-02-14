import { XCircleIcon } from '@heroicons/react/outline';
import { func, string } from 'prop-types';
import { useEffect, useState } from 'react';

const popupStyles = {
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: '0 1px 2px 0 black',
  border: 'none',
  borderRadius: '5px',
  height: '80vh',
  width: '40vw',
  position: 'fixed',
  top: '50vh',
  left: '45vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '5vh',
  marginLeft: '5vw',
  padding: '5vh 3vw',
  transform: 'translate(-50%, -50%)',
  opacity: '1',
  zIndex: '20'
};

const spanStyles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const svgStyles = {
  height: '3vh',
  cursor: 'pointer'
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '5vh',
  overflow: 'visible'
};

const labelStyles = {
  backgroundColor: '#3F4248',
  borderRadius: '5px',
  color: 'white',
  width: '30vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.9rem',
  fontWeight: '900',
  paddingLeft: '2vw'
};

const selectStyles = {
  borderRadius: '0 5px 5px 0',
  height: '4vh',
  width: '20vw',
  paddingLeft: '0.5vw',
  cursor: 'pointer'
};

const inputStyles = {
  borderRadius: '0 5px 5px 0',
  width: '20vw',
  fontWeight: '500'
};

const backgroundStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  position: 'fixed',
  top: '0',
  left: '3.5vw',
  height: '100vh',
  width: '96.5vw',
  zIndex: '15'
};

const InventoryProductAdmin = ({ editId, action, close }) => {
  let [name, setName] = useState('');
  let [category, setCategory] = useState('default');
  let [desc, setDesc] = useState('');
  let [price, setPrice] = useState(0);
  let [qty, setQty] = useState(0);

  useEffect(async () => {
    setName('');
    setCategory('default');
    setDesc('');
    setPrice(0);
    setQty(0);

    if (action === 'Edit') {
      const products = JSON.parse(sessionStorage.getItem('products'));
      const toEdit = products.filter(({ id }) => id === editId)[0];

      setName(toEdit.name);
      setCategory(toEdit.category);
      setDesc(toEdit.desc);
      setPrice(toEdit.price);
      setQty(toEdit.qty);
    }
  }, [action]);

  const addNewProduct = async () => {
    try {
      const form = document.getElementById('form');

      const res = await fetch('api/product/admin', {
        method: 'POST',
        body: new FormData(form)
      });
    } catch (err) {
      console.error(err);
    }
  };

  const editProduct = async () => {
    try {
      const form = document.getElementById('form');

      const res = await fetch('api/product/admin/edit', {
        method: 'PATCH',
        body: new FormData(form)
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <dialog style={popupStyles}>
        <span style={spanStyles}>
          <h2>{action} product</h2>
          <XCircleIcon onClick={close} style={svgStyles} />
        </span>

        <form id="form" style={formStyles}>
          <input
            type="hidden"
            name="userId"
            value={JSON.parse(sessionStorage.getItem('userId'))}
            readOnly
          />
          <input type="hidden" name="productId" value={editId} readOnly />
          <label style={labelStyles}>
            name
            <input
              type="text"
              id="name"
              name="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
              style={inputStyles}
              autoComplete="off"
              required={true}
            />
          </label>
          <label style={labelStyles}>
            category
            <select
              name="category"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
              style={selectStyles}
              required={true}>
              <option value="default" defaultValue disabled>
                Select category
              </option>
              <option value="Fashion & Accessories">Fashion & accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys & Games">Toys & games</option>
              <option value="Home & Living">Home & living</option>
            </select>
          </label>
          <label style={labelStyles}>
            desc
            <input
              type="text"
              id="desc"
              name="desc"
              onChange={(event) => setDesc(event.target.value)}
              value={desc}
              style={inputStyles}
              autoComplete="off"
              required={true}
            />
          </label>
          <label style={labelStyles}>
            price
            <input
              type="number"
              id="price"
              name="price"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
              style={inputStyles}
              autoComplete="off"
              required={true}
            />
          </label>
          <label style={labelStyles}>
            quantity
            <input
              type="number"
              id="qty"
              name="qty"
              onChange={(event) => setQty(event.target.value)}
              value={qty}
              style={inputStyles}
              autoComplete="off"
              required={true}
            />
          </label>
          <label style={labelStyles}>
            picture
            <input
              type="file"
              id="picture"
              name="picture"
              style={{ cursor: 'pointer', ...inputStyles }}
              required={true}
            />
          </label>
          <button onClick={action === 'Add' ? addNewProduct : editProduct}>Submit</button>
        </form>
      </dialog>

      <div onClick={close} style={backgroundStyles} />
    </>
  );
};

InventoryProductAdmin.propTypes = {
  editId: string,
  action: string.isRequired,
  close: func.isRequired
};

export default InventoryProductAdmin;
