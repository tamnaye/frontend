import styles from './ReservationState.module.css';
import ThirdFloorReservationState from './ThirdFloorStateComponents/ThirdFloorReservationState';
import SecondFloorReservationState from './SecondFloorStateComponents/SecondFloorReservationState';
import SecondAndThirdReservationState from './SecondAndThirdReservationState';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUrl from '../../hooks/useUrl';

const ReservationState = () => {
  const  id  = window.localStorage.getItem("userid")
  const navigate = useNavigate()
  const myUrl = useUrl();

  const [userClasses, setUserClasses] = useState('');
  const [maxClasses, setMaxClasses] = useState('');

  useEffect(() => {
    if(id===null){
      alert("로그인 후 사용 가능합니다.")
      navigate(`/login`)
    }else{
      fetch(`http://${myUrl}/api/user/data?userId=${id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setUserClasses(data.userData.classes);
          setMaxClasses(data.maxClasses);
        });
    }
  }, [`http://${myUrl}/api/user/data?userId=${id}`, id,navigate]);

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
