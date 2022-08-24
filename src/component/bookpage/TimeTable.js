//styles
import styles from './TimeTable.module.css';
//useHook
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function TimeTable() {
  const [ablebtn, setAblebtn] = useState(true); //예약시간이 아닐 떄 상태변경(true일 때 버튼 활성화!)
  const navigate = useNavigate();
  // 로컬 자체에서 배열을 만들어 줘서 맵 사용해야 코드가 효율적
  const morning = ['09:00', '10:00', '11:00', '12:00'];
  const afternoon = ['13:00', '14:00', '15:00', '16:00', '17:00'];
  const night = ['18:00', '19:00', '20:00'];

  //21:00-08:30까지 예약 버튼 비활성화 함수
  const Now = new Date(); //현재 날짜 및 시간 -> Tue Aug 23 2022 16:33:51 GMT+0900
  const NowHour = Now.getHours();
  const NowMins = Now.getMinutes();

  function pluszero(times) {
    let time = times.toString(); //시간을 숫자에서 문자로 변환
    if (time.length < 2) {
      time = '0' + time; //숫자 앞에 0을 붙여줌
      return time;
    } else {
      return time;
    }
  }
  const nowHour = pluszero(NowHour);
  const nowMins = pluszero(NowMins);
  const nowTime = nowHour + nowMins;
  console.log(nowTime);

  const startTime = '0830';
  const endTime = '2100';
  useEffect(() => {
    if (startTime > nowTime || endTime < nowTime) {
      setAblebtn(false);
    } else {
      setAblebtn(true);
    }
  }, []); //useEffect써서 한번만 렌더링 해줌
  console.log(ablebtn);

  //버튼 클릭시 alert 띄어주기
  const BookingConfirm = () => {
    if (startTime > nowTime || endTime < nowTime) {
      alert(
        '예약할 수 없는 시간입니다!\n오전8:30부터 오후21:00까지 예약이 가능합니다.'
      );
    } else {
      alert('🎉 예약 되었습니다 🎉 마이페이지로 이동합니다 :)');
      navigate('/mypage');
    }
  };

  return (
    <div className={styles.timewrap}>
      <h6 className={styles.time}> 시간 선택 </h6>
      <div className={styles.timetable}>
        <div>
          <p className={styles.text}>오전</p>
          <div className={styles.timebtn}>
            {morning.map((item, index) => (
              <button key={index}>{item}</button>
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
      <button
        className={ablebtn === true ? styles.bookbtn : styles.bookbtnOff}
        onClick={BookingConfirm}
      >
        예약하기
      </button>
    </div>
  );
}

export default TimeTable;
