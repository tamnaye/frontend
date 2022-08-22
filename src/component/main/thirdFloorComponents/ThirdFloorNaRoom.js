import { useState } from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../../db/data.json'
import styles from './ThirdFloorNaRoom.module.css'
import useFetch from '../../../hooks/useFetch'

const ThirdFloorNaRoom = () => {
  const thirdFloorNaBox = dummy.thirdFloor.filter(
    (rooms) => rooms.room_type === 'nabox'
  )

  const thirdFloorNaBoxState = thirdFloorNaBox.map((room) => room.room_full)
  const [NaBoxState, setNaBoxState] = useState(thirdFloorNaBoxState)

  //
  const Thirdroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 3
  )

  const ThirdNaboxinfo = Thirdroomsinfo.filter((rooms) => rooms.room_id >= 305)

  console.log(ThirdNaboxinfo)

  return (
    <div className={styles.NaBoxContainer}>
      <h4 className={styles.title}>Na Box</h4>
      <div className={styles.roomContainer}>
        {ThirdNaboxinfo.map((room, ind) => (
          <button
            key={room.room_id}
            className={NaBoxState[ind] ? [styles.full] : [styles.notfull]}
          >
            <Link to={`/booking/${room.room_id}`}>{room.room_name}</Link>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThirdFloorNaRoom
