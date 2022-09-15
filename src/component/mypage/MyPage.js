//styles
import styles from './MyPage.module.css';
import { Container } from 'react-bootstrap';
//MyPage - component
import MyBookTable from './MyBookTable';
import MyBookTableEmpty from './MyBookTableEmpty';
import Footer from '../footer/Footer';
//hooks
import useUrl from '../../hooks/useUrl';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGet } from '../../hooks/fetchUrl';

function MyPage() {
  const myUrl = useUrl();
  const location = useLocation()

  //----로그인 시 userName 데이터 가져오기----//
  const [bookingCount, setBookingCount] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const url = `http://${myUrl}/api/user/mypage`;
  useEffect(() => {
      // fetch(url, { method: 'GET' })
      //   .then((res) => res.json())
      fetchGet(url,location)
        .then((data) => {
          setUserId(data.userData.userId)
          setUserName(data.userData.userName);
          setBookingCount(data.myBookingDetailDataList);
        });
  }, [url]);
  //onsole.log(bookingCount);

  return (
    <>
      <Container className={styles.container}>
        <h6 className={styles.userInfo}>
          더큰내일센터 <span className={styles.user_name}>{userName}</span>
          님의 예약 현황
        </h6>
        {Array.isArray(bookingCount) && bookingCount.length === 0 ? (
          <MyBookTableEmpty />
        ) : (
          <MyBookTable />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default MyPage;
