const getUser = async () => {
    try {
        const res = await fetch("/api/get_user", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ userId: JSON.parse(sessionStorage.getItem('userId')) })
        })
        
        const user = await res.json();   
        for (const attr in user) sessionStorage.setItem(attr, JSON.stringify(user[attr]));
        return window.location.reload();
    } catch (err) { console.error(err) };
}

export { getUser };
