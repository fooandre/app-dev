import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux'
// import store from './store'

import App from "./App";
import Admin from "./routes/Admin";
import Product from "./routes/Product";
import Search from "./routes/Search";
import User from "./routes/User";

const rootElement = document.getElementById("root");
import './styles/Main.css'

render(
  // <Provider store={store}>
  	<BrowserRouter>
    	<Routes>
			<Route path="/" element={<App />} />
			<Route path="admin" element={<Admin />} />
			<Route path="product" element={<Product />} />
			<Route path="search" element={<Search />} />
			<Route path="user" element={<User />} />
    	</Routes>
  	</BrowserRouter>,
  // </Provider>,
  rootElement
)
