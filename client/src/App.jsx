import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
            path="/Register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
