import FourthFloorMap from './FourthFloorMap'
import FourthFloorMeetingRoom from './FourthFloorMeetingRoom'
import styles from './FourthFloor.module.css'
import { useState, useEffect } from 'react'
import useUrl from '../../../hooks/useUrl'
import useTimeAlert from '../../../hooks/useTimeAlert'

const FourthFloor = () => {
  const myUrl = useUrl()
  const [ablebtn, BookingConfirm] = useTimeAlert()

  //4층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([])
  const [roomData, setRoomData] = useState([])

  const url = `http://${myUrl}/api/booking/main?floor=4`
  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData)
        setRoomData(data.RoomData)
      })
  }, [url, myUrl])

  return (
    <div className={styles.MainFourthFloor}>
      <div className={styles.FourthFloor}>
        <h2>4 Floor</h2>
        <div className={styles.FourthFloorcontainer}>
          <FourthFloorMap
            className={styles.FourthFloorMap}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            bookingData={bookingData}
            roomData={roomData}
          />
          <div className={styles.RoomContainer}>
            <FourthFloorMeetingRoom
              className={styles.meetingRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              bookingData={bookingData}
              roomData={roomData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourthFloor
