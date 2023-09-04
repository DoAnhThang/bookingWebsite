/* eslint-disable no-restricted-globals */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../api";

function RoomsList() {
  const navigate = useNavigate();
  const [roomsList, setRoomsList] = useState(null);

  const getRoomsList = async () => {
    const res = await fetch(`${SERVER_URL}/admin/rooms-list`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not fetch rooms list!");
    }
    // console.log("getRoomsList: ", data);
    setRoomsList(data);
  };
  useEffect(() => {
    getRoomsList();
  }, []);

  const postDeleteRoom = async (id) => {
    const res = await fetch(`${SERVER_URL}/admin/delete-room`, {
      method: "POST",
      body: JSON.stringify({ roomId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not delete room!");
    }

    if (data.message === "ok") getRoomsList();
    else alert(data.message);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="text-secondary">Rooms List</h5>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => navigate("/add-room")}
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
              <td>Title</td>
              <td>Description</td>
              <td>Room Numbers</td>
              <td>Price</td>
              <td>Max People</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {roomsList &&
              roomsList.map((room) => (
                <tr key={room._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input fs-6 mt-0"
                    />
                  </td>
                  <td className="text-break" style={{ minWidth: "65px" }}>
                    {room._id}
                  </td>
                  <td>{room.title}</td>
                  <td>{room.desc}</td>
                  <td>{room.roomNumbers.join(", ")}</td>
                  <td>${room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm me-3"
                      onClick={() => {
                        if (confirm("Are you sure want to delete this room?")) {
                          postDeleteRoom(room._id);
                        } else return;
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => navigate(`/edit-room/${room._id}`)}
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
          1-{roomsList && roomsList.length} of {roomsList && roomsList.length}
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

export default RoomsList;
