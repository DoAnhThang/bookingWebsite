import { useEffect, useState } from "react";
import Header from "../components/Header";
import Featured from "../components/Featured";
import PropertyList from "../components/PropertyList";
import FeaturedProperties from "../components/FeaturedProperties";
import { SERVER_URL } from "../api";

function HomePage() {
  const [hotels, setHotels] = useState({
    hotelByCity: [],
    propertyByType: [],
    hotelByRating: [],
  });

  const getHotels = async () => {
    const res = await fetch(`${SERVER_URL}/hotels`);
    const data = await res.json();
    // console.log("getHotels: ", data);
    if (!res.ok) {
      throw new Error("Could not fetch hotels information!");
    }
    setHotels(data);
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="container mt-5 mb-4">
          <Featured data={hotels.hotelByCity} />

          <h4 className="fw-bold mb-4">Browse by property type</h4>
          <PropertyList data={hotels.propertyByType} />

          <h4 className="fw-bold mb-4">Homes guests love</h4>
          <FeaturedProperties data={hotels.hotelByRating} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
