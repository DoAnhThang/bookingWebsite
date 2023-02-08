import React from "react";
import Cities from "./Cities";
import HotelTypes from "./HotelTypes";
import Hotels from "./Hotels";

function HotelList() {
  return (
    <div>
      <Cities />
      <HotelTypes />
      <Hotels />
    </div>
  );
}

export default HotelList;
