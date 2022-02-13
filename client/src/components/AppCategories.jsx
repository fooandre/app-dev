import { useNavigate } from 'react-router-dom';

const categoriesStyles = {
  height: '10vh',
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  gap: '3vw',
  paddingLeft: '1vw',
  marginLeft: '6px'
};

const AppCategories = () => {
  const categories = ['Home & Living', 'Fashion & Accessories', 'Electronics', 'Toys & Games'];

  const navigate = useNavigate();

  let content = [];
  for (const category of categories)
    content.push(
      <a
        key={category}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/search', { state: { query: category } })}
      >
        {category}
      </a>
    );

  return (
    <div id="categories" style={categoriesStyles}>
      <h3>Categories</h3>
      {content}
    </div>
  );
};

export default AppCategories;
