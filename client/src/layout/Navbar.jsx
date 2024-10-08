import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "../components/Dropdown";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../redux/actions/User";
import { useState } from "react";
import Checkout from "../pages/Checkout";

const Navbar = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  console.log(userInfo);

  const qty = useSelector((state) =>
    state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0)
  );

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  const [open, setOpen] = useState(false);

  const userDropdownItems = [
    { label: "Order History", link: "/order-history" },
    { label: "Sign out", action: logoutHandler },
  ];

  const hamburgerMenuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-gray-50 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center" onClick={scrollToTop}>
          <img
            src="https://www.svgrepo.com/show/520948/shopping-bag-4.svg"
            className="h-8 mr-1 dark:invert"
            alt="Web shop Logo"
          />
          <span className="text-blue-600 self-center text-2xl font-semibold whitespace-nowrap dark:text-white dark:text-blue-400">
            Online Fashion
          </span>
        </Link>
        <div className="flex md:order-2">
          {!userInfo ? (
            <>
              <Link
                to="/login"
                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={scrollToTop}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={scrollToTop}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <CustomDropdown
                label="User"
                items={userDropdownItems}
                dropdownClass="bg-blue-600 hover:bg-blue-700"
                header={{ Name: userInfo.name, Email: userInfo.email }}
              />

              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className=" inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded="false"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <span>{qty}</span>
              </button>

              <Checkout open={open} setOpen={setOpen}></Checkout>

              {/* Hamburger menu dropdown window for small screens */}
              <CustomDropdown
                label={
                  <svg
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                }
                items={hamburgerMenuItems}
                dropdownClass="hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              />
            </>
          )}
        </div>

        {/* Normal sized screen links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex text-lg flex-col font-medium md:p-0 md:space-x-8 md:flex-row">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white md:p-0 md:text-blue-600 dark:text-blue-500"
                aria-current="page"
                onClick={scrollToTop}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 text-white md:p-0 md:text-blue-600 dark:text-blue-500"
                aria-current="page"
                onClick={scrollToTop}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
