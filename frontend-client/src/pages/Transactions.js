/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../api";

function Transactions() {
  const params = useParams();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const res = await fetch(
      `${SERVER_URL}/transactions?userId=${params.userId}`
    );
    const data = await res.json();
    // console.log("transactions: ", data);
    if (!res.ok) {
      throw new Error("Could not fetch available rooms!");
    }
    setTransactions(data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="container my-5">
      <h4 className="fw-bold">Your Transactions</h4>

      <div className="table-responsive">
        <table className="table table-striped table-bordered transactions--item">
          <thead>
            <tr className="text-white bg-cerulean">
              <th scope="col">#</th>
              <th scope="col">Hotel</th>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((tran, index) => (
                <tr key={tran._id} className="">
                  <td>
                    {index < 10 ? "0" : ""}
                    {index + 1}
                  </td>
                  <td>{tran.hotel.name}</td>
                  <td>
                    {tran.room
                      .map((r) => r.roomNums)
                      .flat()
                      .join(", ")}
                  </td>
                  <td>
                    {tran.dateStart.split("-").reverse().join("/")} -{" "}
                    {tran.dateEnd.split("-").reverse().join("/")}
                  </td>
                  <td>${tran.price}</td>
                  <td>{tran.payment}</td>
                  <td>
                    <span
                      className={`text-success rounded-1 p-1 ${
                        tran.status === "Booked"
                          ? "bg-lightCoral"
                          : tran.status === "Checkin"
                          ? "bg-limeGreen"
                          : "bg-lavender"
                      }`}
                    >
                      {tran.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
