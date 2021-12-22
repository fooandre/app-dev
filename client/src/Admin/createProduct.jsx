import React, { useState } from 'react';

function createProduct() {
  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');

  function inputHandler(e) {
    setProductName(e.target.value);
  }
  function inputHandler2(e) {
    setDesc(e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    fetch('http://localhost:5000/product/admin', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        productName: productName,
        desc: desc
      })
    });
  }
  return (
    <div className="container">
      <form action="" onSubmit={(e) => submit(e)}>
        <div className="mb-3 row">
          <label htmlFor="product_name" className="col-sm-2 col-form-label">
            Product Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="product_name"
              value={productName}
              className="form-control"
              id="product_name"
              onChange={inputHandler}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="desc" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="desc"
              value={desc}
              className="form-control"
              id="desc"
              onChange={inputHandler2}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Primary
        </button>
      </form>
    </div>
  );
}

export default createProduct;
