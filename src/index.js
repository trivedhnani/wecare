import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Register from "./components/Auth/Register";
// import Login from "./components/Auth/Login";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import Footer from "./components/Footer/Footer";
// import Header from "./components/Header/Header";
import store from "./components/store";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./controller/authController";
import setAuthToken from "./utils/setAuthToken";
// <<<<<<< HEAD
// import BuyNow from "./components/Products/BuyNow";
// import Cart from "./components/Products/Cart";
// import Orders from "./components/Products/Orders";
// import History from "./components/Products/History";
// import Product from "./components/Products/Product";
// import Products from "./components/Products/Products";
// ||||||| merged common ancestors
// import BuyNow from "./components/Products/BuyNow";
// import Cart from "./components/Products/Cart";
// import Orders from "./components/Products/Orders";
// import History from "./components/Products/History";
// import Product from "./components/Products/Product";
// import Products from "./components/Products/Products";

// <<<<<<< HEAD

// =======
// import BuyNow from "./components/Products/BuyNow";
// import Cart from "./components/Products/Cart";
// import Orders from "./components/Products/Orders";
// import History from "./components/Products/History";
// import Product from "./components/Products/Product";
// import Products from "./components/Products/Products";
// import Doctors from "./components/Doctors/Doctors";
// import Consult from "./components/Doctors/Consult";

// >>>>>>> 64af573b38d38dae206fc1952375a52d152862e0
import "../node_modules/jquery/dist/jquery";
import "../node_modules/bootstrap/dist/js/bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const routing = (
  <Provider store={store}>
    {/* <<<<<<< HEAD */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
serviceWorker.unregister();
