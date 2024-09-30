import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
function App() {
  // Check if user is logged in or not.
  const userLoginReducer = useSelector((state) => state.userLoginReducer);

  // Extract the user info from the userLoginReducer
  const { userInfo } = userLoginReducer;

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/products/:id"
            element={<ProductDetails />}
          ></Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>

          <Route exact path="/checkout" element={<Checkout />}></Route>

          <Route exact path="/orderdetails" element={<OrderDetails />}></Route>

          <Route exact path="/order/:id" element={<OrderConfirmation />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
