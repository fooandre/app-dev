import { bool } from 'prop-types';
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

const AppHeader = ({ loggedIn }) => {
    const navigate = useNavigate();

    const login = () => navigate('/auth');

    const logout = () => {
        localStorage.clear();
        document.cookie = "loggedIn=false;path=/;";
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

AppHeader.propTypes = {
    loggedIn: bool.isRequired
}

AppHeader.defaultProps = {
    loggedIn: false
}

export default AppHeader
