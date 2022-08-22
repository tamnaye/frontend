import { useState } from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../../db/data.json'
import styles from './SecondFloorNaRoom.module.css'
import useFetch from '../../../hooks/useFetch'

const SecondFloorNaRoom = () => {
  const secondFloorNaBox = dummy.secondFloor.filter(
    (rooms) => rooms.room_type === 'nabox'
  )

  const secondFloorNaBoxState = secondFloorNaBox.map((room) => room.room_full)
  const [NaBoxState, setNaBoxState] = useState(secondFloorNaBoxState)

  //

  const Secondroomsinfo = useFetch('http://144.24.91.218:8000/rooms/').filter(
    (rooms) => rooms.floor === 2
  )

  const SecondNaboxinfo = Secondroomsinfo.filter(
    (rooms) => rooms.room_id >= 212
  )
  console.log(SecondNaboxinfo)

  return (
    <div className={styles.NaBoxContainer}>
      <h4 className={styles.title}>Na Box</h4>
      <div className={styles.roomContainer}>
        {SecondNaboxinfo.map((room, ind) => (
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

export default SecondFloorNaRoom
