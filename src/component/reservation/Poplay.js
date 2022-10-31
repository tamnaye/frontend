import styles from './Poplay.module.css'
import { ClockFill, PeopleFill, PinAngleFill } from 'react-bootstrap-icons'

// 참가자 list를 이름별로 공백을 넣어서 보여주는 함수
const listOut = (array) => {
  let output = ''
  for (const people of array) {
    output += people + ' '
  }
  return output
}

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
        {listOut(participants)}
      </p>
    </div>
  )
}

export default Poplay
