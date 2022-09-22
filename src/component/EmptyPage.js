import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "../hooks/authModule";

export default function EmptyPage() {
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    if(location.pathname.includes("/admin")){
      if (getAuth().auth === null) {
        console.log("empty 1")
        alert("잘못된 접근입니다.");
        navigate("/admin");
      } else {
        console.log("empty 2")
        alert("잘못된 접근입니다.");
        navigate("/admin/fileupload");
      }
    }else{
      if (getAuth().auth === null) {
        console.log("empty 3")
        alert("잘못된 접근입니다.");
        navigate("/");
      } else {
        console.log("empty 4")
        alert("잘못된 접근입니다.");
        navigate("/main");
      }
    }
  
  },[navigate]);

  return <div></div>;
}
