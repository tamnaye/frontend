// 컴포넌트
import ReservationList from './ReservationList';
// 스타일
import styles from './FloorState.module.css';
// Hook
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
// 커스텀 훅
import useUrl from '../../../hooks/useUrl';
import { fetchGet } from '../../../hooks/fetchUrl';

const FloorState = () => {
  // 층수 API 정보 가져오기
  const [floor, setfloor] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  // 룸타입별 정보
  const [meetingRoom, setMeetingRoom] = useState([]);
  const [nabox, setNabox] = useState([]);
  // const [official, setOfficial] = useState([]);
  // const [studio, setStudio] = useState([]);

  // 현재 선택 타입
  const [RoomType, setRoomType] = useState([]);

  const myUrl = useUrl();
  const url = `http://${myUrl}/api/booking/details-booking`;
  const navigate = useNavigate();
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      setfloor(data.floor);
      setBookingData(data.BookingData);
      setRoomData(data.RoomData);

      setMeetingRoom(
        data.RoomData.filter(
          (rooms) =>
            rooms.roomType === 'meeting' ||
            rooms.roomType === 'official' ||
            rooms.roomType === 'studio'
        )
      );
      // setOfficial(
      //   data.RoomData.filter((rooms) => rooms.roomType === 'official')
      // );
      // setStudio(data.RoomData.filter((rooms) => rooms.roomType === 'studio'));
      setNabox(data.RoomData.filter((rooms) => rooms.roomType === 'nabox'));
    });
  }, [url, myUrl]);

  const selectType = (type) => {
    if (type === 1) {
      let roomTypeArray;
      roomTypeArray = meetingRoom;
      setRoomType(roomTypeArray);
    }
    if (type === 2) {
      let roomTypeArray;
      roomTypeArray = nabox;
      setRoomType(roomTypeArray);
    }
  };
  return (
    <div className={styles.ReservationStateContainer}>
      <h2>시간대별 예약현황</h2>
      <div className={styles.ReservationStateContainer}>
        {/* 3층 나박스와 회의실 버튼 */}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => selectType(1)}>
            회의실
          </button>
          <button className={styles.button} onClick={() => selectType(2)}>
            Na Box
          </button>
        </div>
      </div>

      <div>
        {RoomType && (
          <ReservationList
            RoomType={RoomType}
            floor={floor}
            bookingData={bookingData}
            roomData={roomData}
          />
        )}
      </div>
    </div>
  );
};

export default FloorState;
