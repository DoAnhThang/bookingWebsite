import SideBar from "./SideBar";

function Wrapper({ children, isLogin, setIsLogin }) {
  return (
    <div className="container-fluid">
      <div className="row border-bottom">
        <h6 className="col-md-2 col-3 text-iris fw-bold text-center py-3 mb-0">
          Admin Page
        </h6>
        <div className="col-md-10 col-9 border-start"></div>
      </div>

      <div className="row" style={{ height: "94vh" }}>
        <div className="col-md-2 col-3 py-3">
          <SideBar
            isLogin={isLogin}
            setIsLogin={(value) => setIsLogin(value)}
          />
        </div>
        <div className="col-md-10 col-9 border-start p-3">{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
