import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './routes/App';
import Shop from "./routes/Shop";
import Admin from "./routes/Admin";
import Product from "./routes/Product";
import Search from "./routes/Search";
import User from "./routes/User";

import AppFooter from './components/AppFooter';

const rootElement = document.getElementById("root"); 
import './app.css'

window.onload = () => {
	const searchbar = document.getElementById("searchbar");

	searchbar.addEventListener("keydown", e => {});

	document.addEventListener('keydown', e => {
		if (e.key == "/") {
			e.preventDefault()
			searchbar.focus();
		}
	})
}

let loggedIn = false;

const testProducts = [
	{
		'_id': '64830',
		'name': 'Name',
		'price': 12,
		'user': {
			'_id': 'asddf',
			'username': 'testUser',
			'password': 'password',
			'liked': [
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
			],
			'orders': [
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
				}
			],
			'products': []
		},
		'category': 'Fashion',
		'desc': 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime reprehenderit, unde et quisquam quo necessitatibus perspiciatis cum neque non sint quae voluptate sed! Qui id voluptas dolores nam voluptatum deleniti.',
		'qty': 10,
		'image': '../../static/Test.jpeg',
		'reviews': [
			{
				'_id': 'asdfsaddsc',
				'user': {
					'_id': 'asdasd',
					'username': 'testUser1'
				},
				'rating': 0,
				'comment': 'This is a comment.',
				'date': new Date('2019-10-23'),
			},
			{
				'_id': 'asdfsaddswqsad',
				'user': {
					'_id': 'asdw',
					'username': 'testUser2'
				},
				'rating': 1,
				'comment': 'This is a comment.',
				'date': new Date('2019-10-9'),
			},
			{
				'_id': 'afeorufadjsa',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsasd',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsvadsfg',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsaasdfhjld',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsaqwe',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			}
		]
	},
	{
		'_id': '64831',
		'name': 'Name',
		'price': 12,
		'user': {
			'_id': 'asddf',
			'username': 'testUser',
			'password': 'password',
			'liked': [
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
			],
			'orders': [
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
				}
			],
			'products': []
		},
		'category': 'Fashion',
		'desc': 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime reprehenderit, unde et quisquam quo necessitatibus perspiciatis cum neque non sint quae voluptate sed! Qui id voluptas dolores nam voluptatum deleniti.',
		'qty': 10,
		'image': '../../static/AnotherTest.jpeg',
		'reviews': [
			{
				'_id': 'asdfsaddsc',
				'user': {
					'_id': 'asdasd',
					'username': 'testUser1'
				},
				'rating': 0,
				'comment': 'This is a comment.',
				'date': new Date('2019-10-23'),
			},
			{
				'_id': 'asdfsaddswqsad',
				'user': {
					'_id': 'asdw',
					'username': 'testUser2'
				},
				'rating': 1,
				'comment': 'This is a comment.',
				'date': new Date('2019-10-9'),
			},
			{
				'_id': 'afeorufadjsa',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsasd',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsvadsfg',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsaasdfhjld',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			},
			{
				'_id': 'afeorufadjsaqwe',
				'user': {
					'_id': 'asdasdvaksld',
					'username': 'testUser3'
				},
				'rating': 4,
				'comment': 'This is a comment.',
				'date': new Date('2020-12-3'),
			}
		]
	},
]

const testUser = {
	'_id': 'asddf',
	'username': 'testUser',
	'password': 'password',
	'liked': testProducts,
	'orders': [
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
		}
	],
	'products': []
}

render(
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App loggedIn={loggedIn} user={testUser} />}>
					<Route path="" element={<Shop products={testProducts} />} />
					<Route path="admin" element={<Admin />} />
					<Route path="product/:productId" element={<Product products={testProducts} />} />
					<Route path="search" element={<Search />} />
					<Route path="user" element={<User />} />
					<Route path="*" element={<h1>sorry, there's nothing here</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
		<AppFooter />
	</>,
  rootElement
)
