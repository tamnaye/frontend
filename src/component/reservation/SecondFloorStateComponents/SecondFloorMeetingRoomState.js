import React from 'react';
import { useState, useEffect } from 'react';
import styles from './SecondFloorMeetingRoomState.module.css';

const SecondFloorMeetingRoomState = () => {
  // API 2층 회의실 가져오기

  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.5.127:8080/api/booking/main?floor=2`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData);
        setRoomData(data.RoomData);
      });
  }, [`htttp://192.168.5.127:8080/api/booking/main?floor=2`]);

  const SecondMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  );

  // 타임 리스트 돌리기
  let timeList = [];
  for (let i = 9; i <= 20; i++) {
    timeList.push(i + '시');
  }

  // 09:00 형태 9로 숫자만 뽑아주는 함수
  const TimeToString = (time) => {
    let newTime;
    if (time === '09:00') {
      newTime = time.substr(1, 1);
    } else {
      newTime = time.substr(0, 2);
    }
    return newTime;
  };

  // 9시 형태 9로 숫자만 뽑아주는 함수
  const onlyTime = (time) => {
    let newTime;
    if (time === '9시') {
      newTime = time.substr(0, 1);
    } else {
      newTime = time.substr(0, 2);
    }
    return newTime;
  };

  // 시간당 룸의 예약 데이터 불러오는 함수
  const TimeAndRoomFilter = (Time, Room) => {
    let timedata = bookingData.filter(
      (room) =>
        room.roomId === Room && TimeToString(room.startTime) === onlyTime(Time)
    );
    return timedata;
  };

  // 시간당 룸의 예약이 있는지 없는지 함수
  const IsThisTimeRoombooked = (Time, Room) => {
    const IsTrue = TimeAndRoomFilter(Time, Room).length !== 0;
    return IsTrue;
  };

  return (
    <div className='table-responsive'>
      <table className='table table-bordered' id={styles.table}>
        <thead className='table-light' id={styles.thead}>
          <tr id={styles.theadTr}>
            <th className='table-primary' id={styles.time}></th>
            {SecondMeetingRoominfo.map((room) => (
              <th key={room.roomId} className='table-primary' id={styles.text}>
                {room.roomName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id={styles.tbody}>
          {/* 시간을 맵으로 돌려 전체 상태값 전달 */}
          {timeList.map((time) => (
            <tr key={time} id={styles.tbodyTr}>
              <th className={styles.time}>{time}</th>

              {/* 룸을 맵으로 돌려 하나의 시간에 상태값 전달 */}
              {SecondMeetingRoominfo.map((room) => (
                <th key={room.roomId} className={styles.roomstate}>
                  {IsThisTimeRoombooked(time, room.roomId)
                    ? `${TimeAndRoomFilter(time, room.roomId)[0].roomId} 완료`
                    : null}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecondFloorMeetingRoomState;
