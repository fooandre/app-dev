import { HeartIcon, HomeIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/outline';
import { bool, object } from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLiked from './AppLiked';

const navbarStyles = {
    backgroundColor: '#3f4248',
    height: '100vh',
    width: '5vw',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '10'
}

const aStyles = {
    borderRadius: '10px',
    height: '5vw',
    width: '5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const svgStyles = {
    color: 'white',
    height: '3vh'
}

const AppSidebar = ({ loggedIn, user }) => {
    const { liked } = user;
    
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
                        <Link style={aStyles} onClick={() => toggleLiked(false)} to={icon.toLowerCase()}>{icons[icon]}</Link>
                        <dialog>{ icon }</dialog>
                    </li>
        }

        content.push(item)
    }

    if (showLiked) return (
        <>
            <AppLiked close={() => toggleLiked(false)} products={liked} />
            <navbar style={navbarStyles}>{ content }</navbar>
        </>
    )
    
    return <navbar style={navbarStyles}>{ content }</navbar>
}

AppSidebar.propTypes = {
    loggedIn: bool.isRequired,
    user: object.isRequired
}

export default AppSidebar
