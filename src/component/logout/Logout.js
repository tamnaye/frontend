import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../hooks/authModule";
import { fetchGet } from "../../hooks/fetchUrl";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    fetchGet(process.env.REACT_APP_PREFIX + "auth/logout", navigate)
    .then(
      (data) => {
        if (data.message === "success") {
          console.log("logout data : ", data);
          removeToken();
          navigate("/");
        }
      }
    );
  }, [navigate]);
  return <></>;
}

export default Logout;
