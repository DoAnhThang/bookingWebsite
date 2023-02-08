import React from "react";
import "./Detail.css";
import NavBar from "../home/NavBar";
import RegisterForm from "../home/RegisterForm";
import Footer from "../home/Footer";
import detailData from "../../data/detail"; // use JSON file data available

const Detail = () => {
  return (
    <div>
      <NavBar />

      <div className="detail-container">
        <div className="detail-first">
          <div>
            <h2>{detailData.name}</h2>
            <p className="detail__address">
              <i className="fa fa-map-marker"></i>
              &nbsp;&nbsp;{detailData.address}
            </p>
            <p className="detail__distance">{detailData.distance}</p>
            <p className="detail__price">{detailData.price}</p>
          </div>
          <button type="button" className="detail__reserve">
            Reserve or Book Now!
          </button>
        </div>

        <div className="detail__photos">
          {detailData.photos.map((data) => (
            <img src={`${data}`} alt={`${detailData.name}`}></img>
          ))}
        </div>

        <div className="detail-second">
          <div>
            <h3>{detailData.title}</h3>
            <p className="detail__description">{detailData.description}</p>
          </div>
          <div className="detail__9night">
            <h4>Perfect for a 9-night stay!</h4>
            <p className="detail__description">
              Located in te real of heart of Krakow, this property has an
              excellent location score of 9.8!
            </p>
            <p className="detail__9night-price">
              <span>${detailData.nine_night_price}</span> (9 nights)
            </p>
            <button type="button" className="detail__reserve">
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>

      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Detail;
