import { SearchIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';

const headerStyles = {
    backgroundColor: '#34363b',
    boxShadow: '0 1px 2px 0 black',
    color: 'white',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1vh 1vw'
}

const aStyles = {
    fontWeight: '700',
    fontSize: '2rem',
    textDecoration: 'none'
}

const spanStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
}

const searchbarStyles = {
    borderRadius: '5px',
    color: 'white',
    width: '20vw',
}

const svgStyles = {
    color: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    right: '1vw'
}

const AppHeader = () => {
    const loggedIn = "userId" in sessionStorage;

    const navigate = useNavigate();

    const login = () => navigate('/auth');

    const logout = () => {
        sessionStorage.clear();

        try {
            fetch("/api/logout");
        } catch (err) { console.error(err) };

        window.location.reload();
    };

    return (
        <header style={headerStyles}>
            <Link style={aStyles} to="/">N</Link>
            <span style={spanStyles}>
                <input style={searchbarStyles} id="searchbar" type="text" placeholder="Press &quot;/&quot; to focus" />
                <SearchIcon style={svgStyles} />
            </span>
            <button id="headerBtn" onClick={loggedIn? logout : login}>{ loggedIn? "Logout" : "Login" }</button>
        </header>
    )
}

export default AppHeader
