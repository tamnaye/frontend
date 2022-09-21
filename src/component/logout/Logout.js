import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../../hooks/authModule'

function Logout() {
    
    removeToken()

    const navigate = useNavigate()
    useEffect(()=>{
        navigate("/")
    },[navigate])
  return <></>
}

export default Logout
