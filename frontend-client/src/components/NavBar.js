import navBarData from "../data/navBar";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ isLogin, setIsLogin, user }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid text-white bg-darkBlue">
      <div className="container px-0 pb-4 pt-2">
        <div className="d-flex justify-content-between align-items-center gap-5 mb-4">
          <NavLink to="/" className="navbar-brand fw-bold fs-4">
            Booking
          </NavLink>

          {isLogin ? (
            <div className="d-flex justify-content-end align-items-center gap-2 navbar--logged-in">
              <span>{user.email}</span>
              <div className="d-flex flex-wrap justify-content-end gap-2 ms-2">
                <button
                  className="btn btn-light btn-sm rounded-0 text-primary"
                  onClick={() => navigate(`/transactions/${user._id}`)}
                >
                  Transactions
                </button>
                <button
                  className="btn btn-light btn-sm rounded-0 text-primary"
                  onClick={() => {
                    setIsLogin(false);
                    localStorage.removeItem("userInfo");
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-wrap justify-content-end gap-2">
              <button
                className="btn btn-light btn-sm rounded-0 text-primary"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="btn btn-light btn-sm rounded-0 text-primary"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          )}
        </div>

        <ul className="navbar justify-content-start gap-3 list-unstyled navbar__item">
          {navBarData.map((item) => (
            <li key={item.id} className="nav-item mb-1">
              <NavLink
                to="/"
                className={`text-white text-decoration-none p-2 ${
                  item.active && "border border-white rounded-pill"
                }`}
              >
                <i className={`fa ${item.icon} me-2`}></i>
                {item.type}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
