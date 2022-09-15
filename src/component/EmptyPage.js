import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../hooks/authModule";

export default function EmptyPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAuth().auth === null) {
      alert("잘못된 접근입니다.");
      navigate("/");
    } else {
      alert("잘못된 접근입니다.");
      navigate("/main");
    }
  },[navigate]);

  return <div></div>;
}
