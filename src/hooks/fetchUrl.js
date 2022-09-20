import {
  tokenExpired,
  refreshToken,
  sendAuth,
  getAuth,
} from "./authModule";

export function fetchGet(url, navigate) {
  return fetch(url, {
    method: "GET",
    headers: sendAuth(),
  }).then((res) => {
    if (getAuth().reAuth !== null) {
      if (res.status === 403) {
        tokenExpired();
        navigate("/");
      } else if (res.status === 200) {
        refreshToken(res.headers.get("Authorization"));
        return res.json();
      } else if (res.status === 500) {
        alert("서버 에러  : 관리자에게 문의해주세요");
      }
    }
  });
}
