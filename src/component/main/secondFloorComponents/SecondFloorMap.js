import styles from './SecondFloorMap.module.css'
import dummy from '../../../db/data.json'
import { useState } from 'react'

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

  return (
    <div className={styles.Container}>
      <div className={styles.mapContainer}>
        {secondFloorMeetingRoom.map((rooms, idx) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={MeetingRoomState[idx] ? [styles.full] : [styles.MeetingRoom]}
          >
            {MeetingRoomState[idx] ? '마감' : rooms.room_name}
          </div>
        ))}
        {secondFloorNaBox.map((rooms, idx) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={NaBoxState[idx] ? [styles.full] : [styles.NaBax]}
          >
            {NaBoxState[idx] ? '마감' : rooms.room_name}
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
