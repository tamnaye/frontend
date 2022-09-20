import FourthFloorMap from './FourthFloorMap';
import FourthFloorMeetingRoom from './FourthFloorMeetingRoom';
import styles from './FourthFloor.module.css';

const FourthFloor = ({
  ablebtn,
  BookingConfirm,
  bookingData,
  roomData,
  FourthFloorinfo,
}) => {
  return (
    <div className={styles.MainFourthFloor}>
      <div className={styles.FourthFloor}>
        <h2>4 Floor</h2>
        <div className={styles.FourthFloorcontainer}>
          <FourthFloorMap
            className={styles.FourthFloorMap}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            bookingData={bookingData}
            roomData={roomData}
            FourthFloorinfo={FourthFloorinfo}
          />
          <div className={styles.RoomContainer}>
            <FourthFloorMeetingRoom
              className={styles.meetingRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              bookingData={bookingData}
              roomData={roomData}
              FourthFloorinfo={FourthFloorinfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthFloor;
