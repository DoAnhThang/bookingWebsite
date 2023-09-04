import { NavLink, useNavigate } from "react-router-dom";

function SideBar({ isLogin, setIsLogin }) {
  const navigate = useNavigate();

  return (
    <ul className="list-unstyled text-secondary fs-7">
      <li className="mb-3">
        <p className="fw-semibold mb-2">MAIN</p>
        <ul className="list-unstyled ps-1">
          <li>
            <NavLink to="/" className="text-decoration-none">
              <i className="fa fa-th-large bg-iris text-white me-1"></i>
              <span className="text-dark">Dashboard</span>
            </NavLink>
          </li>
        </ul>
      </li>

      <li className="mb-3">
        <p className="fw-semibold mb-2">LISTS</p>
        <ul className="list-unstyled ps-1">
          <li className="mb-1">
            <NavLink to="/users" className="text-decoration-none">
              <i className="fa fa-user text-iris me-1"></i>
              <span className="text-dark">Users</span>
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink to="/hotels" className="text-decoration-none">
              <i className="fa fa-h-square text-iris me-1"></i>
              <span className="text-dark">Hotels</span>
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink to="/rooms" className="text-decoration-none">
              <i className="fa fa-credit-card text-iris me-1"></i>
              <span className="text-dark">Rooms</span>
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink to="/transactions" className="text-decoration-none">
              <i className="fa fa-truck text-iris me-1"></i>
              <span className="text-dark">Transactions</span>
            </NavLink>
          </li>
        </ul>
      </li>

      <li className="mb-3">
        <p className="fw-semibold mb-2">NEW</p>
        <ul className="list-unstyled ps-1">
          <li className="mb-1">
            <NavLink to="/add-hotel" className="text-decoration-none">
              <i className="fa fa-h-square text-iris me-1"></i>
              <span className="text-dark">New Hotel</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-room" className="text-decoration-none">
              <i className="fa fa-credit-card text-iris me-1"></i>
              <span className="text-dark">New Room</span>
            </NavLink>
          </li>
        </ul>
      </li>

      <li className="mb-3">
        <p className="fw-semibold mb-2">USER</p>

        {!isLogin ? (
          <NavLink to="/" className="text-decoration-none">
            <i className="fa fa-sign-in text-iris mx-1"></i>
            <span className="text-dark">Log in</span>
          </NavLink>
        ) : (
          <button
            className="btn text-start fs-7 border-0 p-0"
            onClick={() => {
              setIsLogin(false);
              localStorage.removeItem("adminInfo");
              navigate("/");
            }}
          >
            <i className="fa fa-sign-out text-iris mx-1"></i>
            <span className="text-dark">Log out</span>
          </button>
        )}
      </li>
    </ul>
  );
}

export default SideBar;
