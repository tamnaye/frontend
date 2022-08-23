import styles from './ThirdFloorMap.module.css'
import dummy from '../../../db/data.json'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

const ThirdFloorMap = () => {
  //3층 API 정보 가져오기
  const Thirdroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 3
  )
  const ThirdMeetingRoominfo = Thirdroomsinfo.filter(
    (rooms) => rooms.room_id <= 304
  )
  const ThirdNaboxinfo = Thirdroomsinfo.filter((rooms) => rooms.room_id >= 305)

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
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        {ThirdMeetingRoominfo.map((rooms, idx) => (
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
        {ThirdNaboxinfo.map((rooms, idx) => (
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
  )
}

export default ThirdFloorMap
