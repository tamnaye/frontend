import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../../db/data.json'
import styles from './SecondFloorMeetingRoom.module.css'
import useFetch from '../../../hooks/useFetch'

const SecondFloorMeetingRoom = () => {
  const secondFloorMeetingRoom = dummy.secondFloor.filter(
    (rooms) => rooms.room_type === 'meetingRoom'
  )

  const secondFloorMeetingRoomState = secondFloorMeetingRoom.map(
    (room) => room.room_full
  )
  const [MeetingRoomState, setMeetingRoomState] = useState(
    secondFloorMeetingRoomState
  )

  //

  const Secondroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 2
  )
  const SecondMeetingRoominfo = Secondroomsinfo.filter(
    (rooms) => rooms.room_id <= 211
  )

  console.log(SecondMeetingRoominfo)

  return (
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {SecondMeetingRoominfo.map((room, ind) => (
          <button
            key={room.room_id}
            className={MeetingRoomState[ind] ? [styles.full] : [styles.notfull]}
          >
            <Link to={`/booking/${room.room_id}`}>{room.room_name}</Link>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SecondFloorMeetingRoom
