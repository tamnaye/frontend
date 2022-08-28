import styles from './ThirdFloorMap.module.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ThirdFloorMap = () => {
  const { id } = useParams();

  //3층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch(`http://172.30.1.26:8080/api/booking/main?floor=3`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData);
        setRoomData(data.RoomData);
      });
  }, [`htttp://172.30.1.26:8080/api/booking/main?floor=3`]);

  const ThirdMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  );

  const ThirdNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox');

  // roomFull 함수 설정
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
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        {ThirdMeetingRoominfo.map((rooms) => (
          <div
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={roomFull(rooms.roomId) ? [styles.full] : [styles.MeetingRoom]}
          >
            <Link to={`/booking/${rooms.roomId}/${id}`}>
              {roomFull(rooms.roomId) ? '마감' : rooms.roomName}
            </Link>
          </div>
        ))}
        {ThirdNaboxinfo.map((rooms) => (
          <div
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={roomFull(rooms.roomId) ? [styles.full] : [styles.NaBax]}
          >
            <Link to={`/booking/${rooms.roomId}/${id}`}>
              {roomFull(rooms.roomId) ? '마감' : rooms.roomName}
            </Link>
          </div>
        ))}

        <div className={styles.Lounge} id={styles.notSelect}>
          더큰-Lounge
        </div>
        <div className={styles.더큰내일스튜디오} id={styles.notSelect}>
          더큰내일 <br />
          스튜디오
        </div>
        <div className={styles.space수월봉} id={styles.notSelect}>
          space 수월봉
        </div>
        <div className={styles.화장실} id={styles.notSelect}>
          화장실
        </div>
        <div className={styles.Stair} id={styles.notSelect}>
          Stair
        </div>
        <div className={styles.EV} id={styles.notSelect}>
          E.V
        </div>
        <div className={styles.Stair2} id={styles.notSelect}>
          Stair
        </div>
        <div className={styles.space일출봉} id={styles.notSelect}>
          space 일출봉
        </div>
      </div>
    </div>
  );
};

export default ThirdFloorMap;
