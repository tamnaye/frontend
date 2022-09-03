import FourthFloorMap from './FourthFloorMap'
import FourthFloorMeetingRoom from './FourthFloorMeetingRoom'
import styles from './FourthFloor.module.css'

const FourthFloor = () => {
  return (
    <div className={styles.MainFourthFloor}>
      <div className={styles.FourthFloor}>
        <h2>4 Floor</h2>
        <div className={styles.FourthFloorcontainer}>
          <FourthFloorMap className={styles.FourthFloorMap} />
          <div className={styles.RoomContainer}>
            <FourthFloorMeetingRoom className={styles.meetingRoom} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourthFloor
