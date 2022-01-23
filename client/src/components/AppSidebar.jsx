import { HeartIcon, HomeIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLiked from './AppLiked';

const navStyles = {
    backgroundColor: '#3f4248',
    boxShadow: '1px 0 2px 0 black',
    height: '100vh',
    width: '5vw',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    zIndex: '10'
}

const aStyles = {
    borderRadius: '10px',
    height: '5vw',
    width: '5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
}

const svgStyles = {
    color: 'white',
    height: '3vh'
}

const AppSidebar = () => {
    const loggedIn = "userId" in sessionStorage;

    let [ showLiked, toggleLiked ] = useState(false);
    
    let icons = {
        "Shop": <HomeIcon style={svgStyles} />,
        "User": <UserCircleIcon style={svgStyles} />,
        "Liked": <HeartIcon style={svgStyles} />,
        "Admin": <KeyIcon style={svgStyles} />
    }

    let content = [];

    for (const icon in icons) {
        if (content.length == Object.keys(icons).length) break

        let item;

        if (icon == "Liked") {
            if (!loggedIn) continue;

            item = <li key={icon}>
                        <a style={aStyles} onClick={() => toggleLiked(showLiked = !showLiked)}>{icons[icon]}</a>
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
