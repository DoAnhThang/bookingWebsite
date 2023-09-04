import { useState, useEffect } from "react";
import { SERVER_URL } from "../api";

function TransactionsList() {
  const [transactionsList, setTransactionsList] = useState(null);

  const getTransactionsList = async () => {
    const res = await fetch(`${SERVER_URL}/admin/transactions-list`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not fetch transactions list!");
    }
    // console.log("getTransactionsList: ", data);
    setTransactionsList(data);
  };
  useEffect(() => {
    getTransactionsList();
  }, []);

  return (
    <>
      <h5 className="text-secondary">Transactions List</h5>

      <div className="table-responsive">
        <table className="table fs-7 border align-middle mb-0">
          <thead>
            <tr className="fw-semibold align-middle">
              <td>
                <input type="checkbox" className="form-check-input fs-6 mt-0" />
              </td>
              <td>ID</td>
              <td style={{ width: "12%" }}>User</td>
              <td>Hotel</td>
              <td>Room</td>
              <td>Date</td>
              <td>Price</td>
              <td>Payment Method</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {transactionsList &&
              transactionsList.map((tran) => (
                <tr key={tran._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input fs-6 mt-0"
                    />
                  </td>
                  <td className="text-break" style={{ minWidth: "65px" }}>
                    {tran._id}
                  </td>
                  <td>{tran.userId.username}</td>
                  <td style={{ minWidth: "70px" }}>{tran.hotel.name}</td>
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

      <div className="border-start border-end py-4"></div>
      <div className="text-end fs-7 border">
        <p className="d-inline mb-0 me-3">
          1-{transactionsList && transactionsList.length} of{" "}
          {transactionsList && transactionsList.length}
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

export default TransactionsList;
