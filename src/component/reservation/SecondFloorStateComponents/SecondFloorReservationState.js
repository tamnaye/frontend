import { useState } from 'react'
import SecondFloorMeetingRoomState from './SecondFloorMeetingRoomState'
import SecondFloorNaRoomState from './SecondFloorNaRoomState'
import styles from './SecondFloorReservationState.module.css'

const SecondFloorReservationState = () => {
  const [RoomType, setRoomType] = useState(true)
  const MeetingRoom = true
  const NaBox = false
  const MeetingRoomOnClick = () => {
    setRoomType(MeetingRoom)
  }
  const NaboxOnClick = () => {
    setRoomType(NaBox)
  }

  return (
    <div>
      {/* <SecondFloorMeetingRoomState />
      <SecondFloorNaRoomState /> */}
      <div className={styles.ReservationStateContainer}>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={MeetingRoomOnClick}>
            회의실
          </button>
          <button className={styles.button} onClick={NaboxOnClick}>
            Na Box
          </button>
        </div>
        <div className={styles.Reservation}>
          {RoomType ? (
            <SecondFloorMeetingRoomState
              key="meeting"
              className={styles.reservationTable}
            />
          ) : (
            <SecondFloorNaRoomState
              key="nabox"
              className={styles.reservationTable}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SecondFloorReservationState
