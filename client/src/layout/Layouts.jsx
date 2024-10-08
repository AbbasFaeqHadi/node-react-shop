import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">      
      <Navbar className="bg-gray-50 dark:bg-gray-900"/>
      <main className="flex-grow">{children}</main>
      <Footer className="bg-gray-50 dark:bg-gray-900"/>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
