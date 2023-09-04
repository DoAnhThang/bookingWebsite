import { Link } from "react-router-dom";
// import searchData from "../data/search";

function SearchList({ searchResult }) {
  // console.log(searchResult);
  return (
    <div className="col-12 col-lg-9 mb-2">
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <div
            key={item._id}
            className="row gy-0 border border-secondary rounded py-3 mb-3"
          >
            <div className="col-12 col-sm-4">
              <Link to={`/detail/${item._id}`} className="text-decoration-none">
                <img
                  src={`${item.photos[0]}`}
                  alt={`${item.name}`}
                  className="w-100"
                  style={{ height: "210px" }}
                />
              </Link>
            </div>

            <div className="col-12 col-sm-5 searched-info">
              <Link to={`/detail/${item._id}`} className="text-decoration-none">
                <h5 className="fw-bold text-primary">{item.name}</h5>
              </Link>
              <p className="fs-7 fw-semibold mb-2">
                {item.distance}m from center
              </p>
              {/* <p className="fs-7 text-white bg-success rounded-2 w-fit p-1">
                {item.tag}
              </p> */}

              {item.rooms.map((room) => (
                <h6 className="fs-7 fw-bold" key={room._id}>
                  <span className="text-success">✔</span> {room.title} (
                  <span className="fw-semibold lh-sm mb-2">{room.desc}</span>)
                </h6>
              ))}

              {/* {item.free_cancel && (
                <>
                  <h6 className="fs-7 fw-bold text-success">
                    Free cancellation
                  </h6>
                  <p className="fs-7 fw-semibold text-success mb-0">
                    You can cancel later, so lock in this great price today!
                  </p>
                </>
              )} */}
            </div>

            <div className="col-12 col-sm-3 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-end align-items-center">
                {/* <h6 className="fw-bold">{item.rate_text}</h6> */}
                <h6 className="fs-7 fw-bold text-white bg-darkBlue p-1">
                  {item.rating.toFixed(1)}
                </h6>
              </div>
              <div className="d-flex flex-column justify-content-end align-items-end">
                <h2>
                  <span className="fs-7 text-secondary">Price just from</span> $
                  {item.cheapestPrice}
                </h2>
                <p className="fs-7 text-secondary mb-2">
                  Includes taxes and fees
                </p>
                <button className="btn btn-primary w-100 fw-semibold">
                  See availability
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h5 className="text-center my-5">No result!</h5>
      )}
    </div>
  );
}

export default SearchList;
