/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../api";

const initValues = {
  name: "",
  type: "",
  city: "",
  address: "",
  distance: "",
  title: "",
  desc: "",
  cheapestPrice: "",
  photos: "",
  featured: false,
};

function AddHotel({ edit }) {
  const navigate = useNavigate();
  const params = useParams();

  const [formValues, setFormValues] = useState(initValues);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomsList, setRoomsList] = useState(null);

  // delete all fields when switch from edit to add mode
  useEffect(() => {
    if (!edit) {
      setFormValues(initValues);
      setRoomTypes([]);
    }
  }, [edit]);

  // get rooms list to add to new hotel
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRoomType = (event) => {
    const value = event.target.value;
    if (roomTypes.includes(value)) {
      setRoomTypes(roomTypes.filter((type) => type !== value));
    } else {
      setRoomTypes([...roomTypes, value]);
    }
  };

  // post add or edit hotel
  const postNewHotel = async () => {
    const res = await fetch(
      `${SERVER_URL}/admin/${edit ? "edit" : "add"}-hotel`,
      {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
          rooms: roomTypes,
          hotelId: `${edit ? params.hotelId : null}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Could not ${edit ? "edit" : "add"} hotel!`);
    }
  };

  // get hotel information need to edit
  const getEditHotel = async () => {
    const res = await fetch(`${SERVER_URL}/admin/edit-hotel/${params.hotelId}`);
    const data = await res.json();
    // console.log("getEditHotel: ", data);
    if (!res.ok) {
      throw new Error("Could not fetch hotel!");
    }
    if (!data) {
      alert("This hotel does not exist!");
      navigate("/hotels");
    }
    setFormValues({ ...data, photos: data.photos.join(",") });
    setRoomTypes(data.rooms);
  };
  useEffect(() => {
    if (edit) {
      getEditHotel();
    }
  }, [edit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (roomTypes.length === 0) {
      alert("Please select the hotel room type!");
    } else {
      // console.log({ ...formValues, rooms: roomTypes });
      postNewHotel();
      navigate("/hotels");
    }
  };

  return (
    <>
      <h5 className="text-secondary shadow bg-body rounded p-4">
        {edit ? "Edit Hotel" : "Add New Hotel"}
      </h5>

      <form
        className="fs-7 fw-semibold shadow bg-body rounded mt-3 add-hotel--form"
        style={{ padding: "3rem" }}
        onSubmit={handleSubmit}
      >
        <div className="row justify-content-between">
          <div className="col-12 col-md-6">
            <label className="d-block mb-4">
              Name
              <input
                type="text"
                name="name"
                placeholder="My Hotel"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              City
              <input
                type="text"
                name="city"
                placeholder="New York"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.city}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Distance from City Center
              <input
                type="number"
                name="distance"
                placeholder="500"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.distance}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Description
              <input
                type="text"
                name="desc"
                placeholder="description"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.desc}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Images
              <textarea
                type="text"
                name="photos"
                placeholder="give comma (',') between image's links"
                className="d-block outline-0 w-100 px-2"
                style={{ height: "5rem" }}
                value={formValues.photos}
                onChange={handleChange}
                required
              ></textarea>
            </label>
          </div>

          <div className="col-12 col-md-5">
            <label className="d-block mb-4">
              Type
              <input
                type="text"
                name="type"
                placeholder="hotel"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.type}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Address
              <input
                type="text"
                name="address"
                placeholder="elton st,216"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.address}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Title
              <input
                type="text"
                name="title"
                placeholder="The best Hotel"
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
                name="cheapestPrice"
                placeholder="100"
                className="d-block border-0 border-bottom border-2 shadow-sm outline-0 w-100 px-2"
                value={formValues.cheapestPrice}
                onChange={handleChange}
                required
              />
            </label>
            <label className="d-block mb-4">
              Featured
              <select
                name="featured"
                className="d-block outline-0 w-100 px-2"
                value={formValues.featured}
                onChange={handleChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </label>
          </div>
        </div>

        <p className="mb-1">Rooms</p>
        <div className="d-flex flex-wrap rg-1 fw-normal">
          {roomsList &&
            roomsList.map((room) => (
              <label
                className="d-inline-block cursor-pointer me-5"
                key={room._id}
              >
                <input
                  type="checkbox"
                  value={room._id}
                  checked={roomTypes.some((r) => r === room._id)}
                  onChange={handleRoomType}
                  className="form-check-input fs-6 mt-0 me-2"
                />
                {room.title}
              </label>
            ))}
        </div>

        <button
          type="submit"
          className="btn btn-success btn-sm rounded-0 px-5 mt-4"
        >
          {edit ? "Update Hotel" : "Send"}
        </button>
      </form>
    </>
  );
}

export default AddHotel;
