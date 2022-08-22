import { useState } from 'react'
import dummy from '../../../db/data.json'
import styles from './SecondFloorNaRoom.module.css'

const SecondFloorNaRoom = () => {
  const secondFloorNaBox = dummy.secondFloor.filter(
    (rooms) => rooms.room_type === 'nabox'
  )

  const secondFloorNaBoxState = secondFloorNaBox.map((room) => room.room_full)
  const [NaBoxState, setNaBoxState] = useState(secondFloorNaBoxState)

  return (
    <div className={styles.NaBoxContainer}>
      <h4 className={styles.title}>Na Box</h4>
      <div className={styles.roomContainer}>
        {secondFloorNaBox.map((room, ind) => (
          <button
            key={room.room_id}
            className={NaBoxState[ind] ? [styles.full] : [styles.notfull]}
          >
            {room.room_name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SecondFloorNaRoom
