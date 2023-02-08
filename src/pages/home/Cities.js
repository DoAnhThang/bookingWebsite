import React from "react";
import "./Cities.css";
import cityData from "../../data/city"; // use JSON file data available

function Cities() {
  return (
    <div className="cities">
      {cityData.map((city) => (
        <div
          key={city.id}
          style={{ backgroundImage: `url("${city.image}")` }}
          className="city"
        >
          <h1>
            <strong>{city.name}</strong>
          </h1>
          <p>
            <strong>{city.subText}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Cities;
