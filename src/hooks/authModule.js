
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
      console.log("3) sendAuth !! object : ",object)
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
    console.log("1-1 ) set Auth !! auth : ",auth)
    window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY,auth);
    window.localStorage.setItem(process.env.REACT_APP_reAUTH_KEY,reAuth)
}
// accessToken refresh 
export function refreshToken (auth,reauth){
    console.log("4-1) refresh !! new auth : ",auth)
    console.log("4-2) refresh !! old auth : ",getAuth().auth)
    console.log("4-1) refresh !! new reAuth : ",reauth)
    console.log("4-2) refresh !! old reAuth : ",getAuth().reAuth)
    if(getAuth().auth!==auth){
        window.localStorage.setItem(process.env.REACT_APP_AUTH_KEY,auth)
    }
}
export function removeToken (){
    window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY)
}
export function tokenExpired (){
    console.log("5-1) reAuthExpired")
    window.localStorage.removeItem(process.env.REACT_APP_AUTH_KEY);
    window.localStorage.removeItem(process.env.REACT_APP_reAUTH_KEY)
    alert("로그인 세션이 만료되었습니다.")
}
