//styles
import styles from './BookPage.module.css';
//BookingPage - component

import NavsAdmin from './navs/NavsAdmin';
import NavsFloor2 from './navs/NavsFloor2';
import NavsFloor3 from './navs/NavsFloor3';
import RoomInfo from './RoomInfo';
import BookingData from './BookingData';
//hooks
import useUrl from '../../hooks/useUrl';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookPage() {
  const id = window.localStorage.getItem('userid');
  const myUrl = useUrl();
  const navigate = useNavigate();

  const [userClass, setUserClass] = useState('');
  const [maxClass, setMaxClass] = useState('');

  const url = `http://${myUrl}/api/user/data?userId=${id}`;

  useEffect(() => {
    if (id === null) {
      alert('로그인 후 사용 가능합니다.');
      navigate(`/`);
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setUserClass(data.userData.classes);
          setMaxClass(data.maxClasses);
        });
    }
  }, [url, id, navigate]);

  return (
    <div>
      {userClass === 0 ? (
        <NavsAdmin />
      ) : userClass === maxClass ? (
        <NavsFloor3 />
      ) : (
        <NavsFloor2 />
      )}
      <div className={styles.roomInfo}>
        <RoomInfo />
        <div className={styles.bookingInfo}>
          <BookingData />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
