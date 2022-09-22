import styles from './Header.module.css';
import logo from './img/ci_png.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, removeToken } from '../../hooks/authModule';
import { fetchGet } from '../../hooks/fetchUrl';

const Header = () => {
  const navigate = useNavigate();

  function logout() {
      fetchGet(process.env.REACT_APP_PREFIX + "auth/logout", navigate)
      .then(
        (data) => {
          if (data.message === "success") {
            console.log("logout data : ", data);
            removeToken();
            navigate("/");
          }else{
            alert("로그아웃 실패 : 관리자에게 문의하세요")
          }
        }
      );
  }
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/main`}>
          <img className={styles.img} src={logo} alt='logo'></img>
        </Link>
        {/* 1890FF */}
        <div className={styles.anker}>
          {getAuth().auth === null ? (
            <Link to='/'>Login</Link>
          ) : (
            <span onClick={logout}>Logout</span>
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
