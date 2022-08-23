import { Button } from "antd";
import { useState } from "react";
import dummy from "../db/booking_data.json"
import styles from './Timetable_test.module.css'
function BookPage() {
  const timetable = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
  const booking_data = dummy.booking
  const timeArray = [];
  booking_data.map((booking)=> timeArray.push(booking.time_start))
  booking_data.map((booking)=> timeArray.push(booking.time_end))

  console.log(timeArray)

  


  const [isOccupied, setIsOccupied] = useState(false)
  function category(index) {
    if (index === 0) {
      return <p>오전</p>
    } else if (index === 4) {
      return <p>오후</p>
    } else if (index === 9) {
      return <p>오후</p>
    }
  }
  function isAvailable (time){
      console.log(timeArray.includes(time))
  }

  return (
    <div>
      {timetable.map((time, index) => (
        <>
          {console.log(index)}
          {isAvailable(time)}
          {category(index)}
          <Button className={isOccupied? styles.occupied : styles.vacant}
           style={{ margin: '10px'}} type="default" key={index}>{time}</Button>
        </>
      ))}

    </div>
  );
}
export default BookPage;
