import styles from './FourthFloorMap.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useUrl from '../../../hooks/useUrl'
import useTimeAlert from '../../../hooks/useTimeAlert'
import { EmojiFrownFill } from 'react-bootstrap-icons'

const FourthFloorMap = () => {
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

  // roomFull 함수 설정
  // 현재 시간을 통해 남은 예약 가능 시간 확인
  const Now = new Date()
  const NowHour = Now.getHours()
  const OverHour = NowHour + 1
  const RemainTime = 21 - OverHour
  // console.log(RemainTime)

  const notroomFull = (roomid) => {
    // 09:00 과 같은 형태를 9로 수정해주는 함수
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
        {roomData.map((rooms) => (
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
              {notroomFull(rooms.roomId) && ablebtn
                ? rooms.roomName
                : `${rooms.roomName}\n마감`}
            </div>
          </Link>
        ))}
        <div className={styles.office} id={styles.notSelect}>
          {`office`}
        </div>
      </div>
    </div>
  )
}

export default FourthFloorMap
