import styles from './SecondFloorMap.module.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import UseUrl from '../../../hooks/UseUrl'

const SecondFloorMap = () => {
  const { id } = useParams()
  const myUrl = UseUrl()

  //2층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([])
  const [roomData, setRoomData] = useState([])

  useEffect(() => {
    fetch(`http://${myUrl}/api/booking/main?floor=2`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data.BookingData)
        setRoomData(data.RoomData)
      })
  }, [`htttp://${myUrl}/api/booking/main?floor=2`])

  const SecondMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  )

  const SecondNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox')

  // roomFull 함수 설정
  const roomFull = (roomid) => {
    const roomState = bookingData.filter((room) => room.roomId === roomid)

    const TimeToString = (time) => {
      let newTime
      if (time === '09:00') {
        newTime = time.substr(1, 1)
      } else {
        newTime = time.substr(0, 2)
      }
      return newTime
    }

    const roomBookingState = roomState.map(
      (room) =>
        TimeToString(room.endTime) - Number(TimeToString(room.startTime))
    )
    const sum = roomBookingState.reduce(function add(sum, currValue) {
      return sum + currValue
    }, 0)

    return sum === 12
  }

  return (
    <div className={styles.Container}>
      <div className={styles.mapContainer}>
        {SecondMeetingRoominfo.map((rooms) => (
          <div
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={roomFull(rooms.roomId) ? [styles.full] : [styles.MeetingRoom]}
          >
            <Link to={`/booking/${rooms.roomId}/${id}`}>
              {roomFull(rooms.roomId) ? '마감' : rooms.roomName}
            </Link>
          </div>
        ))}
        {SecondNaboxinfo.map((rooms) => (
          <div
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={roomFull(rooms.roomId) ? [styles.full] : [styles.NaBax]}
          >
            <Link to={`/booking/${rooms.roomId}/${id}`}>
              {roomFull(rooms.roomId) ? '마감' : rooms.roomName}
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
