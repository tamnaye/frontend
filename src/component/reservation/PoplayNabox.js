import styles from './Poplay.module.css'
import { ClockFill, PinAngleFill } from 'react-bootstrap-icons'

const PoplayNabox = ({ userName, startTime, endTime, roomName }) => {
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
    </div>
  )
}

export default PoplayNabox
