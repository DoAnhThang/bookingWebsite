/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
import footerData from "../../data/footer"; // use JSON file data available

function Footer() {
  return (
    <div className="footer">
      {footerData.map((data) => (
        <div key={data.col_number} className="footer-col">
          {data.col_values.map((field) => (
            <a href="#">{field}</a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Footer;
