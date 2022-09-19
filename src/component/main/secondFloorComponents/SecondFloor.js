import SecondFloorMap from './SecondFloorMap'
import SecondFloorMeetingRoom from './SecondFloorMeetingRoom'
import SecondFloorNaRoom from './SecondFloorNaRoom'
import styles from './SecondFloor.module.css'
import useUrl from '../../../hooks/useUrl'
import useTimeAlert from '../../../hooks/useTimeAlert'
import { useState, useEffect } from 'react'
import { fetchGet } from '../../../hooks/fetchUrl'
import { useLocation } from 'react-router-dom'

const SecondFloor = () => {
  const myUrl = useUrl()
  const [ablebtn, BookingConfirm] = useTimeAlert()

  //2층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([])
  const [roomData, setRoomData] = useState([])

  const [SinyangID, setSinYangID] = useState('')
  const [SinyangName, setSinYangName] = useState('')

  const userClasses = window.localStorage.getItem('class')

  const url = `http://${myUrl}/api/booking/main?floor=2`
  const location = useLocation()
  useEffect(() => {
fetchGet(url,location)
      .then((data) => {
        setBookingData(data.BookingData)
        setRoomData(data.RoomData)
        setSinYangID(
          data.RoomData.filter((rooms) => rooms.roomId === 207)[0].roomId
        )
        setSinYangName(
          data.RoomData.filter((rooms) => rooms.roomName === '신양')[0].roomName
        )
      })
  }, [url, myUrl])

  const SecondMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting' && rooms.roomName !== '신양'
  )

  const SecondNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox')

  return (
    <div className={styles.MainSecondFloor}>
      <div className={styles.SecondFloor}>
        <h2>2 Floor</h2>
        <div className={[styles.SecondFloorcontainer]}>
          <SecondFloorMap
            className={styles.SecondFloorMap}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            SecondMeetingRoominfo={SecondMeetingRoominfo}
            SecondNaboxinfo={SecondNaboxinfo}
            bookingData={bookingData}
            roomData={roomData}
            SinyangID={SinyangID}
            SinyangName={SinyangName}
            userClasses={userClasses}
          />
          <div className={styles.RoomContainer}>
            <SecondFloorMeetingRoom
              className={styles.meetingRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              SecondMeetingRoominfo={SecondMeetingRoominfo}
              bookingData={bookingData}
              roomData={roomData}
              SinyangID={SinyangID}
              SinyangName={SinyangName}
              userClasses={userClasses}
            />
            <SecondFloorNaRoom
              className={styles.naRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              SecondNaboxinfo={SecondNaboxinfo}
              bookingData={bookingData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondFloor
