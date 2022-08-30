import styles from './Poplay.module.css'
import { ClockFill, PeopleFill, PinAngleFill } from 'react-bootstrap-icons'

const Poplay = ({ userName, startTime, endTime, roomName, participants }) => {
  return (
    <div>
      <h4 id={styles.userName}>{userName}</h4>
      <hr />
      <p id={styles.time}>
        <ClockFill />
        &nbsp;&nbsp;
        {startTime} - {endTime}
      </p>
      <p id={styles.roomName}>
        <PinAngleFill />
        &nbsp;&nbsp;
        {roomName}
      </p>
      <p id={styles.participants}>
        <PeopleFill />
        &nbsp;&nbsp;
        {participants}
      </p>
    </div>
  )
}

export default Poplay
