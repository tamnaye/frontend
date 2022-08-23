import styles from './ReservationState.module.css'
import ThirdFloorReservationState from './ThirdFloorStateComponents/ThirdFloorReservationState'
import SecondFloorReservationState from './SecondFloorStateComponents/SecondFloorReservationState'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import ThirdFloorMeetingRoomState from './ThirdFloorStateComponents/ThirdFloorMeetingRoomState'
import ThirdFloorNaRoomState from './ThirdFloorStateComponents/ThirdFloorNaRoomState'
import SecondFloorMeetingRoomState from './SecondFloorStateComponents/SecondFloorMeetingRoomState'
import SecondFloorNaRoomState from './SecondFloorStateComponents/SecondFloorNaRoomState'

const ReservationState = () => {
  const userClasses = 6
  const MaxClasses = 7
  //
  // const { id } = useParams()
  // console.log(id)

  // const [data, setData] = useState([])
  // useEffect(() => {
  //   fetch(`http://192.168.5.60:8080/api/user/data?userId=22106045`, {
  //     method: 'GET',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //     })
  // }, [`http://192.168.5.60:8080/api/user/data?userId=22106045`])
  // console.log(data)
  // const userClasses = data.userData.classes
  // const MaxClasses = data.maxClasses
  //

  return (
    <div className={styles.ReservationStateContainer}>
      <h2>시간대별 예약현황</h2>
      {userClasses === MaxClasses ? (
        <ThirdFloorReservationState className={styles.reservationTable} />
      ) : (
        <SecondFloorReservationState className={styles.reservationTable} />
      )}
      {/* {stair ? (
        <SecondFloorReservationState className={styles.reservationTable} />
      ) : (
        <ThirdFloorReservationState className={styles.reservationTable} />
      )} */}
    </div>
  )
}

export default ReservationState
