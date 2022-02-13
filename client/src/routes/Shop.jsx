import { useEffect, useState } from 'react';
import AppCategories from '../components/AppCategories';
import BaseGrid from '../components/BaseGrid';
import BaseProduct from '../components/BaseProduct';

const Shop = () => {
  let [products, setProducts] = useState(null);

  useEffect(async () => {
    try {
      const res = await fetch('/api/product/all');
      const { products } = await res.json();
      setProducts(products);
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (products) {
    if (products.length === 0) return <span>Sorry, we have no products in our store.</span>;

    let content = [];
    for (const { id, ...product } of products)
      content.push(<BaseProduct key={id} product={{ id, ...product }} />);

    return (
      <>
        <AppCategories showIcons={true} />
        {content.length == 0 ? (
          <h1>No products to show</h1>
        ) : (
          <BaseGrid rowLength={4}>{content}</BaseGrid>
        )}
      </>
    );
  }

  return <>Loading...</>;
};

export default Shop;
