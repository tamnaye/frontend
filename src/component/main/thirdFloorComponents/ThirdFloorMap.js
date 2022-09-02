import styles from './ThirdFloorMap.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useUrl from '../../../hooks/useUrl'
import useTimeAlert from '../../../hooks/useTimeAlert'
import { EmojiFrownFill } from 'react-bootstrap-icons'

const ThirdFloorMap = () => {
  const myUrl = useUrl()
  const [ablebtn, BookingConfirm] = useTimeAlert()

  //3층 API 정보 가져오기
  const [bookingData, setBookingData] = useState([])
  const [roomData, setRoomData] = useState([])

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

  const ThirdMeetingRoominfo = roomData.filter(
    (rooms) => rooms.roomType === 'meeting'
  )

  const ThirdNaboxinfo = roomData.filter((rooms) => rooms.roomType === 'nabox')

  // roomFull 함수 설정
  // 현재 시간을 통해 남은 예약 가능 시간 확인
  const Now = new Date()
  const NowHour = Now.getHours()
  const OverHour = NowHour + 1
  const RemainTime = 21 - OverHour
  // console.log(RemainTime)

  const notroomFull = (roomid) => {
    // 09:00 과 같은 형태 9로 수정해주는 함수
    const TimeToString = (time) => {
      let newTime
      if (time === '09:00') {
        newTime = time.substr(1, 1)
      } else {
        newTime = time.substr(0, 2)
      }
      return newTime
    }
    // room아이디와 현재 시간으로 거른 예약 현황
    const roomState = bookingData.filter(
      (room) =>
        room.roomId === roomid &&
        Number(TimeToString(room.startTime)) >= Number(OverHour)
    )
    // 거른 예약 현황을 대상으로 시간 추출 리스트
    const roomBookingState = roomState.map(
      (room) =>
        TimeToString(room.endTime) - Number(TimeToString(room.startTime))
    )
    // 추출한 시간 합치기
    const sum = roomBookingState.reduce(function add(sum, currValue) {
      return sum + currValue
    }, 0)
    // 합과 남은 시간 불린으로 결과값 제출
    return sum < RemainTime
  }

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        {ablebtn ? null : (
          <h2 className={styles.alert}>
            <EmojiFrownFill />
            &nbsp;현재는 예약 시간이 아닙니다
          </h2>
        )}
        {ThirdMeetingRoominfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}`}
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={
              notroomFull(rooms.roomId) && ablebtn
                ? [styles.MeetingRoom]
                : [styles.full]
            }
            onClick={BookingConfirm}
          >
            <div>
              {notroomFull(rooms.roomId) && ablebtn ? rooms.roomName : '마감'}
            </div>
          </Link>
        ))}
        {ThirdNaboxinfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}`}
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={
              notroomFull(rooms.roomId) && ablebtn
                ? [styles.NaBox]
                : [styles.full]
            }
            onClick={BookingConfirm}
          >
            <div>
              {notroomFull(rooms.roomId) && ablebtn
                ? rooms.roomName.substr(6, 1)
                : '마감'}
            </div>
          </Link>
        ))}

        <div className={styles.Lounge} id={styles.notSelect}>
          {`더큰\nLounge`}
        </div>
        <div className={styles.더큰내일스튜디오} id={styles.notSelect}>
          {`더\n큰\n내\n일\n스\n튜\n디\n오`}
        </div>
        <div className={styles.space수월봉} id={styles.notSelect}>
          {`space\n수월봉`}
        </div>
        <div className={styles.화장실} id={styles.notSelect}>
          화장실
        </div>
        <div className={styles.Stair} id={styles.notSelect}>
          계단
        </div>
        <div className={styles.EV} id={styles.notSelect}>
          E.V
        </div>
        <div className={styles.Stair2} id={styles.notSelect}>
          계단
        </div>
        <div className={styles.space일출봉} id={styles.notSelect}>
          {`space\n일출봉`}
        </div>
      </div>
    </div>
  )
}

export default ThirdFloorMap
