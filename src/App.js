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
  let location = useLocation();
  const navigate = useNavigate();
  const isAdmin = getAdmin() ? true : false;
  const isUserAlive = getAuth().auth !== null ? true : false;
  const isValidPath = window.location.pathname !== "/invalid";
  const isAdminPath =
    window.location.pathname.startsWith("/admin/") &&
    window.location.pathname.length > 7;
  const isAdminLoginPage = window.location.pathname === "/admin" || "/admin/";
  const isLoginPage = window.location.pathname === "/";
  useEffect(() => {
    if (isValidPath) {
      if (isUserAlive) {
        if (isAdmin) {
          if (isAdminLoginPage) {
            navigate("/admin/fileupload");
          } else if (isLoginPage || !isAdminPath) {
            removeToken();
          }
        } else {
          if (isAdminLoginPage) {
            removeToken();
          } //user expire
          else if (isLoginPage) {
            navigate("/main");
          } else if (isAdminPath) {
            navigate("/admin");
          }
        }
      } else {
        isAdminPath ? navigate("/admin") : navigate("/");
      }
    } else {
      if (isUserAlive) {
        isAdmin ? navigate("/admin/fileupload") : navigate("/main");
      } else {
        isAdminPath ? navigate("/admin") : navigate("/");
      }
    }
  }, [navigate]);

  // ? isAdmin
  // ? (isLoginPage && navigate("/admin/fileupload"),
  //  isAdminPath && removeToken())
  // : (isLoginPage && navigate("/"),isAdminPath && navigate("/"))
  // : navigate("/")

  // isUserAlive
  //   ? isLoginPage ? navigate(isAdmin ? "/admin/fileupload" : "/main") : isAdminPath ? navigate(!isAdmin && "/") : isAdmin && removeToken()
  //   : navigate(isAdminPath ? "/admin" : "/");

  // if(isAdmin){

  // }else{

  // }

  // useEffect(() => {
  // if (
  //   location.pathname !== "/" &&
  //   location.pathname !== "/admin" &&
  //   getAuth().auth === null
  // ) {
  //   console.log("App.js 예외처리 1");
  //   navigate("/");
  // } else if (location.pathname === "/" && getAuth().auth !== null) {
  //   console.log("App.js 예외처리 2");
  //   navigate("/main");
  // } else if (location.pathname === "/admin" && getAuth().auth !== null) {
  //   console.log("App.js 예외처리 3");
  //   navigate("/admin/fileupload");
  // } else {
  //   console.log('App.js 예외처리 else');
  // }
  // }, [location.pathname, navigate]);
  console.log("node env", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  const pathArr = [
    "/",
    "/admin",
    "/admin/floor",
    "/admin/fileupload",
    "/admin/room",
    "/admin/individual",
  ];

  return (
    <div>
      {!pathArr.includes(location.pathname) ? <Header /> : null}
      {location.pathname.includes("admin/") ? <AdminMain /> : null}

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
