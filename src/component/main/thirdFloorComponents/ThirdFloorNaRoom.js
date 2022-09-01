
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './ThirdFloorNaRoom.module.css'
import useUrl from '../../../hooks/useUrl';
import useTimeAlert from '../../../hooks/useTimeAlert'

const ThirdFloorNaRoom = () => {
  const { id } = useParams()
  const myUrl = UseUrl()
  const [ablebtn, BookingConfirm] = useTimeAlert()


  //3층 나박스 API 사용 정보 불러오기
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch(`http://${myUrl}/api/booking/main?floor=3`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData);
        setRoomData(data.RoomData);
      });
  }, [`htttp://${myUrl}/api/booking/main?floor=3`]);

  // 3층 Nabox 정보 가져오기
  const ThirdNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox');

  // roomFull 함수

  const notroomFull = (roomid) => {
    const roomState = bookingData.filter((room) => room.roomId === roomid)


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


    return sum !== 12
  }


  return (
    <div className={styles.NaBoxContainer}>
      <h4 className={styles.title}>Na Box</h4>
      <div className={styles.roomContainer}>
        {ThirdNaboxinfo.map((room) => (
          <Link to={`/booking/${room.roomId}/${id}`} key={room.roomId}>
            <button
              className={
                notroomFull(room.roomId) && ablebtn
                  ? [styles.notfull]
                  : [styles.full]
              }
              onClick={BookingConfirm}
            >
              {room.roomName}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThirdFloorNaRoom;
