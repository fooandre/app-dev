import AppCategories from '../components/AppCategories'
import AppProducts from '../components/AppProducts'

const Shop = () => {
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
        {
            '_id': '64836',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64837',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64838',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64839',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
        {
            '_id': '64840',
            'name': 'Name',
            'price': 12,
            'image': '../../static/Test.jpeg'
        },
    ]

    return (
        <section>
            <AppCategories />
            <AppProducts products={testProducts} rowLength={5} />
        </section>
    )
}

export default Shop
