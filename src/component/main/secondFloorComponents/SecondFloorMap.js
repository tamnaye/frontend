import styles from './SecondFloorMap.module.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useUrl from '../../../hooks/useUrl';
import useTimeAlert from '../../../hooks/useTimeAlert';

const SecondFloorMap = () => {
  const { id } = useParams();
  const myUrl = useUrl();
  const [ablebtn, BookingConfirm] = useTimeAlert();

  //2층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch(`http://${myUrl}/api/booking/main?floor=2`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData);
        setRoomData(data.RoomData);
      });
  }, [`htttp://${myUrl}/api/booking/main?floor=2`]);

  const SecondMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  );

  const SecondNaboxinfo = roomData.filter(
    (rooms) => rooms.roomType === 'nabox'
  );

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
    <div className={styles.Container}>
      <div className={styles.mapContainer}>
        {ablebtn ? null : (
          <div className={styles.TimeNotAllow}>
            지금은 예약 가능 시간이 아닙니다
          </div>
        )}
        {SecondMeetingRoominfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}`}
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
        {SecondNaboxinfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}`}
            key={rooms.roomId}
            className={styles[`NaBox${rooms.roomId}`]}
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

        <div className={styles.space범섬} id={styles.notSelect}>
          {`space\n범섬`}
        </div>
        <div className={styles.Lounge} id={styles.notSelect}>
          {`내일\nLounge`}
        </div>

        <div className={styles.화장실} id={styles.notSelect}>
          {`화\n장\n실`}
        </div>
        <div className={styles.stair} id={styles.notSelect}>
          {`계\n단`}
        </div>
        <div className={styles.EV} id={styles.notSelect}>
          E.V
        </div>
        <div className={styles.Stair2} id={styles.notSelect}>
          {`계\n단`}
        </div>
        <div className={styles.space우도} id={styles.notSelect}>
          {`space\n우도`}
        </div>
        <div className={styles.space비양도} id={styles.notSelect}>
          {`space\n비양도`}
        </div>
      </div>
    </div>
  );
};

export default SecondFloorMap;
