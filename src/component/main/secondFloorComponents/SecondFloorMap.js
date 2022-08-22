import styles from './SecondFloorMap.module.css'
import dummy from '../../../db/data.json'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'

const SecondFloorMap = () => {
  //2층 meeitngroom
  const secondFloorMeetingRoom = dummy.secondFloor.filter(
    (rooms) => rooms.room_type === 'meetingRoom'
  )
  const secondFloorMeetingRoomState = secondFloorMeetingRoom.map(
    (room) => room.room_full
  )
  const [MeetingRoomState, setMeetingRoomState] = useState(
    secondFloorMeetingRoomState
  )
  //2층 nabox
  const secondFloorNaBox = dummy.secondFloor.filter(
    (rooms) => rooms.room_type === 'nabox'
  )
  const secondFloorNaBoxState = secondFloorNaBox.map((room) => room.room_full)
  const [NaBoxState, setNaBoxState] = useState(secondFloorNaBoxState)

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

  return (
    <div className={styles.Container}>
      <div className={styles.mapContainer}>
        {SecondMeetingRoominfo.map((rooms, idx) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={MeetingRoomState[idx] ? [styles.full] : [styles.MeetingRoom]}
          >
            <Link to={`/booking/${rooms.room_id}`}>
              {MeetingRoomState[idx] ? '마감' : rooms.room_name}
            </Link>
          </div>
        ))}
        {SecondNaboxinfo.map((rooms, idx) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={NaBoxState[idx] ? [styles.full] : [styles.NaBax]}
          >
            <Link to={`/booking/${rooms.room_id}`}>
              {NaBoxState[idx] ? '마감' : rooms.room_name}
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
