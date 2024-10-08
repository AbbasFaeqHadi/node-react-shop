import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-50 shadow dark:bg-gray-900">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
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
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:underline me-4 md:me-6"
                  onClick={scrollToTop}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:underline me-4 md:me-6"
                  onClick={scrollToTop}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:underline me-4 md:me-6"
                  onClick={scrollToTop}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Online Fashion™. Thank you for choosing us. Your style, your way.
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
