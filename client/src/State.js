const user = {
	'_id': 'asddf',
	'username': 'testUser',
	'password': 'password',
	'liked': [
		{
			'_id': '64830',
			'name': 'Name',
			'price': 12,
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
};

const testProducts = [
	{
		'_id': '64830',
		'name': 'Name',
		'price': 12,
		'user': user,
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
		'user': user,
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
	{
		'_id': '64832',
		'name': 'Name',
		'price': 12,
		'user': user,
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
	{
		'_id': '64833',
		'name': 'Name',
		'price': 12,
		'user': user,
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
	{
		'_id': '64834',
		'name': 'Name',
		'price': 12,
		'user': user,
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
];

let products = [];

const getProducts = async () => {
	try {
		const res = await fetch("http://127.0.0.1:5000/product/all");
		const data = await res.json();
		products = data.products;
	} catch (err) { console.error(err) };
}

getProducts();

export { user, products };
