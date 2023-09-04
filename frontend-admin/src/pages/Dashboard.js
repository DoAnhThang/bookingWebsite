import { useState, useEffect } from "react";
import { SERVER_URL } from "../api";

function Dashboard() {
  const [infoBoard, setInfoBoard] = useState({});
  const [lastestTransactions, setLastestTransactions] = useState(null);

  const getDashboard = async () => {
    const res = await fetch(`${SERVER_URL}/admin/dashboard`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not fetch dashboard!");
    }
    // console.log("getDashboard: ", data);
    setInfoBoard(data.infoBoard);
    setLastestTransactions(data.lastestTransactions);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <>
      <div
        className="d-grid justify-content-between gap-3 dashboard--summary"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        <div className="shadow bg-body rounded p-2">
          <h6 className="fs-7 fw-semibold text-secondary">USERS</h6>
          <p className="fs-3 mb-0">{infoBoard.users ? infoBoard.users : 0}</p>
          <i className="fa fa-user fs-7 text-danger bg-lightRed rounded-1 float-end p-2"></i>
        </div>

        <div className="shadow bg-body rounded p-2">
          <h6 className="fs-7 fw-semibold text-secondary">ORDERS</h6>
          <p className="fs-3 mb-0">{infoBoard.orders ? infoBoard.orders : 0}</p>
          <i className="fa fa-shopping-cart fs-7 text-warning bg-lightYellow rounded-1 float-end p-2"></i>
        </div>

        <div className="shadow bg-body rounded p-2">
          <h6 className="fs-7 fw-semibold text-secondary">EARNINGS</h6>
          <p className="fs-3 mb-0">
            <i className="fa fa-usd fs-3 fw-normal"></i>{" "}
            {infoBoard.earnings ? infoBoard.earnings : 0}
          </p>
          <i className="fa fa-usd fs-7 text-success bg-lightGreen rounded-1 float-end p-2"></i>
        </div>

        <div className="shadow bg-body rounded p-2">
          <h6 className="fs-7 fw-semibold text-secondary">BALANCE</h6>
          <p className="fs-3 mb-0">
            <i className="fa fa-usd fs-3 fw-normal"></i> 100
          </p>
          <i className="fa fa-balance-scale fs-7 text-purple bg-lightPurple rounded-1 float-end p-2"></i>
        </div>
      </div>

      <div className="shadow bg-body rounded p-4 mt-2rem">
        <h5 className="text-secondary">Lastest Transactions</h5>

        <div className="table-responsive">
          <table className="table fs-7 border align-middle mb-0">
            <thead>
              <tr className="fw-semibold align-middle">
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input fs-6 mt-0"
                  />
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
              {lastestTransactions &&
                lastestTransactions.map((tran) => (
                  <tr key={tran._id}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input fs-6 mt-0"
                      />
                    </td>
                    <td className="text-break" style={{ minWidth: "65px" }}>
                      {tran.userId._id}
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
            1-{lastestTransactions && lastestTransactions.length} of{" "}
            {lastestTransactions && lastestTransactions.length}
          </p>
          <button className="btn border-0 fs-7 p-0 mx-3 my-2" disabled>
            <i className="fa fa-angle-left text-secondary"></i>
          </button>
          <button className="btn border-0 fs-7 p-0 mx-3 my-2" disabled>
            <i className="fa fa-angle-right text-secondary"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
