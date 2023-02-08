import React from "react";
import "./SearchPopup.css";

function SearchPopup() {
  return (
    <div className="search-popup">
      <h3>Search</h3>
      <form className="search-popup__form">
        <label>Destination</label>
        <input type="text"></input>

        <label>Check-in Date</label>
        <input type="text" placeholder="06/24/2022 to 06/24/2022"></input>

        <label>Options</label>
        <div className="search-popup__options">
          <label>
            Min price <span>per night</span>
          </label>
          <input type="number"></input>
        </div>
        <div className="search-popup__options">
          <label>
            Max price <span>per night</span>
          </label>
          <input type="number"></input>
        </div>
        <div className="search-popup__options">
          <label>Adult</label>
          <input type="number" placeholder="1"></input>
        </div>
        <div className="search-popup__options">
          <label>Children</label>
          <input type="number" placeholder="0"></input>
        </div>
        <div className="search-popup__options">
          <label>Room</label>
          <input type="number" placeholder="1"></input>
        </div>
      </form>
      <button type="button">Search</button>
    </div>
  );
}

export default SearchPopup;
