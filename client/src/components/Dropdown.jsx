"use client";

import { Dropdown } from "flowbite-react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const UserDropdown = ({logoutHandler}) => {
  return (
  <div className="bg-blue-600 mx-1 rounded-lg hover:bg-blue-700">
    <Dropdown label={<span className="text-white">User</span>} arrowIcon={false} dismissOnClick={false}>
      <Link to="/order-history">
      <Dropdown.Item>Order History</Dropdown.Item>
      
      </Link>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  </div>
  );
}

UserDropdown.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
};

export default UserDropdown;