// 컴포넌트
import ThirdFloorNaRoomState from './ThirdFloorNaRoomState';
import ThirdFloorMeetingRoomState from './ThirdFloorMeetingRoomState';
// 스타일
import styles from './ThirdFloorReservationState.module.css';
// Hook
import { useState } from 'react';

const ThirdFloorReservationState = ({
  //3층
  ThirdMeetingStudioinfo,
  ThirdNaboxinfo,
  //전체
  bookingData,
  roomData,
}) => {
  // 3층 회의실과 나박스 버튼
  const [RoomType, setRoomType] = useState(true);
  const MeetingRoom = true;
  const NaBox = false;
  // 3층 회의실과 나박스 버튼 클릭시 함수
  const MeetingRoomOnClick = () => {
    setRoomType(MeetingRoom);
  };
  const NaboxOnClick = () => {
    setRoomType(NaBox);
  };

  return (
    <div>
      <div className={styles.ReservationStateContainer}>
        {/* 3층 나박스와 회의실 버튼 */}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={MeetingRoomOnClick}>
            회의실
          </button>
          <button className={styles.button} onClick={NaboxOnClick}>
            Na Box
          </button>
        </div>
        {/* 나박스와 회의실 데이터 구분해서 뿌리기 */}
        <div className={styles.Reservation}>
          {RoomType ? (
            <ThirdFloorMeetingRoomState
              className={styles.reservationTable}
              ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
          ) : (
            <ThirdFloorNaRoomState
              className={styles.reservationTable}
              ThirdNaboxinfo={ThirdNaboxinfo}
              bookingData={bookingData}
              roomData={roomData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdFloorReservationState;
