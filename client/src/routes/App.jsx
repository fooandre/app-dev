import { bool, object } from 'prop-types';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppSidebar from '../components/AppSidebar';


const App = ({ loggedIn, user }) => {
    return (
        <>
            <AppSidebar loggedIn={loggedIn} user={user} />
            <AppHeader loggedIn={loggedIn} />
            <main style={{paddingBottom:'1vh'}}><Outlet /></main>
        </>
    )
}

App.propTypes = {
    loggedIn: bool.isRequired,
    user: object.isRequired
}

export default App
