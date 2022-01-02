import { bool } from 'prop-types';
import { Link } from 'react-router-dom'

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
    return (
        <header style={headerStyles}>
            <Link style={aStyles} to="/">NACHD</Link>
            <input style={searchbarStyles} id="searchbar" type="text" placeholder="press &quot;/&quot; to focus" />
            <button>{ loggedIn? "Cart" : "Login" }</button>
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
