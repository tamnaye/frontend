import { useState } from 'react'
import SecondFloorMeetingRoomState from './SecondFloorStateComponents/SecondFloorMeetingRoomState'
import SecondFloorNaRoomState from './SecondFloorStateComponents/SecondFloorNaRoomState'
import ThirdFloorNaRoomState from './ThirdFloorStateComponents/ThirdFloorNaRoomState'
import ThirdFloorMeetingRoomState from './ThirdFloorStateComponents/ThirdFloorMeetingRoomState'
import styles from './SecondAndThirdReservationState.module.css'

const SecondAndThirdReservationState = () => {
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
          {RoomType
            ? [
                <SecondFloorMeetingRoomState
                  key="2"
                  className={styles.reservationTable}
                />,
                <ThirdFloorMeetingRoomState
                  key="3"
                  className={styles.reservationTable}
                />,
              ]
            : [
                <SecondFloorNaRoomState
                  key="2"
                  className={styles.reservationTable}
                />,
                <ThirdFloorNaRoomState
                  key="3"
                  className={styles.reservationTable}
                />,
              ]}
        </div>
      </div>
    </div>
  )
}

export default SecondAndThirdReservationState
