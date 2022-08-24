import styles from './Header.module.css'
import logo from './img/ci_png.png'
import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react'

const Header = () => {
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/22106045`}>
          <img className={styles.img} src={logo} alt="logo"></img>
        </Link>
        <div className={styles.anker}>
          <Link to="/login">Login</Link>
          <Link to={`/mypage`}>My page</Link>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={`/state/22106045`}>실시간예약현황</Link>
        <Link to={`/booking/301/22106045`}>예약하기</Link>
      </div>
    </div>
  )
}

export default Header
