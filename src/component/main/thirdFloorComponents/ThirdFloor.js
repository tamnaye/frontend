import ThirdFloorMap from './ThirdFloorMap'
import ThirdFloorMeetingRoom from './ThirdFloorMeetingRoom.js'
import ThirdFloorNaRoom from './ThirdFloorNaRoom.js'
import styles from './ThirdFloor.module.css'

import { useState, useEffect } from 'react'
import useUrl from '../../../hooks/useUrl'
import useTimeAlert from '../../../hooks/useTimeAlert'

const ThirdFloor = () => {
  const [ablebtn, BookingConfirm] = useTimeAlert()

  //3층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([])
  const [roomData, setRoomData] = useState([])

  const myUrl = useUrl()
  const url = `http://${myUrl}/api/booking/main?floor=3`
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

  const ThirdMeetingStudioinfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting' || rooms.roomType === 'studio'
  )

  const ThirdNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox')

  return (
    <div className={styles.MainThirdFloor}>
      <div className={styles.ThirdFloor}>
        <h2>3 Floor</h2>
        <div className={styles.ThirdFloorcontainer}>
          <ThirdFloorMap
            className={styles.ThirdFloorMap}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
            ThirdNaboxinfo={ThirdNaboxinfo}
            bookingData={bookingData}
            roomData={roomData}
          />
          <div className={styles.RoomContainer}>
            <ThirdFloorMeetingRoom
              className={styles.meetingRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
            <ThirdFloorNaRoom
              className={styles.naRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              ThirdNaboxinfo={ThirdNaboxinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThirdFloor
