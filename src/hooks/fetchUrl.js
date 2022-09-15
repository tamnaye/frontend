import { useLocation, useNavigate } from "react-router-dom"
import { reAuthExpired, refreshToken, sendAuth } from "./authModule"

export function fetchGet (url,location){
 
 return fetch(url, {
    method: 'GET',
    headers: sendAuth(),
  })
    .then((res) =>{
      console.log("res status : ", res.status)
      if(res.status===403){
        reAuthExpired()
        location.reload()
      }else{
        
        refreshToken(res.headers.get('Authorization'))
        return res.json()
      }
    } )  
}
export function fetchPost(url,navigate){

}