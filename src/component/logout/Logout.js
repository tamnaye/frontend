import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    window.localStorage.removeItem("userid")
    window.localStorage.removeItem("class")
    console.log ("logout remove userid",window.localStorage.removeItem("userid"))
    console.log ("logout remove class",window.localStorage.removeItem("class"))
    const navigate = useNavigate()
    useEffect(()=>{
        alert("로그아웃 되셨습니다.")
        navigate("/login")
    },[navigate])
  return <></>
}

export default Logout
