import styles from './Poplay.module.css'

const Poplay = ({ userName, startTime, endTime, roomName, participants }) => {
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
      <p id={styles.participants}>
        <i className="bi bi-people-fill"></i>
        &nbsp;&nbsp;
        {participants}
      </p>
    </div>
  )
}

export default Poplay
