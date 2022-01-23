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
					<Route path="shop" element={<Navigate to="/" />} />
					<Route path="search" element={<Search />} />
					<Route path="product/:productId" element={<Product />} />
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