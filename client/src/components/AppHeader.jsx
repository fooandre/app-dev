import { Link, useNavigate } from 'react-router-dom';

const headerStyles = {
    height: '7vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 0 1vh 5vw',
    padding: '0 2.5vw'
}

const aStyles = {
    color: '#000',
    fontWeight: '700',
    fontSize: '2rem',
    textDecoration: 'none'
}

const searchbarStyles = {
    width: '20vw'
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
            <Link style={aStyles} to="/">NACHD</Link>
            <input style={searchbarStyles} id="searchbar" type="text" placeholder="Press &quot;/&quot; to focus" />
            <button onClick={loggedIn? logout : login}>{ loggedIn? "Logout" : "Login" }</button>
        </header>
    )
}

export default AppHeader
