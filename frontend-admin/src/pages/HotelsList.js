/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../api";

function HotelsList() {
  const navigate = useNavigate();
  const [hotelsList, setHotelsList] = useState(null);

  const getHotelsList = async () => {
    const res = await fetch(`${SERVER_URL}/admin/hotels-list`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not fetch hotels list!");
    }
    // console.log("getHotelsList: ", data);
    setHotelsList(data);
  };
  useEffect(() => {
    getHotelsList();
  }, []);

  const postDeleteHotel = async (id) => {
    const res = await fetch(`${SERVER_URL}/admin/delete-hotel`, {
      method: "POST",
      body: JSON.stringify({ hotelId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not delete hotel!");
    }

    if (data.message === "ok") getHotelsList();
    else alert(data.message);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="text-secondary">Hotels List</h5>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => navigate("/add-hotel")}
        >
          Add New
        </button>
      </div>

      <div className="table-responsive">
        <table className="table fs-7 border align-middle mt-3 mb-0">
          <thead>
            <tr className="fw-semibold align-middle">
              <td>
                <input type="checkbox" className="form-check-input fs-6 mt-0" />
              </td>
              <td>ID</td>
              <td>Name</td>
              <td>Type</td>
              <td>Title</td>
              <td>City</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {hotelsList &&
              hotelsList.map((hotel) => (
                <tr key={hotel._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input fs-6 mt-0"
                    />
                  </td>
                  <td className="text-break" style={{ minWidth: "65px" }}>
                    {hotel._id}
                  </td>
                  <td>{hotel.name}</td>
                  <td>{hotel.type}</td>
                  <td>{hotel.title}</td>
                  <td>{hotel.city}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => {
                        if (
                          confirm("Are you sure want to delete this hotel?")
                        ) {
                          postDeleteHotel(hotel._id);
                        } else return;
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => navigate(`/edit-hotel/${hotel._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="border-start border-end py-4"></div>
      <div className="text-end fs-7 border">
        <p className="d-inline mb-0 me-3">
          1-{hotelsList && hotelsList.length} of{" "}
          {hotelsList && hotelsList.length}
        </p>
        <button className="btn border-0 fs-7 p-0 mx-3 my-2" disabled>
          <i className="fa fa-angle-left text-secondary"></i>
        </button>
        <button className="btn border-0 fs-7 p-0 mx-3 my-2" disabled>
          <i className="fa fa-angle-right text-secondary"></i>
        </button>
      </div>
    </>
  );
}

export default HotelsList;
