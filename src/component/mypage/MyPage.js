//styles
import styles from './MyPage.module.css';
//MyPage - component
import MyBookTable from './MyBookTable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MyPage() {
  const { id } = useParams();
  //----로그인 시 userName 데이터 가져오기----//
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const url = `http://192.168.5.157:8080/api/user/data?userId=${id}`;
  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userData.userName);
        setUserId(data.userData.userId);
      });
  }, []);

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
