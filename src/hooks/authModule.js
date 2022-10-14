export function isAdmin() {
  const adminCheck = window.location.pathname.includes("/admin") ? true : false;
  return adminCheck;
}

export function setAuth(auth, reAuth) {
  window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY, auth);
  window.localStorage.setItem(process.env.REACT_APP_reAUTH_KEY, reAuth);
}
export function setAdminAuth(auth2) {
  window.localStorage.setItem(process.env.REACT_APP_AUTH2_KEY, auth2);
}
export function getAdmin() {
  return window.localStorage.getItem(process.env.REACT_APP_AUTH2_KEY);
}
export function getAuth() {
  const object = {
    auth: window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
    reAuth: window.localStorage.getItem(process.env.REACT_APP_reAUTH_KEY),
    auth2: window.localStorage.getItem(process.env.REACT_APP_AUTH2_KEY),
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
  const object = isAdmin()
    ? {
        // "Content-Type": "application/json",
        Authorization2: window.localStorage.getItem(
          process.env.REACT_APP_AUTH2_KEY
        )
      }
    : {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem(
          process.env.REACT_APP_AUTH_KEY
        ),
        reAuthorization: window.localStorage.getItem(
          process.env.REACT_APP_reAUTH_KEY
        ),
      };

  return object;
}
function removeAdmin() {
  window.localStorage.removeItem(process.env.REACT_APP_AUTH2_KEY);
}
function removeTamna() {
  window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
  window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY);
}
export function removeToken() {
  isAdmin() ? removeAdmin() : removeTamna();
}
export function tokenExpired() {
  isAdmin() ? removeAdmin() : removeTamna();
  // alert("로그인 세션이 만료되었습니다.");
}
