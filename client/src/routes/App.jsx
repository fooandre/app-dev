import { ArrowSmUpIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';

const buttonStyles = {
    border: 'none',
    backgroundColor: 'rgba(63, 66, 72, 0.9)',
    color: 'white',
    position: 'fixed',
    bottom: '5vh',
    right: '3vw',
    opacity: '0',
    cursor: 'pointer',
    zIndex: '10'
}

const App = () => {
    let [ hover, setHover ] = useState(false);
    
    window.onscroll = () => {
        const button = document.getElementById("back-to-top");
        
        if (document.documentElement.scrollTop > 200) {
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        } else {
            button.style.opacity = '0';
            button.style.cursor = 'default';
        }

        if (button.style.opacity == "1" && !hover) {
            const timer = setTimeout(() => button.style.opacity = "0", 3000);
        }
    }

    
    return (
        <>
            <AppHeader />
            <AppSidebar />
            <main><Outlet /></main>
            <button id="back-to-top" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => document.documentElement.scrollTop = 0} style={buttonStyles}><ArrowSmUpIcon /></button>
        </>
    )
}

export default App
