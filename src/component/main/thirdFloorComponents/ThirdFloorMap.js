import styles from './ThirdFloorMap.module.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUrl from '../../../hooks/useUrl';
import useTimeAlert from '../../../hooks/useTimeAlert';

const ThirdFloorMap = () => {
  const { id } = useParams();
  const myUrl = useUrl();
  const [ablebtn, BookingConfirm] = useTimeAlert();

  //3층 API 정보 가져오기
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

  const ThirdMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  );

  const ThirdNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox');

  // roomFull 함수 설정

  const notroomFull = (roomid) => {
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

    return sum !== 12;
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        {ThirdMeetingRoominfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}/${id}`}
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={
              notroomFull(rooms.roomId) && ablebtn
                ? [styles.MeetingRoom]
                : [styles.full]
            }
            onClick={BookingConfirm}
          >
            <div>
              {notroomFull(rooms.roomId) && ablebtn ? rooms.roomName : '마감'}
            </div>
          </Link>
        ))}
        {ThirdNaboxinfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}/${id}`}
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={
              notroomFull(rooms.roomId) && ablebtn
                ? [styles.NaBox]
                : [styles.full]
            }
            onClick={BookingConfirm}
          >
            <div>
              {notroomFull(rooms.roomId) && ablebtn
                ? rooms.roomName.substr(6, 1)
                : '마감'}
            </div>
          </Link>
        ))}

        <div className={styles.Lounge} id={styles.notSelect}>
          {`더큰\nLounge`}
        </div>
        <div className={styles.더큰내일스튜디오} id={styles.notSelect}>
          {`더\n큰\n내\n일\n스\n튜\n디\n오`}
        </div>
        <div className={styles.space수월봉} id={styles.notSelect}>
          {`space\n수월봉`}
        </div>
        <div className={styles.화장실} id={styles.notSelect}>
          화장실
        </div>
        <div className={styles.Stair} id={styles.notSelect}>
          계단
        </div>
        <div className={styles.EV} id={styles.notSelect}>
          E.V
        </div>
        <div className={styles.Stair2} id={styles.notSelect}>
          계단
        </div>
        <div className={styles.space일출봉} id={styles.notSelect}>
          {`space\n일출봉`}
        </div>
      </div>
    </div>
  );
};

export default ThirdFloorMap;
