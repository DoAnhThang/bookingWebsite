import React from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import HotelList from "./HotelList";
import RegisterForm from "./RegisterForm";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <HotelList />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Home;
