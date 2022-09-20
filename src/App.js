import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "./hooks/authModule";
import "./App.module.css";
import Login from "./component/login/Login";
import Logout from "./component/logout/Logout";
import Header from "./component/header/Header";
import EmptyPage from "./component/EmptyPage";
import MainTemplate from "./component/main/MainTemplate";
import ReservationState from "./component/reservation/ReservationState";
import BookPage from "./component/bookpage/BookPage";
import MyPage from "./component/mypage/MyPage";
import AdminMain from "./component/adminPages/AdminMain";

function App() {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      location.pathname !== "/" &&
      getAuth().auth === null &&
      location.pathname !== "/logout"
    ) {
      console.log("App.js 예외처리 1");
      navigate("/");
    } else if (location.pathname === "/" && getAuth().auth !== null) {
      console.log("App.js 예외처리 2");
      navigate("/main");
    } else {
      console.log("App.js 예외처리 else");
    }
  }, [location.pathname, navigate]);

  console.log("node env", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }

  return (
    <div>
      {location.pathname !== "/" ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/main" element={<MainTemplate />} />
        <Route path="/state" element={<ReservationState />} />
        <Route path="/booking/:roomId" element={<BookPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="*" element={<EmptyPage />} />
        {/* <Route path='/feedback' element={<Feedback />} /> */}
      </Routes>
    </div>
  );
}

export default App;
