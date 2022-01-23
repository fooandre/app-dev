import { useState } from 'react';
import AdminAnalytics from '../components/AdminAnalytics';
import AdminInventory from '../components/AdminInventory';
import AdminOrders from '../components/AdminOrders';
import AdminTabs from '../components/AdminTabs';

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
  

const Admin = () => {
    const username = JSON.parse(sessionStorage.getItem('username'));
    
    let [ show, setShow ] = useState("analytics");

    return (
        <>
            <AdminTabs show={show} toggleDisplay={state => setShow(state)} />
            <h2 style={{width: 'fit-content', marginBottom: '1vh'}}>Welcome back, { username }</h2>
            <section style={sectionStyles}>{ show == "analytics"? <AdminAnalytics /> : show == "orders"? <AdminOrders /> : <AdminInventory /> }</section>
        </>
    )
}

export default Admin
