import {
  tokenExpired,
  refreshToken,
  sendAuth,
  isAdmin
} from "./authModule";

function returnJson(res, navigate) {
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

export function fetchGet(url, navigate) {
  return fetch(url, {
    method: "GET",
    headers: sendAuth(),
  }).then((res) => {
    return returnJson(res, navigate);
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
