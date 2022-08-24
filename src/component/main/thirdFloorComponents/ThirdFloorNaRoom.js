
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorNaRoom.module.css'
import useFetch from '../../../hooks/useFetch'

const ThirdFloorNaRoom = () => {
  //3층 나박스 API 사용 정보 불러오기

  const [data, setData] = useState([])
  const [bookingData, setBookingData] = useState([])
  const [roomData, setRoomData] = useState([])

  useEffect(() => {
    fetch(`http://192.168.5.100:8080/api/booking/main?floor=3`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setBookingData(data.BookingData)
        setRoomData(data.RoomData)
      })
  }, [`http://192.168.5.100:8080/api/booking/main?floor=3`])
  console.log(data)
  console.log(bookingData)
  console.log(roomData)

  //old
  const Thirdroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 3
  )

  const ThirdNaboxinfo = Thirdroomsinfo.filter((rooms) => rooms.room_id >= 305)

  // roomFull 함수
  const roomFull = (roomid) => {
    const roomState = dummy.bookingData2.filter(
      (room) => room.roomId === roomid
    );

    const TimeToString = (time) => {
      let newTime;
      if (time === '09:00') {
        newTime = time.substr(1, 1);
      } else {
        newTime = time.substr(0, 2);
      }
      return newTime;
    };

    const roomBookingState = roomState.map(
      (room) =>
        TimeToString(room.endTime) - Number(TimeToString(room.startTime))
    );
    const sum = roomBookingState.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    return sum === 12;
  };

  return (
    <div className={styles.NaBoxContainer}>
      <h4 className={styles.title}>Na Box</h4>
      <div className={styles.roomContainer}>
        {ThirdNaboxinfo.map((room) => (
          <button
            key={room.room_id}
            className={
              roomFull(room.room_id) ? [styles.full] : [styles.notfull]
            }
          >
            <Link to={`/booking/${room.room_id}`}>{room.room_name}</Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThirdFloorNaRoom;
