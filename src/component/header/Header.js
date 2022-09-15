import styles from './Header.module.css';
import logo from './img/ci_png.png';
import { Link } from 'react-router-dom';
import { getAuth } from '../../hooks/authModule';

const Header = () => {
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/main`}>
          <img className={styles.img} src={logo} alt='logo'></img>
        </Link>
        <div className={styles.anker}>
          {getAuth().auth === null ? (
            <Link to='/'>Login</Link>
          ) : (
            <Link to='/logout'>Logout</Link>
          )}
          <Link to={`/mypage`}>My page</Link>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={`/`}>HOME</Link>
        <Link to={`/state`}>실시간예약현황</Link>
        {/* <Link to={`/feedback`}>피드백</Link> */}
      </div>
    </div>
  );
};

export default Header;
