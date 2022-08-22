import { useState } from 'react'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorMeetingRoom.module.css'

const ThirdFloorMeetingRoom = () => {
  const thirdFloorMeetingRoom = dummy.thirdFloor.filter(
    (rooms) => rooms.room_type === 'meetingRoom'
  )

  const thirdFloorMeetingRoomState = thirdFloorMeetingRoom.map(
    (room) => room.room_full
  )
  const [MeetingRoomState, setMeetingRoomState] = useState(
    thirdFloorMeetingRoomState
  )

  return (
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {thirdFloorMeetingRoom.map((room, ind) => (
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

export default ThirdFloorMeetingRoom
