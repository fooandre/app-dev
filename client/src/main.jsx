import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppSidebar from './components/AppSidebar'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

import Shop from "./routes/Shop";
import Admin from "./routes/Admin";
import Product from "./routes/Product";
import Search from "./routes/Search";
import User from "./routes/User";

const rootElement = document.getElementById("root");
import './app.css'

render(
  	<BrowserRouter>
		<AppSidebar />
		<AppHeader />
		<main style={{marginLeft: '5vw'}}>
			<Routes>
				<Route path="/" element={<Shop />} />
				<Route path="/shop" element={<Shop />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/product" element={<Product />} />
				<Route path="/search" element={<Search />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</main>
		<AppFooter />
  	</BrowserRouter>,
  rootElement
)
