import SecondFloorMap from './SecondFloorMap'
import SecondFloorMeetingRoom from './SecondFloorMeetingRoom'
import SecondFloorNaRoom from './SecondFloorNaRoom'
import styles from './SecondFloor.module.css'

const SecondFloor = () => {
  return (
    <div className={styles.MainSecondFloor}>
      <div className={styles.SecondFloor}>
        <h2>2 Floor</h2>
        <div className={[styles.SecondFloorcontainer]}>
          <SecondFloorMap className={styles.SecondFloorMap} />
          <div className={styles.RoomContainer}>
            <SecondFloorMeetingRoom className={styles.meetingRoom} />
            <SecondFloorNaRoom className={styles.naRoom} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondFloor
