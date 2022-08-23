//styles
import styles from './MyPage.module.css';
import useFetch from '../../hooks/useFetch';
//MyPage - component
import MyBookTable from './MyBookTable';

function MyPage() {
  const user = useFetch('http://144.24.91.218:8000/users/22106060');

  return (
    <div className={styles.container}>
      <h6 className={styles.userInfo}>
        탐나는인재 <span className={styles.user_name}>{user.user_name}</span>님의 예약 현황
      </h6>
      <MyBookTable />
    </div>
  );
}
export default MyPage;
