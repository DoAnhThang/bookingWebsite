/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import NavBarItem from "./NavBarItem";
import "./NavBar.css";
import navBarData from "../../data/navBar"; // use JSON file data available

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <a className="navbar-brand" href="#">
          Booking Website
        </a>
        <div className="navbar-btns">
          <button className="navbar-btn" type="button">
            Register
          </button>
          <button className="navbar-btn" type="button">
            Login
          </button>
        </div>
      </div>
      <NavBarItem items={navBarData} />
    </nav>
  );
}

export default NavBar;
