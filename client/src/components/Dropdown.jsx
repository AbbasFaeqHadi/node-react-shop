"use client";

import { Dropdown } from "flowbite-react";
import PropTypes from 'prop-types';

const UserDropdown = ({logoutHandler}) => {
  return (
    <Dropdown label="User" dismissOnClick={false}>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

UserDropdown.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
};

export default UserDropdown;