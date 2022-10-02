import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getAdmin, getAuth, removeToken } from "./hooks/authModule";
import "./App.module.css";
import Header from "./component/header/Header";
import EmptyPage from "./component/EmptyPage";
import MainTemplate from "./component/main/MainTemplate";
import ReservationState from "./component/reservation/ReservationState";
import BookPage from "./component/bookpage/BookPage";
import MyPage from "./component/mypage/MyPage";
import AdminMain from "./component/adminPages/AdminMain";
import ClassesFloor from "./component/adminPages/classesFloor/ClassesFloor";
import Room from "./component/adminPages/room/Room";
import IndividualMain from "./component/adminPages/individual/IndividualMain";
import FileUpload from "./component/adminPages/fileUpload/FileUpload";
import LoginContainer from "./component/login/LoginContainer";
import Invalid from "./component/Invalid";
import { useEffect } from "react";

function App() {
  const pathname = window.location.pathname;
  console.log("app.js pathname:",pathname)
  const navigate = useNavigate();
  const isAdmin = getAdmin() ? true : false;
  const isUserAlive = getAuth().auth !== null ? true : false;
  const isAdminLoginPage = window.location.pathname === ("/admin" || "/admin/") ? true : false
  const isAdminPath =
    window.location.pathname.startsWith("/admin/") && !isAdminLoginPage;
    // console.log(window.location.pathname.startsWith("/admin"))
  const isLoginPage = window.location.pathname === "/";
  useEffect(() => {
      if (isUserAlive) {
        if (isAdmin) {
          if (isAdminLoginPage) {
            console.log("redirecting 1 ", pathname);
            navigate("/admin/fileupload");
          } else if (isLoginPage || !isAdminPath) {
            console.log("redirecting 2 ", pathname);
            removeToken();
          }
        } else {
          if (isAdminLoginPage) {
            console.log("redirecting 3 ", pathname);
            removeToken();
          } //user expire
          else if (isLoginPage) {
            console.log("redirecting 4 ", pathname);
            navigate("/main");
          } else if (isAdminPath) {
            console.log("redirecting 5 ", pathname); 
            navigate("/admin");
          }
        }
      } else {
        console.log("redirecting 6 ", pathname);
        isAdminPath ? navigate("/admin") : !isAdminLoginPage && navigate("/");
      }
    
  }, [navigate]);


  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }


  return (
    <div>
      {isAdminLoginPage || isLoginPage || isAdminPath ? null : <Header />}
      {isAdminPath ? <AdminMain /> : null}

      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route path="/main" element={<MainTemplate />} />
        <Route path="/state" element={<ReservationState />} />
        <Route path="/booking/:roomId" element={<BookPage />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/admin" element={<LoginContainer />} />
        <Route path="/admin/fileupload" element={<FileUpload />} />
        <Route path="/admin/floor" element={<ClassesFloor />} />
        <Route path="/admin/room" element={<Room />} />
        <Route path="/admin/individual" element={<IndividualMain />} />

        <Route path="*" element={<EmptyPage />} />
        <Route path="/invalid" element={<Invalid />} />
        {/* <Route path='/feedback' element={<Feedback />} /> */}
      </Routes>
    </div>
  );
}

export default App;
