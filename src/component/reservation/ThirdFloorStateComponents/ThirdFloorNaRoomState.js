import React from 'react'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorNaRoomState.module.css'
import useFetch from '../../../hooks/useFetch'

const ThirdFloorNaRoomState = () => {
  // const thirdFloor = dummy.thirdFloor
  // const thirdFloorNaboxlist = thirdFloor.filter(
  //   (thirdFloor) => thirdFloor.room_type === 'nabox'
  // )

  // 무결님 데이터에서 3층 나박스 가져오기
  const Thirdroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 3
  )
  const ThirdNaboxinfo = Thirdroomsinfo.filter((rooms) => rooms.room_id >= 305)
  console.log(ThirdNaboxinfo)

  // 더미에서 부킹 상황 가져오기
  const roomState = dummy.bookingData3
  // const roomBooking = (roomid) => {
  //   const roomState = dummy.bookingData3.filter(
  //     (room) => room.roomId === roomid
  //   )
  // }
  console.log(roomState)

  let timeList = []
  for (let i = 9; i <= 20; i++) {
    timeList.push(i + '시')
  }

  return (
    <div>
      <table className="table table-bordered" id={styles.table}>
        <thead className="table-light" id={styles.thead}>
          <tr id={styles.theadTr}>
            <th className="table-primary text-break" id={styles.time}></th>

            {/* 룸 값 불러오기 */}
            {ThirdNaboxinfo.map((room) => (
              <th key={room.room_id} className="table-primary" id={styles.text}>
                {room.room_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id={styles.tbody}>
          {/* 시간 값 불러오기 */}
          {timeList.map((time, idx) => (
            <tr id={styles.tbodyTr}>
              <th className={styles.time}>{time}</th>
              <th className={styles.roomstate}></th>
              <th className={styles.roomstate}></th>
              <th className={styles.roomstate}></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ThirdFloorNaRoomState
