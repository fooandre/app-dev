import { useState } from 'react';
import UserCart from '../components/UserCart';
import UserPurchases from '../components/UserPurchases';
import UserTabs from '../components/UserTabs';

const sectionStyles = {
    backgroundColor: 'aqua',
    outline: '2px solid black',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3vh',
    padding: '7vh 0 5vh 0',
}

const User = () => {
    const username = JSON.parse(sessionStorage.getItem('username'));
    
    let [ show, setShow ] = useState("cart");

    return (
        <>
            <UserTabs show={show} toggleDisplay={state => setShow(state)} />
            <h2 style={{width: 'fit-content', marginBottom: '1vh'}}>Welcome back, { username }</h2>
            <section style={sectionStyles}>{ show == "cart"? <UserCart /> : <UserPurchases /> }</section>
        </>
    )
}

export default User
