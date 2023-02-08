import React from "react";
import "./HotelTypes.css";
import hotelTypes from "../../data/type"; // use JSON file data available

function HotelTypes() {
  return (
    <div className="hotel-types__container">
      <h3>Browse by property type</h3>
      <div className="hotel-types">
        {hotelTypes.map((data) => (
          <div key={data.id}>
            <img src={`${data.image}`} alt={`${data.name}`} />
            <h4>{data.name}</h4>
            <p>{data.count} hotels</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelTypes;
