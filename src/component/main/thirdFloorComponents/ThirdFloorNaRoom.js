import { useState } from 'react'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorNaRoom.module.css'

const ThirdFloorNaRoom = () => {
  const thirdFloorNaBox = dummy.thirdFloor.filter(
    (rooms) => rooms.room_type === 'nabox'
  )

  const thirdFloorNaBoxState = thirdFloorNaBox.map((room) => room.room_full)
  const [NaBoxState, setNaBoxState] = useState(thirdFloorNaBoxState)

  return (
    <div className={styles.NaBoxContainer}>
      <h4 className={styles.title}>Na Box</h4>
      <div className={styles.roomContainer}>
        {thirdFloorNaBox.map((room, ind) => (
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

export default ThirdFloorNaRoom
