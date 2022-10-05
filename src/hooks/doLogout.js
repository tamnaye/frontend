import { isAdmin, removeToken } from "./authModule";
import { fetchGet } from "./fetchUrl";
import useUrl from "./useUrl";

export function doLogout(navigate, url) {
  
    fetchGet(url, navigate)
    .then(
      (data) => {
        console.log("logout data : ", data);
        if (data.message === "success") {
          removeToken();
          isAdmin() ? navigate("/admin") : navigate('/')
        }else{
          alert("로그아웃 실패 : 관리자에게 문의하세요")
        }
      }
    );
}