import styles from './ReservationState.module.css';
import ThirdFloorReservationState from './ThirdFloorStateComponents/ThirdFloorReservationState';
import SecondFloorReservationState from './SecondFloorStateComponents/SecondFloorReservationState';
import SecondAndThirdReservationState from './SecondAndThirdReservationState';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUrl from '../../hooks/useUrl';

const ReservationState = () => {
  const { id } = useParams();
  const myUrl = useUrl();

  const [userClasses, setUserClasses] = useState('');
  const [maxClasses, setMaxClasses] = useState('');

  useEffect(() => {
    fetch(`http://${myUrl}/api/user/data?userId=${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setUserClasses(data.userData.classes);
        setMaxClasses(data.maxClasses);
      });
  }, [`http://${myUrl}/api/user/data?userId=${id}`, id]);

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
