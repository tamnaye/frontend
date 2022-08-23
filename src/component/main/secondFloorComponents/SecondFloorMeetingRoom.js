import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../../db/data.json'
import styles from './SecondFloorMeetingRoom.module.css'
import useFetch from '../../../hooks/useFetch'

const SecondFloorMeetingRoom = () => {
  //2층 미팅룸 API 사용 정보 불러오기

  const Secondroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 2
  )
  const SecondMeetingRoominfo = Secondroomsinfo.filter(
    (rooms) => rooms.room_id <= 211
  )

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
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {SecondMeetingRoominfo.map((room) => (
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
  )
}

export default SecondFloorMeetingRoom
