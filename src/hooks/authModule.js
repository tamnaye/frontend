export function setAuth(auth, reAuth, admin) {
  window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY, auth);
  window.localStorage.setItem(process.env.REACT_APP_reAUTH_KEY, reAuth);
  if (admin) {
    window.localStorage.setItem(process.env.REACT_APP_CHECKER, admin);
  }
}
export function getAdmin() {
  return window.localStorage.getItem(process.env.REACT_APP_CHECKER);
}
export function getAuth() {
  const object = {
    auth: window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
    reAuth: window.localStorage.getItem(process.env.REACT_APP_reAUTH_KEY),
  };
  return object;
}
// accessToken refresh
export function refreshToken(auth) {
  if (getAuth().auth !== auth && auth !== null) {
    window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY, auth);
  }
}
export function sendAuth() {
  const object = {
    "Content-Type": "application/json",
    Authorization: window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
    reAuthorization: window.localStorage.getItem(
      process.env.REACT_APP_reAUTH_KEY
    ),
  };
  return object;
}
export function sendAuthPost() {
  const object = {
    Authorization: window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
    reAuthorization: window.localStorage.getItem(
      process.env.REACT_APP_reAUTH_KEY
    ),
  };
  return object;
}
export function removeToken() {
  window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
  window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY);
  window.localStorage.removeItem(process.env.REACT_APP_CHECKER);
}
export function tokenExpired() {
  window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
  window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY);
  window.localStorage.removeItem(process.env.REACT_APP_CHECKER);
  alert("로그인 세션이 만료되었습니다.");
}
