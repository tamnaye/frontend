import ThirdFloorMap from './ThirdFloorMap';
import ThirdFloorMeetingRoom from './ThirdFloorMeetingRoom.js';
import ThirdFloorNaRoom from './ThirdFloorNaRoom.js';
import styles from './ThirdFloor.module.css';

const ThirdFloor = ({
  ablebtn,
  BookingConfirm,
  ThirdMeetingStudioinfo,
  ThirdNaboxinfo,
  bookingData,
  roomData,
}) => {
  return (
    <div className={styles.MainThirdFloor}>
      <div className={styles.ThirdFloor}>
        <h2>3 Floor</h2>
        <div className={styles.ThirdFloorcontainer}>
          <ThirdFloorMap
            className={styles.ThirdFloorMap}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
            ThirdNaboxinfo={ThirdNaboxinfo}
            bookingData={bookingData}
            roomData={roomData}
          />
          <div className={styles.RoomContainer}>
            <ThirdFloorMeetingRoom
              className={styles.meetingRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
            <ThirdFloorNaRoom
              className={styles.naRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              ThirdNaboxinfo={ThirdNaboxinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdFloor;
