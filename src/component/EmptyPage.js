import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAdmin, getAuth } from "../hooks/authModule";

export default function EmptyPage() {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isAdmin = getAdmin() ? true : false;
  const isUserAlive = getAuth().auth !== null ? true : false;
  const isAdminLoginPage = window.location.pathname === ("/admin" || "/admin/") ? true : false
  const isAdminPath =
    window.location.pathname.startsWith("/admin/") && !isAdminLoginPage;
  useEffect(() => {
    if (isUserAlive) {
      console.log("redirecting (empty page) 7 ", pathname);
      isAdmin ? navigate("/admin/fileupload") : navigate("/main");
    } else {
      console.log("redirecting (empty page) 8 ", pathname);
      isAdminPath ? navigate("/admin") : navigate("/");
    }
    // )
  },[navigate]);

  return <div></div>;
}
