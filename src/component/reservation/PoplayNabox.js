import styles from './Poplay.module.css'

const PoplayNabox = ({ userName, startTime, endTime, roomName }) => {
  return (
    <div>
      <h4 id={styles.userName}>{userName}</h4>
      <hr />
      <p id={styles.time}>
        <i className="bi bi-stopwatch-fill"></i>
        &nbsp;&nbsp;
        {startTime} - {endTime}
      </p>
      <p id={styles.roomName}>
        <i className="bi bi-geo-alt-fill"></i>
        &nbsp;&nbsp;
        {roomName}
      </p>
    </div>
  )
}

export default PoplayNabox
