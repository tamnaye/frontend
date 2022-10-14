import useTimeAbled from "../../hooks/useTimeAbled";
import styles from "./BookingButton.module.css";


const BookingButton = (props)=>{
//----예약시간에 따른 버튼 비활성화----//

//21:00-08:30까지 예약 버튼 비활성화 함수 -> hooks
//주말일 경우 예약 버튼 비활성화 함수
const abledbtn = useTimeAbled(); //[true, ()=>{}] //리턴값 확인 잘하기
console.log(abledbtn)

    return (<button
        className={
          abledbtn === false 
            ? styles.bookbtnOff
            : styles.bookbtn
        }
        onClick={props.onBookingConfirm}
        disabled={
          abledbtn === false ? true : false
        }
      >
        예약하기
      </button>)

}
export default BookingButton