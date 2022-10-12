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
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../hooks/fetchUrl';

function MyPage() {
  const myUrl = useUrl();
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [myBookingDetailDataList, setMyBookingDetailDataList] = useState([]);

  //----로그인 시 userName 데이터 가져오기----//
  const [userName, setUserName] = useState('');
  const [bookingCount, setBookingCount] = useState([]);
  const url = `http://${myUrl}/api/user/mypage`;
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      setUserName(data?.userData.userName);
      setBookingCount(data?.myBookingDetailDataList);

      setUserData(data?.userData.userId);
      setMyBookingDetailDataList(data?.myBookingDetailDataList);
    });
  }, [url, navigate]);
  //console.log(bookingCount);
  //console.log(myBookingDetailDataList);
  //console.log(userData);

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
          <MyBookTable
            userData={userData}
            myBookingDetailDataList={myBookingDetailDataList}
          />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default MyPage;
