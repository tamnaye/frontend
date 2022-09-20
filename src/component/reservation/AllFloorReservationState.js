// 컴포넌트
import SecondFloorMeetingRoomState from './SecondFloorStateComponents/SecondFloorMeetingRoomState';
import SecondFloorNaRoomState from './SecondFloorStateComponents/SecondFloorNaRoomState';
import ThirdFloorNaRoomState from './ThirdFloorStateComponents/ThirdFloorNaRoomState';
import ThirdFloorMeetingRoomState from './ThirdFloorStateComponents/ThirdFloorMeetingRoomState';
import FourthFloorMeetingRoomState from './FourthFloorStateComponents/FourthFloorMeetingRoomState';
// 스타일
import styles from './AllFloorReservationState.module.css';
// hook
import { useState } from 'react';

const AllFloorReservationState = ({
  // 2층
  SecondMeetingRoominfo,
  SecondNaboxinfo,
  SinyangID,
  SinyangName,
  // 3층
  ThirdMeetingStudioinfo,
  ThirdNaboxinfo,
  // 4층
  FourthFloorinfo,
  //전체
  bookingData,
  roomData,
  floor,
}) => {
  // 회의실과 나박스 버튼
  const [RoomType, setRoomType] = useState(true);
  const MeetingRoom = true;
  const NaBox = false;
  // 회의실과 나박스 버튼 클릭시 함수
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
          {RoomType
            ? [
                <SecondFloorMeetingRoomState
                  key="2"
                  className={styles.reservationTable}
                  SecondMeetingRoominfo={SecondMeetingRoominfo}
                  bookingData={bookingData}
                  roomData={roomData}
                  SinyangID={SinyangID}
                  SinyangName={SinyangName}
                  floor={floor}
                />,
                <ThirdFloorMeetingRoomState
                  key="3"
                  className={styles.reservationTable}
                  ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
                  bookingData={bookingData}
                  roomData={roomData}
                />,
                <FourthFloorMeetingRoomState
                  key="4"
                  className={styles.reservationTable}
                  FourthFloorinfo={FourthFloorinfo}
                  bookingData={bookingData}
                  roomData={roomData}
                />,
              ]
            : [
                <SecondFloorNaRoomState
                  key="2"
                  className={styles.reservationTable}
                  SecondNaboxinfo={SecondNaboxinfo}
                  bookingData={bookingData}
                  roomData={roomData}
                  floor={floor}
                />,
                <ThirdFloorNaRoomState
                  key="3"
                  className={styles.reservationTable}
                  ThirdNaboxinfo={ThirdNaboxinfo}
                  bookingData={bookingData}
                  roomData={roomData}
                />,
              ]}
        </div>
      </div>
    </div>
  );
};

export default AllFloorReservationState;
