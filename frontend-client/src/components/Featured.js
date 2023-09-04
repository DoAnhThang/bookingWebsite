import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import cityData from "../data/city";

function Featured({ data }) {
  const navigate = useNavigate();

  return (
    <div className="row mx-0 text-white">
      {data.map((item) => (
        <div
          className="col-12 col-md-4 cursor-pointer"
          key={item.city}
          onClick={() =>
            navigate("/search", {
              state: {
                destination: item.city,
                date: [
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                  },
                ],
                options: {
                  adult: 1,
                  children: 0,
                  room: 1,
                },
              },
            })
          }
        >
          <img
            src={item.imageUrl}
            alt={item.city}
            className="w-100 rounded-4"
          ></img>
          <div style={{ transform: "translate(10%, -130%)" }}>
            <h3 className="fw-bolder mb-0">{item.city}</h3>
            <h5 className="fw-bolder mb-0">{item.hotelQty} properties</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Featured;
