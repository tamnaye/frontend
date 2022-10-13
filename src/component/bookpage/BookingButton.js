

import useTimeAlert from "../../hooks/useTimeAlert";
import {  useEffect, useState } from "react";
import styles from "./BookingButton.module.css";


const BookingButton = (props)=>{
//----예약시간에 따른 버튼 비활성화----//

//21:00-08:30까지 예약 버튼 비활성화 함수 -> hooks
const timeAblebtn = useTimeAlert()[0]; //[true, ()=>{}] //리턴값 확인 잘하기
//주말 예약 버튼 비활성화
const [weeklyAblebtn, setWeeklyAblebtn] = useState(false); //주말일 때 상태변경(true일 때 버튼 활성화!)
const day = ["일", "월", "화", "수", "목", "금", "토"];
const Now = new Date();
const NowDay = Now.getDay();
const weekDay = day[NowDay];

useEffect(() => {
  if (weekDay === "토" || weekDay === "일") {
    setWeeklyAblebtn(false);
  } else {
    setWeeklyAblebtn(true);
  }
}, [timeAblebtn, weekDay]);


    return (<button
        className={
          timeAblebtn === false || weeklyAblebtn === false
            ? styles.bookbtnOff
            : styles.bookbtn
        }
        onClick={props.onBookingConfirm}
        disabled={
          timeAblebtn === false || weeklyAblebtn === false ? true : false
        }
      >
        예약하기
      </button>)

}
export default BookingButton