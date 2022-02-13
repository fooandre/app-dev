import { XCircleIcon } from '@heroicons/react/outline';
import { func, string } from 'prop-types';
import { useEffect, useState } from 'react';
import BaseInput from './BaseInput';

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
  height: '3vh'
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
  let [category, setCategory] = useState('default');
  let [image, setImage] = useState(null);

  useEffect(() => {
    if (action === 'Edit')
      try {
        const res = fetch('api/');
      } catch (err) {
        console.error(err);
      }
  }, []);

  const handleFile = (event) => setImage(event.target.files[0]);

  const addNewProduct = async () => {
    try {
      const picture = new FormData();
      picture.append('picture', image, image.name);

      const res = await fetch('api/product/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify({
          userId: JSON.parse(sessionStorage.getItem('userId')),
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          desc: document.getElementById('desc').value,
          qty: document.getElementById('qty').value,
          category: category,
          picture: picture
        })
      });

      const { success, products, message } = await res.json();

      if (success) {
        sessionStorage.setItem('products', JSON.stringify(products));
        return close();
        // return window.location.reload();
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  // const editProduct = async () => {
  //   try {
  //     const picture = new FormData();
  //     picture.append('picture', image, image.name);

  //     const res = await fetch('api/product/admin', {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId: JSON.parse(sessionStorage.getItem('userId')),
  //         name: document.getElementById('name').value,
  //         price: document.getElementById('price').value,
  //         desc: document.getElementById('desc').value,
  //         qty: document.getElementById('qty').value,
  //         category: category,
  //         picture: picture
  //       })
  //     });

  //     const { success, products, message } = await res.json();

  //     if (success) {
  //       sessionStorage.setItem('products', JSON.stringify(products));
  //       return window.location.reload();
  //     }

  //     alert(message);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <dialog style={popupStyles}>
        <span style={spanStyles}>
          <h2>{action} product</h2>
          <XCircleIcon onClick={close} style={svgStyles} />
        </span>

        {/* <form
          style={formStyles}
          encType="multipart/form-data"
          action="api/product/admin"
          method="post"
          target="_self"> */}
        <input
          type="text"
          value={JSON.parse(sessionStorage.getItem('userId'))}
          style={{ display: 'none' }}
          readOnly
        />
        <BaseInput field="name" />
        <label style={labelStyles}>
          category
          <select
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
        <BaseInput field="desc" />
        <BaseInput type="number" field="price" />
        <BaseInput type="number" field="qty" />
        <label style={labelStyles}>
          picture
          <input
            onChange={handleFile}
            type="file"
            id="picture"
            name="picture"
            style={{ cursor: 'pointer', ...inputStyles }}
            required={true}
          />
        </label>
        <button onClick={addNewProduct} type="submit">
          Submit form
        </button>
        {/* </form> */}
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
