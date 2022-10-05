import {
  tokenExpired,
  refreshToken,
  sendAuth,
  getAuth,
  getAdmin,
  isAdmin
} from "./authModule";
function returnJson(res, navigate) {
  if (getAuth().auth !== null || getAdmin() !== null) {
    if (res.status === 200) { // 정상 [admin은 리프레쉬 없음]
      refreshToken(res.headers.get("Authorization"));
      return res.json();
    } else if (res.status === 403) { // 토큰 만료 
      tokenExpired();
      navigate(isAdmin() ? "/admin" : "/")
    } else if (res.status === 404) { //권한없음 (admin)
      navigate("/");
    } else if (res.status === 500) { //서버 에러 
      alert("서버 에러  : 관리자에게 문의해주세요");
    }
  }
}

export function fetchGet(url, navigate) {
  return fetch(url, {
    method: "GET",
    headers: sendAuth(),
  }).then((res) => {
    return returnJson(res, navigate);
    // if (getAuth().auth !== null) {
    //   if (res.status === 403) {
    //     tokenExpired();
    //     window.location.reload()
    //   //  !getAdmin() ?  navigate("/") : navigate("/admin/fileupload")
    //   } else if (res.status === 200) {
    //     refreshToken(res.headers.get("Authorization"));
    //     return res.json();
    //   } else if (res.status === 500) {
    //     alert("서버 에러  : 관리자에게 문의해주세요");
    //   } else if (res.status===404){
    //     navigate('/')
    //   }
    // }
  });
}
export function fetchPostJson(url, object, navigate) {
  return fetch(url, {
    method: "POST",
    headers: sendAuth(),
    body: JSON.stringify(object),
  }).then((res) => {
    return returnJson(res, navigate);
  });
}
