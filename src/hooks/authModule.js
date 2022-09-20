
export function saveUserid (userid){
    window.localStorage.setItem(process.env.REACT_APP_USER_ID_KEY,userid);
}
export function getAuth() {
    const object = {
      auth : window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
    reAuth : window.localStorage.getItem(process.env.REACT_APP_reAUTH_KEY)
    }
    return object
}
export function sendAuth (){
    const object = {
        "Content-Type": "application/json",
        Authorization : window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
        reAuthorization : window.localStorage.getItem(process.env.REACT_APP_reAUTH_KEY)
      }
      return object
}
export function sendAuthPost (){
    const object = {
        Authorization : window.localStorage.getItem(process.env.REACT_APP_AUTH_KEY),
        reAuthorization : window.localStorage.getItem(process.env.REACT_APP_reAUTH_KEY),
      }
      return object
}
export function setAuth(auth, reAuth){
    window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY,auth);
    window.localStorage.setItem(process.env.REACT_APP_reAUTH_KEY,reAuth)
}
// accessToken refresh 
export function refreshToken (auth){
    if(getAuth().auth!==auth && auth!==null){
        window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY,auth)
    }
}
export function removeToken (){
    window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY)
}
export function tokenExpired (){
    window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY)
    alert("로그인 세션이 만료되었습니다.")
}
