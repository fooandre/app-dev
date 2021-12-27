import { Link } from 'react-router-dom'

const AppHeader = () => {
    let loggedIn = false;

    return (
        <header>
            <Link to="/">NACHD</Link>
            <input id="searchbar" type="text" placeholder="press &quot;/&quot; to focus" />
            <button>{ loggedIn? "Cart" : "Login" }</button>
        </header>
    )
}

export default AppHeader
