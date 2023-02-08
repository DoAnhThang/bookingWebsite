import React from "react";
import "./Hotels.css";
import hotelListData from "../../data/hotel_list"; // use JSON file data available

function Hotels() {
  return (
    <div className="hotel-list__container">
      <h3>Homes guests love</h3>
      <div className="hotel-list">
        {hotelListData.map((data) => (
          <div>
            <img src={`${data.image_url}`} alt={`${data.name}`} />
            <a href="../detail" target="_blank">
              {data.name}
            </a>
            <p>{data.city}</p>
            <p>
              <strong>Starting from ${data.price}</strong>
            </p>
            <div>
              <span className="rate-score">{data.rate}</span>
              <span className="rate-type">&nbsp;&nbsp;{data.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
