import { ArrowSmLeftIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppCategories from '../components/AppCategories';
import ProductButtons from '../components/ProductButtons';
import ProductReviews from '../components/ProductReviews';

const backStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8vw',
  marginLeft: '6px'
};

const backBtnStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1vh'
};

const productStyles = {
  position: 'relative',
  top: '2vh',
  left: '45vw',
  width: 'fit-content',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '2vw',
  marginLeft: '6px',
  transform: 'translateX(-50%)'
};

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
};

const leftStyles = {
  justifyContent: 'space-between',
  gap: '1vh'
};

const rightStyles = {
  width: '50vw',
  gap: '5vh'
};

const titleStyles = {
  width: 'inherit',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between'
};

const rightTitleStyles = {
  borderRadius: '5px',
  backgroundColor: '#f1f1f1',
  height: '5vh',
  alignItems: 'center',
  padding: '1vh 1vw'
};

const h3Styles = {
  fontWeight: '100'
};

const descH3Styles = {
  maxWidth: 'inherit'
};

const imgStyles = {
  borderRadius: '5px',
  height: '20vw',
  aspectRatio: '4 / 3',
  objectFit: 'cover',
  objectPosition: '50% 50%'
};

const infoStyles = {
  width: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '3vh'
};

const spanStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1vh',
  margin: '0 1vw'
};

const Product = () => {
  const { productId } = useParams(null);
  let [user, setUser] = useState(null);

  let [liked, setLiked] = useState(false);
  let [inCart, setInCart] = useState(false);
  let [qtyInCart, setQtyInCart] = useState(0);

  let [product, setProduct] = useState(null);
  let [src, setSrc] = useState(null);
  let [qtyInStock, setQtyInStock] = useState(null);
  let [reviews, setReviews] = useState([]);

  useEffect(async () => {
    try {
      let res = await fetch(`http://127.0.0.1:5000/api/product/${productId}`);
      const { product } = await res.json();

      const { img: image, qty, reviews } = product;

      res = await fetch(`http://127.0.0.1:5000/static/product_pics/${image}`);

      setSrc(URL.createObjectURL(await res.blob()));
      setProduct(product);
      setReviews(reviews);
      setQtyInStock(qty);

      if ('userId' in sessionStorage) {
        setUser(JSON.parse(sessionStorage.getItem('userId')));
        const likedProducts = JSON.parse(sessionStorage.getItem('likedProducts'));
        for (const { id } of likedProducts) if (productId === id) setLiked(true);

        const cart = JSON.parse(sessionStorage.getItem('cart'));
        for (const { id, qty } of cart)
          if (productId === id) {
            setInCart(true);
            setQtyInCart(qty);
          }
      }
    } catch (err) {
      console.error(err);
    }
  }, [productId]);

  const toggleLiked = async () => {
    try {
      const method = liked ? 'PATCH' : 'POST';

      const res = await fetch('/api/likedProduct', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user,
          productId: productId
        })
      });

      const { success, message, likedProducts } = await res.json();

      console.log(success);

      if (success) {
        setLiked(!liked);
        sessionStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        return method === 'PATCH'
          ? alert('Item removed from favorites')
          : alert('Item added to favorites');
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async () => {
    let p = prompt('How many do you want to add to cart?');

    if (p === null) return alert('Process cancelled.');
    if (parseInt(p) < 1 || p.trim() === '' || Number.isNaN(parseInt(p)))
      return alert(`Please input a valid quantity (positive integers only).`);
    if (parseInt(p) > product.qty)
      return alert(`Sorry, item only has ${product.qty} left in stock.`);

    const qty = parseInt(p);

    try {
      const res = await fetch('/api/updateUserCart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user,
          productId: productId,
          qty: qty
        })
      });

      const { success, cart, message } = await res.json();

      if (success) {
        setInCart(true);
        setQtyInCart(qty);
        return sessionStorage.setItem('cart', JSON.stringify(cart));
      }

      alert(message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <span style={backStyles}>
        <Link style={backBtnStyles} className="back-to-shop" to="/">
          <ArrowSmLeftIcon />
          Back to shop
        </Link>
        <AppCategories />
      </span>

      {!product && 'Fetching product...'}
      {product && (
        <section style={productStyles}>
          <section style={{ ...sectionStyles, ...leftStyles }}>
            <img src={src} style={imgStyles} />
            <title style={titleStyles}>
              <h2 style={{ textTransform: 'capitalize' }}>@{product.user.username}</h2>
            </title>
          </section>

          <section style={{ ...sectionStyles, ...rightStyles }}>
            <div style={infoStyles}>
              <title style={{ ...titleStyles, ...rightTitleStyles }}>
                <h2>{product.name}</h2>
                <h3 style={h3Styles}>${product.price.toFixed(2)}</h3>
              </title>

              <ProductButtons
                productId={productId}
                liked={liked}
                toggleLiked={toggleLiked}
                inCart={inCart}
                addToCart={addToCart}
                qtyInCart={qtyInCart}
                qtyInStock={qtyInStock}
              />

              <span style={spanStyles}>
                <h2>Category</h2>
                <h3 style={h3Styles}>{product.category}</h3>
              </span>

              <span style={spanStyles}>
                <h2>Description</h2>
                <h3 style={{ ...h3Styles, ...descH3Styles }}>{product.desc}</h3>
              </span>
            </div>

            <ProductReviews reviews={reviews} />
          </section>
        </section>
      )}
    </>
  );
};

export default Product;
