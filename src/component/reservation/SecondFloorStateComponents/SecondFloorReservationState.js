// 컴포넌트
import SecondFloorMeetingRoomState from './SecondFloorMeetingRoomState';
import SecondFloorNaRoomState from './SecondFloorNaRoomState';
//스타일
import styles from './SecondFloorReservationState.module.css';
//hook
import { useState } from 'react';

const SecondFloorReservationState = ({
  //2층
  SecondMeetingRoominfo,
  SecondNaboxinfo,
  SecondOfficial,
  // SinyangID,
  // SinyangName,
  //전체
  bookingData,
  roomData,
  floor,
}) => {
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
      {/* <SecondFloorMeetingRoomState />
      <SecondFloorNaRoomState /> */}
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
            <SecondFloorMeetingRoomState
              key="meeting"
              className={styles.reservationTable}
              bookingData={bookingData}
              roomData={roomData}
              SecondMeetingRoominfo={SecondMeetingRoominfo}
              SecondOfficial={SecondOfficial}
              // SinyangID={SinyangID}
              // SinyangName={SinyangName}
              floor={floor}
            />
          ) : (
            <SecondFloorNaRoomState
              key="nabox"
              className={styles.reservationTable}
              SecondNaboxinfo={SecondNaboxinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondFloorReservationState;
