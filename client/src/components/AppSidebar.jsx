import {
  ChartSquareBarIcon,
  ClipboardListIcon,
  CreditCardIcon,
  HeartIcon,
  KeyIcon,
  LoginIcon,
  LogoutIcon,
  ShoppingBagIcon
} from '@heroicons/react/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLiked from './AppLiked';

const navStyles = {
  backgroundColor: '#494b52',
  height: '100vh',
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  gap: '2vh',
  overflow: 'visible',
  padding: '8.5vh 0.5vw 1.5vh 0.5vw',
  zIndex: '10'
};

const aStyles = {
  borderRadius: '10px',
  width: '2.5vw',
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
};

const svgStyles = {
  color: 'white',
  height: '3vh'
};

const AppSidebar = () => {
  const loggedIn = 'userId' in sessionStorage;
  const products = JSON.parse(sessionStorage.getItem('products'));

  let [showLiked, toggleLiked] = useState(false);

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

  let icons = { Login: <LoginIcon style={svgStyles} /> };

  if (loggedIn) {
    icons = {
      Cart: <ShoppingBagIcon style={svgStyles} />,
      Liked: <HeartIcon style={svgStyles} />,
      Purchases: <CreditCardIcon style={svgStyles} />,
      Orders: <ClipboardListIcon style={svgStyles} />,
      Analytics: <ChartSquareBarIcon style={svgStyles} />,
      Inventory: <KeyIcon style={svgStyles} />,
      Logout: <LogoutIcon style={svgStyles} />
    };
  }

  let content = [];

  for (const icon in icons) {
    if (content.length === Object.keys(icons).length) break;

    let item;

    if (loggedIn)
      if (products.length === 0) if (icon === 'Orders' || icon === 'Analytics') continue;

    if (icon === 'Liked') {
      item = (
        <li key={icon}>
          <a style={aStyles} onClick={() => toggleLiked((showLiked = !showLiked))}>
            {icons[icon]}
          </a>
          <dialog>{icon}</dialog>
        </li>
      );
    } else if (icon === 'Login') {
      item = (
        <li key={icon}>
          <Link style={{ transform: 'rotate(180deg)', ...aStyles }} to="auth">
            {icons[icon]}
          </Link>
          <dialog>{icon}</dialog>
        </li>
      );
    } else if (icon === 'Logout') {
      item = (
        <li key={icon}>
          <a style={aStyles} onClick={logout}>
            {icons[icon]}
          </a>
          <dialog>{icon}</dialog>
        </li>
      );
    } else {
      item = (
        <li key={icon}>
          <Link style={aStyles} to={icon}>
            {icons[icon]}
          </Link>
          <dialog>{icon}</dialog>
        </li>
      );
    }

    content.push(item);
  }

  return (
    <>
      {showLiked && <AppLiked close={() => toggleLiked(false)} />}
      <nav style={navStyles}>{content}</nav>
    </>
  );
};

export default AppSidebar;
