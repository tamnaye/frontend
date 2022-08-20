import React from 'react'
import { useState } from 'react'
import dummy from '../../../db/data.json'
import styles from './SecondFloorMeetingRoom.module.css'

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

  return (
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {secondFloorMeetingRoom.map((room, ind) => (
          <button
            key={room.room_id}
            className={MeetingRoomState[ind] ? [styles.full] : [styles.notfull]}
          >
            {room.room_name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SecondFloorMeetingRoom
