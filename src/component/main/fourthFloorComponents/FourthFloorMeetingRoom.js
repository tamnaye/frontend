import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './FourthFloorMeetingRoom.module.css'
import useUrl from '../../../hooks/useUrl'
import useTimeAlert from '../../../hooks/useTimeAlert'

const FourthFloorMeetingRoom = () => {
  const myUrl = useUrl()
  const [ablebtn, BookingConfirm] = useTimeAlert()

  //3층 미팅룸 API 사용 정보 불러오기
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
    <div className={styles.MeetingRoomContainer}>
      <h4 className={styles.title}>회의실</h4>
      <div className={styles.roomContainer}>
        {roomData.map((room) => (
          <Link to={`/booking/${room.roomId}`} key={room.roomId}>
            <button
              className={
                notroomFull(room.roomId) && ablebtn
                  ? [styles.notfull]
                  : [styles.full]
              }
              onClick={BookingConfirm}
            >
              {room.roomName}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FourthFloorMeetingRoom
