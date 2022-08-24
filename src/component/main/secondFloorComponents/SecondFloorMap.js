import styles from './SecondFloorMap.module.css'
import dummy from '../../../db/data.json'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

const SecondFloorMap = () => {
  //2층 API 정보 가져오기
  const Secondroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 2
  )
  const SecondMeetingRoominfo = Secondroomsinfo.filter(
    (rooms) => rooms.room_id <= 211
  )
  const SecondNaboxinfo = Secondroomsinfo.filter(
    (rooms) => rooms.room_id >= 212
  )

  // roomFull 함수 설정
  const roomFull = (roomid) => {
    const roomState = dummy.bookingData2.filter(
      (room) => room.roomId === roomid
    )

    const TimeToString = (time) => {
      let newTime
      if (time === '09:00') {
        newTime = time.substr(1, 1)
      } else {
        newTime = time.substr(0, 2)
      }
      return newTime
    }

    const roomBookingState = roomState.map(
      (room) =>
        TimeToString(room.endTime) - Number(TimeToString(room.startTime))
    )
    const sum = roomBookingState.reduce(function add(sum, currValue) {
      return sum + currValue
    }, 0)

    return sum === 12
  }

  return (
    <div className={styles.Container}>
      <div className={styles.mapContainer}>
        {SecondMeetingRoominfo.map((rooms) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={roomFull(rooms.room_id) ? [styles.full] : [styles.MeetingRoom]}
          >
            <Link to={`/booking/${rooms.room_id}`}>
              {roomFull(rooms.room_id) ? '마감' : rooms.room_name}
            </Link>
          </div>
        ))}
        {SecondNaboxinfo.map((rooms) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={roomFull(rooms.room_id) ? [styles.full] : [styles.NaBax]}
          >
            <Link to={`/booking/${rooms.room_id}`}>
              {roomFull(rooms.room_id) ? '마감' : rooms.room_name}
            </Link>
          </div>
        ))}

        <div className={styles.space범섬} id={styles.notSelect}>
          space 범섬
        </div>
        <div className={styles.Lounge} id={styles.notSelect}>
          내일-Lounge
        </div>

        <div className={styles.화장실} id={styles.notSelect}>
          화<br />장 <br />실
        </div>
        <div className={styles.stair} id={styles.notSelect}>
          stair
        </div>
        <div className={styles.EV} id={styles.notSelect}>
          E.V
        </div>
        <div className={styles.Stair2} id={styles.notSelect}>
          Stair
        </div>
        <div className={styles.space우도} id={styles.notSelect}>
          space 우도
        </div>
        <div className={styles.space비양도} id={styles.notSelect}>
          space 비양도
        </div>
      </div>
    </div>
  )
}

export default SecondFloorMap