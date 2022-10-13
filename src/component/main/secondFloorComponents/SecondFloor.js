import SecondFloorMap from './SecondFloorMap';
import SecondFloorMeetingRoom from './SecondFloorMeetingRoom';
import SecondFloorNaRoom from './SecondFloorNaRoom';
import styles from './SecondFloor.module.css';

const SecondFloor = ({
  ablebtn,
  BookingConfirm,
  SecondMeetingRoominfo,
  SecondNaboxinfo,
  SecondOfficial,
  bookingData,
  roomData,
  // SinyangID,
  // SinyangName,
  userClasses,
  floor,
}) => {
  return (
    <div className={styles.MainSecondFloor}>
      <div className={styles.SecondFloor}>
        <h2>2 Floor</h2>
        <div className={[styles.SecondFloorcontainer]}>
          <SecondFloorMap
            className={styles.SecondFloorMap}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            SecondMeetingRoominfo={SecondMeetingRoominfo}
            SecondNaboxinfo={SecondNaboxinfo}
            SecondOfficial={SecondOfficial}
            bookingData={bookingData}
            roomData={roomData}
            // SinyangID={SinyangID}
            // SinyangName={SinyangName}
            userClasses={userClasses}
            floor={floor}
          />
          <div className={styles.RoomContainer}>
            <SecondFloorMeetingRoom
              className={styles.meetingRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              SecondMeetingRoominfo={SecondMeetingRoominfo}
              SecondOfficial={SecondOfficial}
              bookingData={bookingData}
              roomData={roomData}
              // SinyangID={SinyangID}
              // SinyangName={SinyangName}
              userClasses={userClasses}
              floor={floor}
            />
            <SecondFloorNaRoom
              className={styles.naRoom}
              ablebtn={ablebtn}
              BookingConfirm={BookingConfirm}
              SecondNaboxinfo={SecondNaboxinfo}
              bookingData={bookingData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondFloor;
