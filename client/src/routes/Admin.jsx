import BaseInput from '../components/BaseInput';

const formStyles = {
    position: 'relative',
    top: '40vh',
    left: '45vw',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5vh',
    transform: 'translate(-50%, -50%)'
}

const Admin = () => {
    const addProduct = async e => {
        try {
            e.preventDefault();

            const body = {
                name: document.getElementById("name").value,
                price: document.getElementById("price").value,
                desc: document.getElementById("desc").value,
                qty: document.getElementById("qty").value,
                img: document.getElementById("img").value
            };

            const res = await fetch('api/product/admin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            const data = await res.json();
            console.log(data);
            } catch (err) { console.error(err) };
        }

    return (
        <form style={formStyles}>
            <h1>Add product</h1>
            <BaseInput field="name" />
            <BaseInput type="number" field="price" />
            <BaseInput field="desc" />
            <BaseInput type="number" field="qty" />
            <BaseInput type="file" field="img" />
            <button onClick={addProduct}>Add</button>
        </form>
    )
}

export default Admin
