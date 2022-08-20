import styles from './Header.module.css'
import logo from './img/ci_png.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to="/">
          <img className={styles.img} src={logo} alt="logo"></img>
        </Link>
        <div className={styles.anker}>
          <a src="#">Sign up</a>
          <a src="#">My page</a>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to="/state">실시간예약현황</Link>
      </div>
    </div>
  )
}

export default Header
