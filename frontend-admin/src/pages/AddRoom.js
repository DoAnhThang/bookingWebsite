/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../api";

const initValues = {
  title: "",
  desc: "",
  price: "",
  maxPeople: "",
  roomNumbers: "",
};

function AddRoom({ edit }) {
  const navigate = useNavigate();
  const params = useParams();

  const [formValues, setFormValues] = useState(initValues);
  const [roomOfWhichHotel, setRoomOfWhichHotel] = useState([]);
  const [hotelsList, setHotelsList] = useState(null);

  // delete all fields when switch from edit to add mode
  useEffect(() => {
    if (!edit) {
      setFormValues(initValues);
    }
  }, [edit]);

  // get hotels list to choose a hotel will be added new room type
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRoomOfWhichHotel = (event) => {
    const value = event.target.value;
    if (roomOfWhichHotel.includes(value)) {
      setRoomOfWhichHotel(roomOfWhichHotel.filter((type) => type !== value));
    } else {
      setRoomOfWhichHotel([...roomOfWhichHotel, value]);
    }
  };

  // post add or edit room
  const postNewRoom = async () => {
    const res = await fetch(
      `${SERVER_URL}/admin/${edit ? "edit" : "add"}-room`,
      {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
          roomOfWhichHotel: roomOfWhichHotel,
          roomId: `${edit ? params.roomId : null}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Could not ${edit ? "edit" : "add"} room!`);
    }
  };

  // get room information need to edit
  const getEditRoom = async () => {
    const res = await fetch(`${SERVER_URL}/admin/edit-room/${params.roomId}`);
    const data = await res.json();
    // console.log("getEditRoom: ", data);
    if (!res.ok) {
      throw new Error("Could not fetch room!");
    }
    if (!data) {
      alert("This room does not exist!");
      navigate("/rooms");
    }
    setFormValues({ ...data, roomNumbers: data.roomNumbers.join(",") });
    setRoomOfWhichHotel(data.hotelIds);
  };
  useEffect(() => {
    if (edit) {
      getEditRoom();
    }
  }, [edit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValues.roomOfHotel === "Choose hotel") {
      alert("Please select the hotel containing the rooms!");
    } else {
      // console.log({ ...formValues });
      postNewRoom();
      navigate("/rooms");
    }
  };

  return (
    <>
      <h5 className="text-secondary shadow bg-body rounded-1 p-4">
        {edit ? "Edit Room" : "Add New Room"}
      </h5>

      <form
        className="fs-7 fw-semibold shadow bg-body rounded-1 mt-3 add-room--form"
        style={{ padding: "3rem" }}
        onSubmit={handleSubmit}
      >
        <div className="row justify-content-between">
          <div className="col-12 col-md-6">
            <label className="d-block mb-4">
              Title
              <input
                type="text"
                name="title"
                placeholder="2 bed room"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.title}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Price
              <input
                type="number"
                name="price"
                placeholder="100"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.price}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Rooms
              <textarea
                type="text"
                name="roomNumbers"
                placeholder="give comma (',') between room numbers"
                className="d-block outline-0 w-100 px-2"
                style={{ height: "5rem" }}
                value={formValues.roomNumbers}
                onChange={handleChange}
                required
              ></textarea>
            </label>
          </div>

          <div className="col-12 col-md-5">
            <label className="d-block mb-4">
              Description
              <input
                type="text"
                name="desc"
                placeholder="King size bed, 1 bathroom"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.desc}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Max People
              <input
                type="number"
                name="maxPeople"
                placeholder="2"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.maxPeople}
                onChange={handleChange}
                required
              />
            </label>

            <div>
              <p className="mb-0">Choose hotel</p>
              <div
                className="border fw-normal p-2"
                style={{ overflowY: "scroll", height: "5rem" }}
              >
                {hotelsList &&
                  hotelsList.map((hotel) => (
                    <label
                      className="d-block cursor-pointer mb-1"
                      key={hotel._id}
                    >
                      <input
                        type="checkbox"
                        value={hotel._id}
                        checked={roomOfWhichHotel.some((r) => r === hotel._id)}
                        onChange={handleRoomOfWhichHotel}
                        className="form-check-input fs-6 mt-0 me-2"
                      />
                      {hotel.name}
                    </label>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-success btn-sm rounded-0 px-5 mt-4"
        >
          {edit ? "Update Room" : "Send"}
        </button>
      </form>
    </>
  );
}

export default AddRoom;
