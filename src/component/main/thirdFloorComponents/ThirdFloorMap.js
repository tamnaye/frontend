import styles from './ThirdFloorMap.module.css'
import dummy from '../../../db/data.json'
import { useState } from 'react'

const ThirdFloorMap = () => {
  //3층 meetingroom
  const thirdFloorMeetingRoom = dummy.thirdFloor.filter(
    (rooms) => rooms.room_type === 'meetingRoom'
  )
  const thirdFloorMeetingRoomState = thirdFloorMeetingRoom.map(
    (room) => room.room_full
  )
  const [MeetingRoomState, setMeetingRoomState] = useState(
    thirdFloorMeetingRoomState
  )

  //3층 nabox
  const thirdFloorNaBox = dummy.thirdFloor.filter(
    (rooms) => rooms.room_type === 'nabox'
  )
  const thirdFloorNaBoxState = thirdFloorNaBox.map((room) => room.room_full)

  const [NaBoxState, setNaBoxState] = useState(thirdFloorNaBoxState)

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        {thirdFloorMeetingRoom.map((rooms, idx) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={MeetingRoomState[idx] ? [styles.full] : [styles.MeetingRoom]}
          >
            {MeetingRoomState[idx] ? '마감' : rooms.room_name}
          </div>
        ))}
        {thirdFloorNaBox.map((rooms, idx) => (
          <div
            key={rooms.room_id}
            className={styles[rooms.room_name]}
            id={NaBoxState[idx] ? [styles.full] : [styles.NaBax]}
          >
            {NaBoxState[idx] ? '마감' : rooms.room_name}
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
