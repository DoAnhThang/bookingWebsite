import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function SearchPopup({
  destination,
  setDestination,
  date,
  setDate,
  openDate,
  setOpenDate,
  options,
  setOptions,
  getSearchHotels,
}) {
  // console.log("SearchPopup date: ", date);
  const handleOption = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div
      className="col-12 col-sm-8 col-md-6 col-lg-3 bg-warning rounded-4 py-3 mx-auto"
      style={{ height: "max-content" }}
    >
      <h4 className="fw-bold text-secondary">Search</h4>

      <form>
        <label className="fs-7 fw-semibold mb-1" htmlFor="destination">
          Destination
        </label>
        <input
          type="text"
          placeholder={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="form-control rounded-0 border-0 py-2 px-3 mb-2"
          name="destination"
        />

        <div className="position-relative">
          <label className="fs-7 fw-semibold mb-1">Check-in Date</label>
          <div
            onClick={() => setOpenDate()}
            className="bg-white py-2 px-3 mb-2"
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>

          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              className="position-absolute start-0"
              style={{ zIndex: 2 }}
            />
          )}
        </div>

        <label className="fs-7 fw-semibold mb-2">Options</label>
        <div className="mb-3">
          <div className="fs-7 fw-semibold text-secondary d-flex justify-content-between cg-1 ms-2 mb-2">
            <label htmlFor="minPrice">
              Min price <small>per night</small>
            </label>
            <input type="number" name="minPrice" className="w-25 outline-0" />
          </div>
          <div className="fs-7 fw-semibold text-secondary d-flex justify-content-between cg-1 ms-2 mb-2">
            <label htmlFor="maxPrice">
              Max price <small>per night</small>
            </label>
            <input type="number" name="maxPrice" className="w-25 outline-0" />
          </div>
          <div className="fs-7 fw-semibold text-secondary d-flex justify-content-between cg-1 ms-2 mb-2">
            <label htmlFor="adult">Adult</label>
            <input
              type="number"
              name="adult"
              min={1}
              className="w-25 outline-0"
              placeholder={options.adult}
              onChange={(e) => handleOption("adult", e.target.value)}
            />
          </div>
          <div className="fs-7 fw-semibold text-secondary d-flex justify-content-between cg-1 ms-2 mb-2">
            <label htmlFor="children">Children</label>
            <input
              type="number"
              name="children"
              min={0}
              className="w-25 outline-0"
              placeholder={options.children}
              onChange={(e) => handleOption("children", e.target.value)}
            />
          </div>
          <div className="fs-7 fw-semibold text-secondary d-flex justify-content-between cg-1 ms-2 mb-2">
            <label htmlFor="room">Room</label>
            <input
              type="number"
              name="room"
              min={1}
              className="w-25 outline-0"
              placeholder={options.room}
              onChange={(e) => handleOption("room", e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary rounded-0 w-100"
          onClick={() => getSearchHotels()}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchPopup;
