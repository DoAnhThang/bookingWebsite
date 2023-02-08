/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./NavBarItem.css";

const NavBarItem = (props) => {
  return (
    <div>
      <ul className="navbar-links">
        {props.items.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={`navbar-link ${
                item.active ? "navbar-link__border" : ""
              }`}
            >
              <i className={`fa ${item.icon}`}></i>
              {item.type}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBarItem;
