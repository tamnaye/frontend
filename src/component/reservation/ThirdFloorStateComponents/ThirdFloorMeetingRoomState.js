import React from 'react'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorMeetingRoomState.module.css'

const ThirdFloorMeetingRoomState = () => {
  const thirdFloor = dummy.thirdFloor
  const thirdFloorMeetingRoomList = thirdFloor.filter(
    (thirdFloor) => thirdFloor.room_type === 'meetingRoom'
  )
  return (
    <div className={styles.tableBox}>
      <table className="table table-bordered" id={styles.table}>
        <thead className="table-light" id={styles.thead}>
          <tr id={styles.theadTr}>
            <th className="table-primary" id={styles.time}></th>
            {thirdFloorMeetingRoomList.map((value) => (
              <th
                key={value.room_id}
                className="table-primary"
                id={styles.text}
              >
                {value.room_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id={styles.tbody}>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>9시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>10시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>11시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>12시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>1시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>2시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>3시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>4시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>5시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>6시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>7시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
          <tr id={styles.tbodyTr}>
            <th className={styles.time}>8시</th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
            <th className={styles.roomstate}></th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ThirdFloorMeetingRoomState
