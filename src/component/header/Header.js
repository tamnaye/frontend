import styles from './Header.module.css';
import logo from './img/ci_png.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, removeToken } from '../../hooks/authModule';
import { doLogout } from '../../hooks/doLogout';
import useUrl from '../../hooks/useUrl';

const Header = () => {
  const navigate = useNavigate();
  const url = `http://${useUrl()}/auth/logout`;

  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/main`}>
          <img className={styles.img} src={logo} alt='logo'></img>
        </Link>
        {/* 1890FF */}
        <div className={styles.anker}>
          {getAuth().auth === null ? (
            <Link to='/'>로그인</Link>
          ) : (
            <span
              style={{ color: '#1890FF', marginRight: '12px' }}
              onClick={() => doLogout(navigate, url)}
            >
              로그아웃
            </span>
          )}
          <Link to={`/mypage`}>마이페이지</Link>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.menu__permanent}>
          <Link to={`/main`}>홈</Link>
          <Link to={`/state`}>예약현황</Link>
        </div>
        <div className={styles.menu__temporary}>
          <Link to={`/feedback`}>시스템 문의</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
