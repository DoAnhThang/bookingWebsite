/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SERVER_URL } from "../api";

import SearchPopup from "../components/SearchPopup";
import SearchList from "../components/SearchList";

function SearchPage() {
  const location = useLocation();

  // destination want to search
  const [destination, setDestination] = useState(location.state.destination);

  // time period want to search
  const [date, setDate] = useState(location.state.date);
  // console.log("date: ", date);
  const [openDate, setOpenDate] = useState(false);

  // person quantity to order room
  const [options, setOptions] = useState(location.state.options);

  // state of search result
  const [searchResult, setSearchResult] = useState([]);

  const getSearchHotels = async () => {
    const res = await fetch(
      `${SERVER_URL}/search?city=${destination}&startDate=${date[0].startDate.toLocaleDateString(
        "en-CA"
      )}&endDate=${date[0].endDate.toLocaleDateString("en-CA")}&roomQty=${
        options.room
      }&personQty=${parseInt(options.adult) + parseInt(options.children)}`
    );
    const data = await res.json();
    // console.log("searchResult: ", data);
    if (!res.ok) {
      throw new Error("Could not search hotels!");
    }
    setSearchResult(data);
    return null;
  };
  useEffect(() => {
    getSearchHotels();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container mt-5 mb-4">
        <div className="row gx-5 gy-3">
          <SearchPopup
            destination={destination}
            setDestination={(value) => setDestination(value)}
            date={date}
            setDate={(value) => setDate(value)}
            openDate={openDate}
            setOpenDate={() => setOpenDate(!openDate)}
            options={options}
            setOptions={(value) => setOptions(value)}
            getSearchHotels={() => getSearchHotels()}
          />
          <SearchList searchResult={searchResult} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
