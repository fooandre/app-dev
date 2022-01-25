import { useEffect, useState } from 'react';
import AppCategories from '../components/AppCategories';
import BaseGrid from '../components/BaseGrid';
import BaseProduct from '../components/BaseProduct';

const Shop = () => {
    let [ content, appendContent ] = useState([]);

    useEffect(async () => {
        try {
            const res = await fetch("/api/product/all")
            const { products } = await res.json();
            for (const { id, ...product } of products) appendContent(content => [...content, <BaseProduct key={id} product={{id, ...product}} />])
        } catch (err) { console.error(err) };
    }, [])

    return (
        <>
            <AppCategories showIcons={true} />
            { content.length == 0? <h1>No products to show</h1> : <BaseGrid rowLength={4}>{ content }</BaseGrid> }
        </>
    )
}

export default Shop
