//styles
import styles from './MyPage.module.css';
import useFetch from '../../hooks/useFetch';
//MyPage - component
import MyBookTable from './MyBookTable';

function MyPage() {
  const user = useFetch('http://144.24.91.218:8000/users/22106060');
  // const url = 'http://144.24.91.218:8000/users/22106045';
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //     });
  // }, [url]);

  return (
    <div className={styles.container}>
      <h6 className={styles.userInfo}>
        탐나는인재 <span>{user.user_name}</span>님의 예약 현황
      </h6>
      <MyBookTable />
    </div>
  );
}
export default MyPage;
