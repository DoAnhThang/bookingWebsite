import React, { useState } from "react";
import "./Header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

function Header() {
  // Navigate to Search page
  const searchClickHandler = () => {
    window.location.replace("../search");
  };

  // Open calendar state
  const [openCalendar, setOpenCalendar] = useState(false);

  // Date range state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <div className="header-container">
      <div className="header">
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button type="submit" className="header-btn">
          Sign in / Register
        </button>

        <form className="header-form">
          <div className="header-input">
            <i className="fa fa-bed">&nbsp;</i>
            <input type="text" placeholder="Where are you going?" />
          </div>

          {/* Open calendar state */}
          <div
            className="header-range"
            onClick={() => setOpenCalendar(!openCalendar)}
          >
            <i className="fa fa-calendar">&nbsp;&nbsp;</i>
            {`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
              range[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>

          {/* Date range state */}
          {openCalendar && (
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              className="date"
              minDate={new Date()}
              onChange={(item) => setRange([item.selection])}
              ranges={range}
            />
          )}

          <div className="header-input">
            <i className="fa fa-male">&nbsp;</i>
            <input type="text" placeholder="1 adult • 0 children • 1 room" />
          </div>

          <button
            type="button"
            onClick={searchClickHandler}
            className="header-btn"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;
