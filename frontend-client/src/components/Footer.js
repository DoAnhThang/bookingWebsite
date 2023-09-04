import footerData from "../data/footer";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="container d-flex flex-wrap justify-content-between gap-3 mt-5 mb-4">
      {footerData.map((item) => (
        <ul className="list-unstyled" key={item.col_number}>
          {item.col_values.map((value) => (
            <li className="mb-2" key={value}>
              <NavLink to="/" className="text-decoration-none">
                {value}
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default Footer;
