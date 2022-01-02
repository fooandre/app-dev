import { object } from 'prop-types'
import { useState } from 'react'
import { HomeIcon, UserCircleIcon, HeartIcon, KeyIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import AppLiked from './AppLiked'

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

const dialogStyles = {
    backgroundColor: 'rgb(210, 251, 255)',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 'black 1px 1px 2px 0',
    fontSize: '0.75rem',
    position: 'absolute',
    left: '4vw',
    transform: 'translateY(-200%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1vh 1vw',
    opacity: '0'
}

const AppSidebar = ({ user }) => {
    const { liked } = user;
    
    let [ showLiked, toggleLiked ] = useState(false);
    
    let icons = {
        "": <HomeIcon style={svgStyles} />,
        "User": <UserCircleIcon style={svgStyles} />,
        "Liked": <HeartIcon style={svgStyles} />,
        "Admin": <KeyIcon style={svgStyles} />
    }
    
    let content = [];

    for (const icon in icons) {
        if (content.length == Object.keys(icons).length) break

        let item;

        if (icon == "Liked") {
            item = <li key={icon}>
                        <a style={aStyles} onClick={() => toggleLiked(showLiked = !showLiked)}>{icons[icon]}</a>
                        <dialog style={dialogStyles}>{ icon }</dialog>
                    </li>
        } else {
            item = <li key={icon}>
                        <Link style={aStyles} onClick={() => toggleLiked(false)} to={icon.toLowerCase()}>{icons[icon]}</Link>
                        <dialog style={dialogStyles}>{ icon }</dialog>
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
    user: object.isRequired
}

export default AppSidebar
