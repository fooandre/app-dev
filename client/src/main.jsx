import { render } from "react-dom";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import AppFooter from "./components/AppFooter";
import Admin from "./routes/Admin";
import App from "./routes/App";
import Auth from "./routes/Auth";
import NotFound from "./routes/NotFound";
import Product from "./routes/Product";
import Search from "./routes/Search";
import Shop from "./routes/Shop";
import User from "./routes/User";
import { products, user } from "./State";

const rootElement = document.getElementById("root");

let loggedIn = document.cookie == ""? false : decodeURIComponent(document.cookie).slice(9) == "true";

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
				<Route path="/" element={<App loggedIn={loggedIn} user={user} />}>
					<Route path="" element={<Shop products={products} />} />
					<Route path="shop" element={<Navigate to="/" />} />
					<Route path="search" element={<Search />} />
					<Route path="product/:productId" element={<Product loggedIn={loggedIn} likedItems={user.liked} products={products} />} />
					<Route path="auth" element={ loggedIn? <Navigate to={-1} /> : <Auth /> } />
					<Route path="user" element={ loggedIn? <User /> : <Navigate to="/auth" />} />
					<Route path="admin" element={ loggedIn? <Admin /> : <Navigate to="/auth" />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
		<AppFooter />
	</>,
  rootElement
)
