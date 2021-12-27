import { useState } from 'react'
import { HomeIcon, UserCircleIcon, HeartIcon, KeyIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import AppLiked from './AppLiked'

const Sidebar = () => {
    const testProducts = [
        {
            '_id': '64830',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64831',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64832',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64833',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64834',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64835',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
    ]
    
    let [ showLiked, toggleLiked ] = useState(false)

    let [ content, updateContent ] = useState([]);
    
    const icons = {
        "Shop": <HomeIcon />,
        "User": <UserCircleIcon />,
        "Liked": <HeartIcon />,
        "Admin": <KeyIcon />
    }

    for (const icon in icons) {
        if (content.length == Object.keys(icons).length) break

        let item;

        if (icon == "Liked") {
            item = <li key={icon}>
                        <a onClick={() => toggleLiked(showLiked = !showLiked)}>{icons[icon]}</a>
                        <dialog>{ icon }</dialog>
                    </li>
        } else {   
            item = <li key={icon}>
                        <Link to={icon.toLowerCase()}>{icons[icon]}</Link>
                        <dialog>{ icon }</dialog>
                    </li>
        }

        content.push(item)
    }

    if (showLiked) return (
        <>
            <AppLiked closeLiked={() => toggleLiked(showLiked = false)} products={testProducts} />
            <navbar>{ content }</navbar>
        </>
    )
    
    return <navbar>{ content }</navbar>
}

export default Sidebar
