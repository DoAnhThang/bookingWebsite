import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import DetailPage from "./pages/Detail";
import MailRegister from "./components/MailRegister";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";

function App() {
  // set state of login
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setIsLogin(userInfo.isLogin);
      setUser(userInfo.user);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        isLogin={isLogin}
        setIsLogin={(value) => setIsLogin(value)}
        user={user}
        setUser={(value) => setUser(value)}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLogin={(value) => setIsLogin(value)}
              setUser={(value) => setUser(value)}
            />
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/detail/:hotelId"
          element={<DetailPage isLogin={isLogin} user={user} />}
        />
        <Route path="/transactions/:userId" element={<Transactions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <MailRegister />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
