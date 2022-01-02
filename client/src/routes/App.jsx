import { bool, object } from 'prop-types';
import { Outlet } from 'react-router-dom'

import AppSidebar from '../components/AppSidebar'
import AppHeader from '../components/AppHeader'

const App = ({ loggedIn, user }) => {
    return (
        <>
            <AppSidebar user={user} />
            <AppHeader loggedIn={loggedIn} />
            <main><Outlet /></main>
        </>
    )
}

App.propTypes = {
    loggedIn: bool.isRequired,
    user: object.isRequired
}

export default App
