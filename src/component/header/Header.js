import styles from './Header.module.css'
import logo from './img/ci_png.png'
import { Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'

const Header = () => {
  const userid = window.localStorage.getItem("userid")

  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/main`}>
          <img className={styles.img} src={logo} alt="logo"></img>
        </Link>
        <div className={styles.anker}>
          {userid===null ?<Link to="/">Login</Link> : <Link to="/logout">Logout</Link> }
          
          <Link to={`/mypage/${userid}`}>My page</Link>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={`/state`}>실시간예약현황</Link>
        {/* <Link to={`/booking/301/${userid}`}>예약하기</Link> */}
      </div>
    </div>
  )
}

export default Header
