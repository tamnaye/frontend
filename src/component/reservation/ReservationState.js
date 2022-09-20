// 컴포넌트
import ThirdFloorReservationState from './ThirdFloorStateComponents/ThirdFloorReservationState';
import SecondFloorReservationState from './SecondFloorStateComponents/SecondFloorReservationState';
import AllFloorReservationState from './AllFloorReservationState';
// 스타일
import styles from './ReservationState.module.css';
// Hook
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// 커스텀 훅
import useUrl from '../../hooks/useUrl';
import { fetchGet } from '../../hooks/fetchUrl';
// import useTimeAlert from '../../hooks/useTimeAlert';

const ReservationState = () => {
  // //모든 층수 사용 useTimeAlert
  // const [ablebtn, BookingConfirm] = useTimeAlert();

  //층수 API 정보 가져오기
  const [floor, setfloor] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  // 2층 정보
  const [SecondMeetingRoominfo, setSecondMeetingRoominfo] = useState([]);
  const [SecondNaboxinfo, setSecondNaboxinfo] = useState([]);
  const [SinyangID, setSinYangID] = useState('');
  const [SinyangName, setSinYangName] = useState('');

  // 3층 정보
  const [ThirdMeetingStudioinfo, setThirdMeetingStudioinfo] = useState([]);
  const [ThirdNaboxinfo, setThirdNaboxinfo] = useState([]);

  // 4층 정보
  const [FourthFloorinfo, setFourthFloorinfo] = useState([]);

  const myUrl = useUrl();
  const url = `http://${myUrl}/api/booking/details-booking2`;
  const location = useLocation();
  useEffect(() => {
    fetchGet(url, location).then((data) => {
      setfloor(data.floor);
      setBookingData(data.BookingData);
      setRoomData(data.RoomData);

      // 2층 일 때 정보
      if (data.floor === 2) {
        setSecondMeetingRoominfo(
          data.RoomData.filter(
            (rooms) => rooms.roomType === 'meeting' && rooms.roomName !== '신양'
          )
        );
        setSecondNaboxinfo(
          data.RoomData.filter((rooms) => rooms.roomType === 'nabox')
        );
        setSinYangID(
          data.RoomData.filter((rooms) => rooms.roomId === 207)[0].roomId
        );
        setSinYangName(
          data.RoomData.filter((rooms) => rooms.roomName === '신양')[0].roomName
        );
      }

      // 3층 일 때 정보
      else if (data.floor === 3) {
        setThirdMeetingStudioinfo(
          data.RoomData.filter(
            (rooms) =>
              rooms.roomType === 'meeting' || rooms.roomType === 'studio'
          )
        );
        setThirdNaboxinfo(
          data.RoomData.filter((rooms) => rooms.roomType === 'nabox')
        );
      }

      // 0층일 때 즉 모두 보여줘야 할 때 정보
      else {
        // 2층 정보
        setSecondMeetingRoominfo(
          data.RoomData.filter(
            (rooms) =>
              rooms.floor === 2 &&
              rooms.roomType === 'meeting' &&
              rooms.roomName !== '신양'
          )
        );
        setSecondNaboxinfo(
          data.RoomData.filter(
            (rooms) => rooms.floor === 2 && rooms.roomType === 'nabox'
          )
        );
        setSinYangID(
          data.RoomData.filter((rooms) => rooms.roomId === 207)[0].roomId
        );
        setSinYangName(
          data.RoomData.filter((rooms) => rooms.roomName === '신양')[0].roomName
        );
        // 3층 정보
        setThirdMeetingStudioinfo(
          data.RoomData.filter(
            (rooms) =>
              (rooms.floor === 3 && rooms.roomType === 'meeting') ||
              rooms.roomType === 'studio'
          )
        );
        setThirdNaboxinfo(
          data.RoomData.filter(
            (rooms) => rooms.floor === 3 && rooms.roomType === 'nabox'
          )
        );
        // 4층 정보
        setFourthFloorinfo(data.RoomData.filter((rooms) => rooms.floor === 4));
      }
    });
  }, [url, myUrl]);

  return (
    <div className={styles.ReservationStateContainer}>
      <h2>시간대별 예약현황</h2>
      {floor === 0 && [
        <AllFloorReservationState
          className={styles.reservationTable}
          key="0"
          SecondMeetingRoominfo={SecondMeetingRoominfo}
          SecondNaboxinfo={SecondNaboxinfo}
          ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
          ThirdNaboxinfo={ThirdNaboxinfo}
          FourthFloorinfo={FourthFloorinfo}
          bookingData={bookingData}
          roomData={roomData}
          SinyangID={SinyangID}
          SinyangName={SinyangName}
          floor={floor}
        />,
      ]}
      {floor === 2 && [
        <SecondFloorReservationState
          key="2"
          className={styles.reservationTable}
          SecondMeetingRoominfo={SecondMeetingRoominfo}
          SecondNaboxinfo={SecondNaboxinfo}
          bookingData={bookingData}
          roomData={roomData}
          SinyangID={SinyangID}
          SinyangName={SinyangName}
          floor={floor}
        />,
      ]}
      {floor === 3 && [
        <ThirdFloorReservationState
          key="3"
          className={styles.reservationTable}
          ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
          ThirdNaboxinfo={ThirdNaboxinfo}
          bookingData={bookingData}
          roomData={roomData}
        />,
      ]}
    </div>
  );
};

export default ReservationState;
