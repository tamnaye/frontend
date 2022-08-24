import { useState } from 'react';
import ThirdFloorNaRoomState from './ThirdFloorNaRoomState';
import ThirdFloorMeetingRoomState from './ThirdFloorMeetingRoomState';
import styles from './ThirdFloorReservationState.module.css';

const ThirdFloorReservationState = () => {
  const [RoomType, setRoomType] = useState(true);
  const MeetingRoom = true;
  const NaBox = false;
  const MeetingRoomOnClick = () => {
    setRoomType(MeetingRoom);
  };
  const NaboxOnClick = () => {
    setRoomType(NaBox);
  };

  return (
    <div>
      <div className={styles.ReservationStateContainer}>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={MeetingRoomOnClick}>
            회의실
          </button>
          <button className={styles.button} onClick={NaboxOnClick}>
            Na Box
          </button>
        </div>
        <div className={styles.Reservation}>
          {RoomType ? (
            <ThirdFloorMeetingRoomState className={styles.reservationTable} />
          ) : (
            <ThirdFloorNaRoomState className={styles.reservationTable} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdFloorReservationState;
