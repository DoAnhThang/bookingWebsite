// import hotelTypes from "../data/type";
import { NavLink } from "react-router-dom";

function PropertyList({ data }) {
  return (
    <div
      className="d-grid gap-3 mb-4 property-list"
      style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
    >
      {data.map((item) => (
        <NavLink key={item.type} className="text-decoration-none text-dark">
          <img
            src={item.imageUrl}
            alt={item.type}
            className="w-100 rounded-top mb-2"
          />
          <h5 className="fw-bold mb-0">
            {item.type.replace(/./, (str) => str.toUpperCase())}
          </h5>
          <p>{item.hotelQtyByType} hotels</p>
        </NavLink>
      ))}
    </div>
  );
}

export default PropertyList;
