
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './SecondFloorMeetingRoom.module.css'
import useUrl from '../../../hooks/useUrl';
import useTimeAlert from '../../../hooks/useTimeAlert'

const SecondFloorMeetingRoom = () => {
  const { id } = useParams()
  const myUrl = UseUrl()
  const [ablebtn, BookingConfirm] = useTimeAlert()


  //2층 미팅룸 API 사용 정보 불러오기
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
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {SecondMeetingRoominfo.map((room) => (
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

export default SecondFloorMeetingRoom;
