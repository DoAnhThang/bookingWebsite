import { useState, useEffect } from "react";
import { SERVER_URL } from "../api";

function UsersList() {
  const [usersList, setUsersList] = useState(null);

  const getUsersList = async () => {
    const res = await fetch(`${SERVER_URL}/admin/users-list`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Could not fetch users list!");
    }
    // console.log("getUsersList: ", data);
    setUsersList(data);
  };
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="text-secondary">Users List</h5>
        <button className="btn btn-outline-success btn-sm">Add New</button>
      </div>

      <div className="table-responsive">
        <table className="table fs-7 border align-middle mt-3 mb-0">
          <thead>
            <tr className="fw-semibold align-middle">
              <td>
                <input type="checkbox" className="form-check-input fs-6 mt-0" />
              </td>
              <td>ID</td>
              <td>Username</td>
              <td>Full Name</td>
              <td>Email</td>
              <td>Phone Number</td>
              <td>Amount of transactions</td>
              <td>Is Admin</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {usersList &&
              usersList.map((user) => (
                <tr key={user._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input fs-6 mt-0"
                    />
                  </td>
                  <td className="text-break" style={{ minWidth: "65px" }}>
                    {user._id}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.amountOfTransactions}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm me-3">
                      Delete
                    </button>
                    <button className="btn btn-outline-warning btn-sm">
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
          1-{usersList && usersList.length} of {usersList && usersList.length}
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

export default UsersList;
