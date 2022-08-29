//styles
import styles from './MyPage.module.css';
//MyPage - component
import MyBookTable from './MyBookTable';
import dummy from '../../db/userBookingData.json';
//import useFetch from '../../hooks/useFetch';

function MyPage() {
  //----dummy데이터 이용----//
  const [user] = dummy.user;
  //console.log(user);
  const userName = user.userName;
  //console.log(userName);

  //----무결님 서버 이용중----//
  //const user = useFetch('http://144.24.91.218:8000/users/22106060');
  //아래에 {user.user_name}

  return (
    <div className={styles.container}>
      <h6 className={styles.userInfo}>
        탐나는인재 <span className={styles.user_name}>{userName}</span>
        님의 예약 현황
      </h6>
      <MyBookTable />
    </div>
  );
}
export default MyPage;
