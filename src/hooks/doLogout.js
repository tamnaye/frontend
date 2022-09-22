import { removeToken } from "./authModule";
import { fetchGet } from "./fetchUrl";
import useUrl from "./useUrl";

export function doLogout(navigate, url) {
  
    fetchGet(url, navigate)
    .then(
      (data) => {
        if (data.message === "success") {
          console.log("logout data : ", data);
          removeToken();
          console.log("logout path : ",window.location.pathname)
          window.location.pathname.includes("/admin") ? navigate("/admin") : navigate('/')
        }else{
          alert("로그아웃 실패 : 관리자에게 문의하세요")
        }
      }
    );
}