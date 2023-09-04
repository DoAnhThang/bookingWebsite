/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
// import detailData from "../data/detail";
import BookingForm from "../components/BookingForm";
import { SERVER_URL } from "../api";

function DetailPage({ isLogin, user }) {
  // scroll to top of component at the first time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const formRef = useRef();

  // state of hotel data
  const [hotel, setHotel] = useState({});
  const [booking, setBooking] = useState(false);

  // function fetch hotel data
  const getHotel = async () => {
    const res = await fetch(`${SERVER_URL}/detail/${params.hotelId}`);
    const data = await res.json();
    // console.log("hotel: ", data);
    if (!res.ok) {
      throw new Error("Could not fetch the hotel!");
    }

    setHotel(data);
    return;
  };
  useEffect(() => {
    getHotel();
  }, []);

  const bookNow = () => {
    if (!isLogin) alert("Please Log in or Sign up!");
    else {
      setBooking(true);
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <div>
          <h3 className="fw-bold">{hotel.name}</h3>
          <div className="fs-7 mb-3">
            <i className="fa fa-location-dot"></i>
            <span className="ms-2">{hotel.address}</span>
          </div>
          <h6 className="text-primary">
            Excellent location - {hotel.distance}m from center
          </h6>
          <h6 className="text-success mb-3">
            Book a stay over ${hotel.cheapestPrice} at this property and get a
            free airport taxi
          </h6>
        </div>
        <button
          className="btn btn-primary fw-semibold px-5 py-3 detail--reserve-top"
          style={{ height: "fit-content" }}
          onClick={bookNow}
        >
          Reserve or Book Now!
        </button>
      </div>

      <div className="row justify-content-between g-2">
        {hotel.photos &&
          hotel.photos.map((photo, i) => (
            <div key={i} className="col-6 col-md-4">
              <img
                src={photo}
                alt="hotel"
                className="w-100 h-100 cursor-pointer"
              />
            </div>
          ))}
      </div>

      <div className="row mx-0 justify-content-between gap-2 my-5 detail--desc">
        <div className="col-12 col-md-7">
          <h4 className="fw-bold">{hotel.title}</h4>
          <p className="lh-base">{hotel.desc}</p>
        </div>

        <div className="col-12 col-md-4 d-flex flex-column align-items-start justify-content-center bg-zumthor p-4">
          <h3>
            <strong>${hotel.cheapestPrice}</strong> (1 night)
          </h3>
          <button
            className="btn btn-primary fw-semibold w-100 py-3 detail--reserve-bottom"
            onClick={bookNow}
          >
            Reserve or Book Now!
          </button>
        </div>
      </div>

      <div ref={formRef}>{booking && <BookingForm user={user} />}</div>
    </div>
  );
}

export default DetailPage;
