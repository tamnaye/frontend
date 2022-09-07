import styles from './Header.module.css';
import logo from './img/ci_png.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const userid = window.localStorage.getItem('userid');
  let location = useLocation();
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/main`}>
          <img className={styles.img} src={logo} alt='logo'></img>
        </Link>
        <div className={styles.anker}>
          {userid === null ? (
            <Link to='/'>Login</Link>
          ) : (
            <Link to='/logout'>Logout</Link>
          )}
          <Link to={`/mypage`}>My page</Link>
        </div>
      </div>
      <div className={styles.menu}>
      {location.pathname === '/main' ? <Link to={`/state`}>실시간예약현황</Link> : <Link to={`/`}>HOME</Link> }
        {/* <Link to={`/state`}>실시간예약현황</Link> */}
        {/* <Link to={`/booking/301/${userid}`}>예약하기</Link> */}
        <Link to={`/feedback`}>피드백</Link>
      </div>
    </div>
  );
};

export default Header;
