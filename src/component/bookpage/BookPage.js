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
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchGet } from '../../hooks/fetchUrl';

function BookPage() {
  const myUrl = useUrl();

  const [userClass, setUserClass] = useState('');
  const [maxClass, setMaxClass] = useState('');

  const url = `http://${myUrl}/api/user/data`;
  const location = useLocation();

  useEffect(() => {
    fetchGet(url,location)
        .then((data) => {
          setUserClass(data.userData.classes);
          setMaxClass(data.maxClasses);
        });
  }, [url, location]);
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
          <BookingData string={"string"}/>
        </div>
      </div>
    </div>
  );
}
export default BookPage;
