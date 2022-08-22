import { useState } from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorMeetingRoom.module.css'
import useFetch from '../../../hooks/useFetch'

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

  //3층 미팅룸 API 사용 정보 불러오기
  const Thirdroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 3
  )

  const ThirdMeetingRoominfo = Thirdroomsinfo.filter(
    (rooms) => rooms.room_id <= 304
  )

  return (
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {ThirdMeetingRoominfo.map((room, ind) => (
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

export default ThirdFloorMeetingRoom
