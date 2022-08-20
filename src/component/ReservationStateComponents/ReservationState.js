import styles from './ReservationState.module.css'
import ThirdFloorReservationState from './ThirdFloorStateComponents/ThirdFloorReservationState'
import SecondFloorReservationState from './SecondFloorStateComponents/SecondFloorReservationState'
import { useState } from 'react'

const ReservationState = () => {
  const [stair, setStair] = useState(true)
  const secondFloor = true
  const thirdFloor = false
  const secondOnClick = () => {
    setStair(secondFloor)
  }
  const thirdOnClick = () => {
    setStair(thirdFloor)
  }
  return (
    <div className={styles.ReservationStateContainer}>
      <h2>시간대별 예약현황</h2>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={secondOnClick}>
          2층
        </button>
        <button className={styles.button} onClick={thirdOnClick}>
          3층
        </button>
      </div>
      {stair ? (
        <SecondFloorReservationState className={styles.reservationTable} />
      ) : (
        <ThirdFloorReservationState className={styles.reservationTable} />
      )}
    </div>
  )
}

export default ReservationState
