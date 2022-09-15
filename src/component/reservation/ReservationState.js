import styles from './ReservationState.module.css';
import ThirdFloorReservationState from './ThirdFloorStateComponents/ThirdFloorReservationState';
import SecondFloorReservationState from './SecondFloorStateComponents/SecondFloorReservationState';
import SecondAndThirdReservationState from './SecondAndThirdReservationState';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUrl from '../../hooks/useUrl';
import { fetchGet } from '../../hooks/fetchUrl';

const ReservationState = () => {
  const location = useLocation()
  const myUrl = useUrl();
  const url = `http://${myUrl}/api/user/data`

  const [userClasses, setUserClasses] = useState('');
  const [maxClasses, setMaxClasses] = useState('');

  useEffect(() => {
   fetchGet(url,location)
        .then((data) => {
          setUserClasses(data.userData.classes);
          setMaxClasses(data.maxClasses);
        });
  }, [url,location]);

  return (
    <div className={styles.ReservationStateContainer}>
      <h2>시간대별 예약현황</h2>
      {userClasses === 0 ? (
        <SecondAndThirdReservationState className={styles.reservationTable} />
      ) : userClasses === maxClasses ? (
        <ThirdFloorReservationState className={styles.reservationTable} />
      ) : (
        <SecondFloorReservationState className={styles.reservationTable} />
      )}
    </div>
  );
};

export default ReservationState;
