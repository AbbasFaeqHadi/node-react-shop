import { Dropdown } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomDropdown = ({ label, items, dropdownClass, header }) => {
  return (
    <div className={`${dropdownClass} mx-1 rounded-lg`}>
      <Dropdown
        className="border-0 shadow-lg dark:shadow-gray-900"
        label={label}
        arrowIcon={false}
        dismissOnClick={false}
      >
        {header && (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            <Dropdown.Header>
              {Object.keys(header).map((key, index) => (
                <span key={index} className="block text-sm text-medium">
                  {key}: {header[key]}
                </span>
              ))}
            </Dropdown.Header>
            
          </div>
        )}

        {items.map((item, index) =>
          item.link ? (
            <Link to={item.link} key={index}>
              <Dropdown.Item>{item.label}</Dropdown.Item>
            </Link>
          ) : (
            <Dropdown.Item key={index} onClick={item.action}>
              {item.label}
            </Dropdown.Item>
          )
        )}
      </Dropdown>
    </div>
  );
};

CustomDropdown.propTypes = {
  label: PropTypes.node.isRequired, // Supports JSX elements as well
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string, // Optional link
      action: PropTypes.func, // Optional action function
    })
  ).isRequired,
  dropdownClass: PropTypes.string, // Optional additional class for customization
  header: PropTypes.object, // Optional header
};

export default CustomDropdown;
