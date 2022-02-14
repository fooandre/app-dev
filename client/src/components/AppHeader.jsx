import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const headerStyles = {
  backgroundColor: '#34363b',
  boxShadow: '0 1px 2px 0 black',
  color: 'white',
  width: '100vw',
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1vh 1vw',
  zIndex: '30'
};

const aStyles = {
  fontWeight: '700',
  fontSize: '2rem',
  textDecoration: 'none'
};

const spanStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const searchbarStyles = {
  borderRadius: '5px',
  color: 'white',
  width: '20vw'
};

const AppHeader = () => {
  const loggedIn = 'userId' in sessionStorage;
  const inventory = JSON.parse(sessionStorage.getItem('products'));

  let [query, updateQuery] = useState('');
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const showSearch =
    pathname !== '/Orders' && pathname !== '/Analytics' && pathname !== '/Inventory';

  const search = () => {
    query = query.trim().toLowerCase();
    if (query === null) return alert('Search query cannot be an empty string.');
    navigate('/search', { state: { query: query } });
  };

  const login = () => navigate('/auth');

  const logout = () => {
    if (!confirm('logout?')) return;
    sessionStorage.clear();

    try {
      fetch('/api/logout');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header style={headerStyles}>
      <nav>
        <Link id="logo" style={aStyles} to="/">
          N
        </Link>
        <dialog>To shop</dialog>
      </nav>
      <span style={spanStyles}>
        {showSearch && (
          <input
            onChange={({ target: { value } }) => updateQuery(value)}
            style={searchbarStyles}
            id="searchbar"
            type="text"
            placeholder='Press "/" to focus'
          />
        )}
        {showSearch && <SearchIcon id="search-btn" onClick={search} />}
      </span>
      <button id="headerBtn" onClick={loggedIn ? logout : login}>
        {loggedIn ? 'Logout' : 'Login'}
      </button>
    </header>
  );
};

export default AppHeader;
