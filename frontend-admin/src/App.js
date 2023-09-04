import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wrapper from "./components/Wrapper";
import PageNotFound from "./components/PageNotFound";

import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import HotelsList from "./pages/HotelsList";
import RoomsList from "./pages/RoomsList";
import TransactionsList from "./pages/TransactionsList";
import AddHotel from "./pages/AddHotel";
import AddRoom from "./pages/AddRoom";
import Login from "./pages/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    if (adminInfo) setIsLogin(adminInfo.isLogin);
  }, []);

  return (
    <BrowserRouter>
      <Wrapper isLogin={isLogin} setIsLogin={(value) => setIsLogin(value)}>
        <Routes>
          {isLogin ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/hotels" element={<HotelsList />} />
              <Route
                path="/edit-hotel/:hotelId"
                element={<AddHotel edit={true} />}
              />
              <Route path="/rooms" element={<RoomsList />} />
              <Route
                path="/edit-room/:roomId"
                element={<AddRoom edit={true} />}
              />
              <Route path="/transactions" element={<TransactionsList />} />
              <Route path="/add-hotel" element={<AddHotel edit={false} />} />
              <Route path="/add-room" element={<AddRoom edit={false} />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <Route
              path="/"
              element={<Login setIsLogin={(value) => setIsLogin(value)} />}
            />
          )}
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
