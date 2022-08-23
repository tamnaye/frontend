//styles
import styles from './TimeTable.module.css';
//useHook
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from 'antd';

function TimeTable() {
  // 로컬 자체에서 배열을 만들어 줘서 맵 사용해야 코드가 효율적
  const morning = ['09:00', '10:00', '11:00', '12:00'];
  const afternoon = ['13:00', '14:00', '15:00', '16:00', '17:00'];
  const night = ['18:00', '19:00', '20:00'];

  const navigate = useNavigate();

  const BookingConfirm = () => {
    alert('🎉 예약 되었습니다 🎉 마이페이지로 이동합니다 :)');
    navigate('/mypage');
  };

  return (
    <div className={styles.timewrap}>
      <h6 className={styles.time}> 시간 선택 </h6>
      <div className={styles.timetable}>
        <div>
          <p className={styles.text}>오전</p>
          <div className={styles.timebtn}>
            {morning.map((item, index) => (
              <button key={index}  >{item}</button>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.text}>오후</p>
          <div className={styles.timebtn}>
            {afternoon.map((item, index) => (
              <button key={index}>{item}</button>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.text}>야근</p>
          <div className={styles.timebtn}>
            {night.map((item, index) => (
              <button key={index}>{item}</button>
            ))}
          </div>
        </div>
      </div>
      <button className={styles.bookbtn} onClick={BookingConfirm}>
        예약하기
      </button>
    </div>
  );
}

export default TimeTable;
