import styles from "./Header.module.css";
import logo from "./img/ci_png.png";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, removeToken } from "../../hooks/authModule";
import { fetchGet } from "../../hooks/fetchUrl";
import { doLogout } from "../../hooks/doLogout";
import useUrl from "../../hooks/useUrl";

const Header = () => {
  const navigate = useNavigate();
  const url = `http://${useUrl()}/auth/logout`

  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
        <Link to={`/main`}>
          <img className={styles.img} src={logo} alt="logo"></img>
        </Link>
        {/* 1890FF */}
        <div className={styles.anker}>
          {getAuth().auth === null ? (
            <Link to="/">Login</Link>
          ) : (
            <span
              style={{ color: "#1890FF", marginRight: "12px" }}
              onClick={() => doLogout(navigate,url)}
            >
              Logout
            </span>
          )}
          <Link to={`/mypage`}>My page</Link>
        </div>
      </div>
      <div className={styles.menu}>
        <Link to={`/main`}>HOME</Link>
        <Link to={`/state`}>실시간예약현황</Link>
        {/* <Link to={`/feedback`}>피드백</Link> */}
      </div>
    </div>
  );
};

export default Header;
