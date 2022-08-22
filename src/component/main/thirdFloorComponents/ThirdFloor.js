import ThirdFloorMap from './ThirdFloorMap'
import ThirdFloorMeetingRoom from './ThirdFloorMeetingRoom.js'
import ThirdFloorNaRoom from './ThirdFloorNaRoom.js'
import styles from './ThirdFloor.module.css'

const ThirdFloor = () => {
  return (
    <div className={styles.MainThirdFloor}>
      <div className={styles.ThirdFloor}>
        <h2>3 Floor</h2>
        <div className={styles.ThirdFloorcontainer}>
          <ThirdFloorMap className={styles.ThirdFloorMap} />
          <div className={styles.RoomContainer}>
            <ThirdFloorMeetingRoom className={styles.meetingRoom} />
            <ThirdFloorNaRoom className={styles.naRoom} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThirdFloor
