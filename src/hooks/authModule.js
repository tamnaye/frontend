
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
    console.log("new auth : ",auth)
    console.log("old auth : ",getAuth().auth)
    if(getAuth().auth!==auth){
        window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY,auth)
    }
}
export function removeToken (){
    window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY)
    window.localStorage.removeItem(process.env.REACT_APP_CLASS_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_MAX_CLASS_KEY);
}
export function reAuthExpired (){
    window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY)
    window.localStorage.removeItem(process.env.REACT_APP_CLASS_KEY);
    alert("로그인 세션이 만료되었습니다.")
    // callback()
}
// export function saveClass (userClass,maxClass){
//     window.localStorage.setItem(process.env.REACT_APP_CLASS_KEY, userClass);
//     window.localStorage.setItem(process.env.REACT_APP_MAX_CLASS_KEY, maxClass);
// }
// export function getClass (){
//     const object = {
//        userClass : window.localStorage.getItem(process.env.REACT_APP_CLASS_KEY),
//         maxClass : window.localStorage.getItem(process.env.REACT_APP_MAX_CLASS_KEY)
//     }
//     return object
 
// }
