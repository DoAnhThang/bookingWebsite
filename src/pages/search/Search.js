import React from "react";
import "./Search.css";
import NavBar from "../home/NavBar";
import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";
import RegisterForm from "../home/RegisterForm";
import Footer from "../home/Footer";

const Search = () => {
  return (
    <div>
      <NavBar />
      <div className="search-page">
        <SearchPopup />
        <SearchList />
      </div>
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Search;
