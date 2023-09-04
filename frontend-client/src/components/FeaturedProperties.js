import { NavLink } from "react-router-dom";
// import hotelListData from "../data/hotel_list";

function FeaturedProperties({ data }) {
  return (
    <div className="row">
      {data.map((item) => (
        <div key={item._id} className="col-12 col-md-4 mb-4">
          <NavLink to={`/detail/${item._id}`}>
            <img src={item.photos[0]} alt={item.name} className="w-100 mb-2" />
            <h6 className="fw-bold">{item.name}</h6>
          </NavLink>

          <p className="mb-2">{item.city}</p>
          <h6 className="fw-bold">Starting from ${item.cheapestPrice}</h6>
          <span className="fw-bold me-2">Rating</span>
          <span className="fw-bold fs-7 text-white bg-darkBlue p-1">
            {item.rating.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProperties;
