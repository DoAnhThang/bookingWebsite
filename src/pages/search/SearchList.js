import React from "react";
import SearchListItem from "./SearchListItem";
import searchData from "../../data/search"; // use JSON file data available

function SearchList() {
  return <SearchListItem items={searchData} />;
}

export default SearchList;
