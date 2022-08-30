import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ThirdFloorMeetingRoom.module.css';

const ThirdFloorMeetingRoom = () => {
  const { id } = useParams();

  //3층 미팅룸 API 사용 정보 불러오기
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.5.127:8080/api/booking/main?floor=3`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData);
        setRoomData(data.RoomData);
      });
  }, [`htttp://192.168.5.127:8080/api/booking/main?floor=3`]);

  const ThirdMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  );

  // roomFull 함수
  const roomFull = (roomid) => {
    const roomState = bookingData.filter((room) => room.roomId === roomid);

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
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {ThirdMeetingRoominfo.map((room) => (
          <button
            key={room.roomId}
            className={roomFull(room.roomId) ? [styles.full] : [styles.notfull]}
          >
            <Link to={`/booking/${room.roomId}/${id}`}>{room.roomName}</Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThirdFloorMeetingRoom;
