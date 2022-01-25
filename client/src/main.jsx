import { render } from "react-dom";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import AppFooter from "./components/AppFooter";
import Analytics from './routes/Analytics';
import App from "./routes/App";
import Auth from "./routes/Auth";
import Cart from './routes/Cart';
import Inventory from './routes/Inventory';
import NotFound from "./routes/NotFound";
import Orders from './routes/Orders';
import Product from "./routes/Product";
import Purchases from './routes/Purchases';
import Search from "./routes/Search";
import Shop from "./routes/Shop";

const rootElement = document.getElementById("root");

const loggedIn = "userId" in sessionStorage;

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

render(
	<>
		<Router>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="" element={<Shop />} />
					<Route path="Shop" element={<Navigate to="/" />} />
					<Route path="Search" element={<Search />} />
					<Route path="Product/:productId" element={<Product />} />
					<Route path="Auth" element={ loggedIn? <Navigate to={-1} /> : <Auth /> } />
					<Route path="Cart" element={ loggedIn? <Cart /> : <Navigate to="/auth" /> } />
					<Route path="Purchases" element={ loggedIn? <Purchases /> : <Navigate to="/auth" /> } />
					<Route path="Analytics" element={ loggedIn? <Analytics /> : <Navigate to="/auth" /> } />
					<Route path="Orders" element={ loggedIn? <Orders /> : <Navigate to="/auth" /> } />
					<Route path="Inventory" element={ loggedIn? <Inventory /> : <Navigate to="/auth" /> } />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
		<AppFooter />
	</>,
  rootElement
)