import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppCategories from '../components/AppCategories';
import BaseGrid from '../components/BaseGrid';
import BaseProduct from '../components/BaseProduct';

const h3Styles = {
  fontWeight: '500',
  marginLeft: '1.5vw'
};

const Search = () => {
  const {
    state: { query = '' }
  } = useLocation();

  let [products, setProducts] = useState(null);
  let [filtered, setFiltered] = useState(null);

  useEffect(async () => {
    try {
      console.log(query);
      const res = await fetch('/api/product/all');
      const { products } = await res.json();
      setProducts(
        products.filter(
          ({ name, desc, category }) =>
            name.toLowerCase().includes(query) ||
            desc.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query)
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, [query]);

  if (products) {
    let content = [];
    for (const { id, ...product } of products)
      content.push(<BaseProduct key={id} product={{ id, ...product }} />);

    return (
      <>
        <AppCategories showIcons={true} />
        {content.length === 0 ? (
          <h3 style={h3Styles}>No results returned for &quot;{query}&quot;</h3>
        ) : (
          <h3 style={h3Styles}>Results for &quot;{query}&quot;</h3>
        )}
        {content.length === 0 || <BaseGrid rowLength={4}>{content}</BaseGrid>}
      </>
    );
  }

  return <>Loading...</>;
};

export default Search;
