import React from 'react'
import Login from './Login'

export default function LoginContainer() {
    const path = window.location.pathname
  return (
    <div>
        <Login path={path}/>
    </div>
  )
}
