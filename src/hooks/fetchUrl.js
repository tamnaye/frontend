import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  tokenExpired,
  refreshToken,
  removeToken,
  sendAuth,
} from "./authModule";

export function fetchGet(url, location) {
  return fetch(url, {
    method: "GET",
    headers: sendAuth(),
  }).then((res) => {
    if (res.status === 403) {
      tokenExpired();
    } else if (res.status === 200) {
      refreshToken(res.headers.get("Authorization"),res.headers.get("reAuthorization"));
      return res.json();
    } 
    else if(res.status===500) {
      alert("서버 에러  : 관리자에게 문의해주세요");
    }
  });
}




export function useFetch(url) {
  // const [isExpired,setIsExpired] = useState(false)
  // const [object, setObject] = useState(null);
  // const fetchObj = 
  return useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: sendAuth(),
    }).then((res) => {
      console.log("res status : ", res.status);
      if (res.status === 403) {
        tokenExpired();
        // setIsExpired(true)
      } else if (res.status === 200) {
        refreshToken(res.headers.get("Authorization"));
        return res.json();
      } else {
        console.log("is server status 500 ? ", res.status);
        alert("서버 에러 : 관리자에게 문의해주세요");
        removeToken();
        // setIsExpired(true)
      }
    });
  },[url]);
  // setObject(fetchObj);

  // return object;
}
