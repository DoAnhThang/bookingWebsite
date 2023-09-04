/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../api";

import { DateRange } from "react-date-range";
// import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function BookingForm({ user }) {
  const params = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [cardNumber, setCardNumber] = useState(user.phoneNumber);
  const [payment, setPayment] = useState("Select Payment Method");

  const [availableRooms, setAvailableRooms] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [bookedRooms, setBookedRooms] = useState([]);

  // get available rooms
  const getAvailableRooms = useCallback(async () => {
    const res = await fetch(
      `${SERVER_URL}/available-rooms/${
        params.hotelId
      }?startDate=${date[0].startDate.toLocaleDateString(
        "en-CA"
      )}&endDate=${date[0].endDate.toLocaleDateString("en-CA")}`
    );
    const data = await res.json();
    // console.log("rooms: ", data.rooms);
    if (!res.ok) {
      throw new Error("Could not fetch available rooms!");
    }
    setAvailableRooms(data.rooms);
  }, [date]);

  useEffect(() => {
    if (date[0].startDate !== date[0].endDate) {
      getAvailableRooms();
    }
  }, [date]);

  // update total bill when change checkbox
  const handleCheckboxChange = (event, rId, r) => {
    const { value, checked } = event.target;
    const price = parseInt(value);

    if (checked) {
      setTotalBill(totalBill + price);
      const roomIndex = bookedRooms.findIndex((room) => room.roomId === rId);
      if (roomIndex >= 0) {
        setBookedRooms((prevRooms) => {
          const updatedRooms = [...prevRooms];
          const updatedRoomNums = {
            ...prevRooms[roomIndex],
            roomNums: [...prevRooms[roomIndex].roomNums, r],
          };
          updatedRooms[roomIndex] = updatedRoomNums;
          return updatedRooms;
        });
      } else {
        setBookedRooms((prevRooms) => [
          ...prevRooms,
          { roomId: rId, roomNums: [r] },
        ]);
      }
    } else {
      setTotalBill(totalBill - price);
      const roomIndex = bookedRooms.findIndex((room) => room.roomId === rId);
      setBookedRooms((prevRooms) => {
        const updatedRooms = [...prevRooms];
        const updatedRoomNums = {
          ...prevRooms[roomIndex],
          roomNums: [
            ...prevRooms[roomIndex].roomNums.filter((room) => room !== r),
          ],
        };
        if (updatedRoomNums.roomNums.length === 0) {
          updatedRooms.splice(roomIndex, 1);
        } else updatedRooms[roomIndex] = updatedRoomNums;
        return updatedRooms;
      });
    }
  };

  // post transaction
  const postTransaction = async () => {
    const res = await fetch(`${SERVER_URL}/create-transaction`, {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        hotel: params.hotelId,
        room: bookedRooms,
        dateStart: date[0].startDate.toLocaleDateString("en-CA"),
        dateEnd: date[0].endDate.toLocaleDateString("en-CA"),
        price:
          totalBill *
          ((date[0].endDate - date[0].startDate) / (1000 * 3600 * 24)),
        payment: payment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Could not fetch available rooms!");
    }
  };

  const handleCreateTransaction = () => {
    if (date[0].startDate === date[0].endDate) {
      alert("Please select the date range you want to stay!");
    } else if (!fullName || !email || !phoneNumber || !cardNumber) {
      alert("Please enter all reserve information!");
    } else if (bookedRooms.length === 0) {
      alert("Please select rooms!");
    } else if (payment === "Select Payment Method") {
      alert("Please select a payment method!");
    } else {
      postTransaction();
      navigate(`/transactions/${user._id}`);
    }
  };

  return (
    <>
      <div className="row justify-content-between mb-3">
        <div className="col-4">
          <h4 className="fw-bold">Dates</h4>
          <DateRange
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            ranges={date}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
          />
        </div>

        <div className="col-12 col-sm-4 col-md-6 col-lg-7 col-xl-8">
          <h4 className="fw-bold">Reserve Info</h4>
          <form>
            <label className="mb-1" htmlFor="fullName">
              Your Full Name:
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="form-control fs-7 p-3 mb-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="mb-1" htmlFor="email">
              Your Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control fs-7 p-3 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="mb-1" htmlFor="phoneNumber">
              Your Phone Number:
            </label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              className="form-control fs-7 p-3 mb-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <label className="mb-1" htmlFor="cardNumber">
              Your Identity Card Number:
            </label>
            <input
              type="number"
              name="cardNumber"
              placeholder="Card Number"
              className="form-control fs-7 p-3 mb-2"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="fw-bold mb-3">Select Rooms</h4>
        <div className="row gx-5">
          {availableRooms.length > 0 ? (
            availableRooms.map((room) => (
              <div
                className="col-12 col-sm-6 col-lg-4 d-flex justify-content-between gap-3"
                key={room._id}
              >
                <div className="mb-2">
                  <h5 className="fw-semibold mb-0">{room.title}</h5>
                  <p className="mb-0">{room.desc}</p>
                  <p className="fs-7 fw-semibold mb-0">
                    Max people:{" "}
                    <strong className="fs-7">{room.maxPeople}</strong>
                  </p>
                  <h5>${room.price}</h5>
                </div>

                <div className="d-flex justify-content-between">
                  {room.roomNumbers.map((r) => (
                    <div
                      className="form-check form-check-inline d-flex flex-column align-items-center justify-content-center fs-7 me-0 ps-3"
                      key={`${room._id}/${r}`}
                    >
                      <label className="form-check-label">{r}</label>
                      <input
                        type="checkbox"
                        className="form-check-input ms-0"
                        value={room.price}
                        onChange={(event) =>
                          handleCheckboxChange(event, room._id, r)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <h6 className="ms-3">No available rooms!</h6>
          )}
        </div>
      </div>

      <h4 className="fw-bold">
        Total Bill: $
        {totalBill *
          ((date[0].endDate - date[0].startDate) / (1000 * 3600 * 24))}
      </h4>
      <div className="d-flex flex-wrap gap-3">
        <select
          className="form-select bg-light w-25 p-3"
          style={{ minWidth: "15rem" }}
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option defaultValue disabled>
            Select Payment Method
          </option>
          <option value="Credit Card">Credit Card</option>
          <option value="Cash">Cash</option>
        </select>

        <button
          className="btn btn-primary fw-bold py-3 px-5"
          onClick={handleCreateTransaction}
        >
          Reserve Now
        </button>
      </div>
    </>
  );
}

export default BookingForm;
