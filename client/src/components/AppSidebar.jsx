import { ChartSquareBarIcon, ClipboardListIcon, CreditCardIcon, HeartIcon, LoginIcon, LogoutIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/outline';
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
    padding: '1vh 0.5vw',
    zIndex: '10'
}

const aStyles = {
    borderRadius: '10px',
    width: '2.5vw',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}

const svgStyles = {
    color: 'white',
    height: '3vh'
}

const AppSidebar = () => {
    const loggedIn = "userId" in sessionStorage;

    let [ showLiked, toggleLiked ] = useState(false);

    const logout = () => {
        sessionStorage.clear();
        try { fetch("/api/logout") } catch (err) { console.error(err) };
        window.location.reload();
    };
    
    let icons = { "Login": <LoginIcon style={svgStyles} /> }

    if (loggedIn) {
        icons = {
            "Cart": <ShoppingBagIcon style={svgStyles} />,
            "Liked": <HeartIcon style={svgStyles} />,
            "Purchases": <CreditCardIcon style={svgStyles} />,
            "Orders": <ClipboardListIcon style={svgStyles} />,
            "Analytics": <ChartSquareBarIcon style={svgStyles} />,
            "Inventory": <ShoppingCartIcon style={svgStyles} />,
            "Logout": <LogoutIcon style={svgStyles} />,
        }
    }

    let content = [];

    for (const icon in icons) {
        if (content.length == Object.keys(icons).length) break

        let item;

        if (icon == "Liked") {
            item = <li key={icon}>
                        <a style={aStyles} onClick={() => toggleLiked(showLiked = !showLiked)}>{icons[icon]}</a>
                        <dialog>{ icon }</dialog>
                    </li>
        } else if (icon == "Login") {
            item = <li key={icon}>
                        <Link style={aStyles} to="auth">{icons[icon]}</Link>
                        <dialog>{ icon }</dialog>
                    </li>
        } else if (icon == "Logout") {
            item = <li key={icon}>
                        <a style={aStyles} onClick={logout}>{icons[icon]}</a>
                        <dialog>{ icon }</dialog>
                    </li>
        } else {
            item = <li key={icon}>
                        <Link style={aStyles} to={icon}>{icons[icon]}</Link>
                        <dialog>{ icon }</dialog>
                    </li>
        }

        content.push(item);
    }

    if (showLiked) return (
        <>
            <AppLiked close={() => toggleLiked(false)} />
            <nav style={navStyles}>{ content }</nav>
        </>
    )
    
    return <nav style={navStyles}>{ content }</nav>
}

export default AppSidebar
