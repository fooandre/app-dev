import { ArrowSmUpIcon } from '@heroicons/react/outline';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';

const buttonStyles = {
    backgroundColor: '#3f4248',
    color: 'white',
    position: 'fixed',
    bottom: '5vh',
    right: '5vw',
    display: 'none',
    zIndex: '10'
}

const App = () => {
    window.onscroll = () => {
        const button = document.getElementById("backToTop");
        document.documentElement.scrollTop > 200? button.style.display = 'block' : button.style.display = 'none';
    }
    
    return (
        <>
            <AppSidebar />
            <AppHeader />
            <main><Outlet /></main>
            <button id="backToTop" onClick={() => document.documentElement.scrollTop = 0} style={buttonStyles}><ArrowSmUpIcon style={{height: '3vh'}} /></button>
        </>
    )
}

export default App
