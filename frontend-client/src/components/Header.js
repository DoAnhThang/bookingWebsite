import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Header() {
  // destination want to search
  const [destination, setDestination] = useState("");

  // time period want to search
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // person quantity to order room
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="container-fluid text-white bg-darkBlue">
      <div className="container px-0">
        <h2>A lifetime of discounts? It's Genius.</h2>
        <p>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button
          className="btn btn-primary btn-sm rounded-0"
          onClick={() => navigate("/signup")}
        >
          Sign in / Register
        </button>

        <form
          className="row align-items-center gap-1 text-secondary bg-warning p-1 rounded mx-0 header--form"
          style={{ transform: "translate(0, 50%)" }}
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/search", { state: { destination, date, options } });
          }}
        >
          <div className="col-12 col-lg-4 bg-white rounded d-flex align-items-center p-2">
            <i className="fa fa-bed me-2"></i>
            <input
              type="text"
              placeholder="Where are you going?"
              className="border-0 outline-0"
              style={{ flex: 1 }}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="col-12 col-lg-4 bg-white rounded p-2">
            <div className="d-flex align-items-center">
              <i className="fa fa-calendar-days me-2"></i>
              <span
                style={{ flex: 1 }}
                onClick={() => {
                  setOpenDate(!openDate);
                  setOpenOptions(false);
                }}
              >
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
            </div>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                className="position-absolute mt-2"
                style={{ zIndex: 100 }}
              />
            )}
          </div>

          <div className="col-12 col-lg-3 bg-white rounded p-2">
            <div className="d-flex align-items-center">
              <i className="fa fa-person me-2"></i>
              <span
                style={{ flex: 1 }}
                onClick={() => {
                  setOpenOptions(!openOptions);
                  setOpenDate(false);
                }}
              >
                {`${options.adult} adult · ${options.children} children · ${options.room} room`}
              </span>
            </div>
            {openOptions && (
              <div
                className="position-absolute bg-white w-25 shadow rounded mt-2"
                style={{ zIndex: 100, minWidth: "15rem" }}
              >
                <div className="d-flex justify-content-between align-items-center m-3">
                  <span className="">Adult</span>
                  <div className="d-flex align-items-center gap-3 fs-7 border border-secondary border-1">
                    <button
                      type="button"
                      disabled={options.adult <= 1}
                      className="btn btn-light rounded-0 border-0"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="text-dark border-0">{options.adult}</span>
                    <button
                      type="button"
                      className="btn btn-light rounded-0 border-0"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center m-3">
                  <span className="">Children</span>
                  <div className="d-flex align-items-center gap-3 fs-7 border border-secondary border-1">
                    <button
                      type="button"
                      disabled={options.children <= 0}
                      className="btn btn-light rounded-0 border-0"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      type="button"
                      className="btn btn-light rounded-0 border-0"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center m-3">
                  <span className="">Room</span>
                  <div className="d-flex align-items-center gap-3 fs-7 border border-secondary border-1">
                    <button
                      type="button"
                      disabled={options.room <= 1}
                      className="btn btn-light rounded-0 border-0"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      type="button"
                      className="btn btn-light rounded-0 border-0"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-12 px-0" style={{ flex: 1 }}>
            <button
              type="submit"
              className="btn btn-primary btn-sm w-100 fw-semibold p-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Header;
