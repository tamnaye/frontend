// 컴포넌트
import SecondFloor from './secondFloorComponents/SecondFloor';
import ThirdFloor from './thirdFloorComponents/ThirdFloor';
import FourthFloor from './fourthFloorComponents/FourthFloor';
// 스타일
import styles from './MainTemplate.module.css';
// hook
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// 커스텀 훅
import useUrl from '../../hooks/useUrl';
import { fetchGet } from '../../hooks/fetchUrl';
import useTimeAlert from '../../hooks/useTimeAlert';

const MainTemplate = () => {
  //모든 층수 사용 useTimeAlert
  const [ablebtn, BookingConfirm] = useTimeAlert();

  //층수 API 정보 가져오기
  const [floor, setfloor] = useState('');
  const [bookingData, setBookingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  // 2층 정보
  const [SecondMeetingRoominfo, setSecondMeetingRoominfo] = useState([]);
  const [SecondNaboxinfo, setSecondNaboxinfo] = useState([]);
  const [SecondOfficial, setSecondOfficial] = useState([]);
  // const [SinyangID, setSinYangID] = useState('');
  // const [SinyangName, setSinYangName] = useState('');

  // 3층 정보
  const [ThirdMeetingStudioinfo, setThirdMeetingStudioinfo] = useState([]);
  const [ThirdNaboxinfo, setThirdNaboxinfo] = useState([]);

  // 4층 정보
  const [FourthFloorinfo, setFourthFloorinfo] = useState([]);

  const myUrl = useUrl();
  const url = `http://${myUrl}/api/booking/main`;
  const navigate = useNavigate();
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      setfloor(data.floor);
      setBookingData(data.BookingData);
      setRoomData(data.RoomData);

      // 2층 일 때 정보
      if (data.floor === 2) {
        setSecondMeetingRoominfo(
          data.RoomData.filter((rooms) => rooms.roomType === 'meeting')
        );
        setSecondNaboxinfo(
          data.RoomData.filter((rooms) => rooms.roomType === 'nabox')
        );
        setSecondOfficial(
          data.RoomData.filter((rooms) => rooms.roomType === 'official')
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
              rooms.roomType !== 'official'
          )
        );
        setSecondNaboxinfo(
          data.RoomData.filter(
            (rooms) => rooms.floor === 2 && rooms.roomType === 'nabox'
          )
        );
        setSecondOfficial(
          data.RoomData.filter(
            (rooms) => rooms.floor === 2 && rooms.roomType === 'official'
          )
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
    <div>
      <div className={styles.floorContainer}>
        {/* classes 활용 */}
        {floor === 0 && [
          <SecondFloor
            key="2"
            className={styles.secondFloor}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            SecondMeetingRoominfo={SecondMeetingRoominfo}
            SecondNaboxinfo={SecondNaboxinfo}
            SecondOfficial={SecondOfficial}
            bookingData={bookingData}
            roomData={roomData}
            floor={floor}
          />,
          <ThirdFloor
            key="3"
            className={styles.thirdFloor}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
            ThirdNaboxinfo={ThirdNaboxinfo}
            bookingData={bookingData}
            roomData={roomData}
          />,
          <FourthFloor
            key="4"
            className={styles.fourthFloor}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            bookingData={bookingData}
            roomData={roomData}
            FourthFloorinfo={FourthFloorinfo}
          />,
        ]}
        {floor === 2 && (
          <SecondFloor
            key="2"
            className={styles.secondFloor}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            SecondMeetingRoominfo={SecondMeetingRoominfo}
            SecondNaboxinfo={SecondNaboxinfo}
            SecondOfficial={SecondOfficial}
            bookingData={bookingData}
            roomData={roomData}
            floor={floor}
          />
        )}
        {floor === 3 && (
          <ThirdFloor
            key="3"
            className={styles.thirdFloor}
            ablebtn={ablebtn}
            BookingConfirm={BookingConfirm}
            ThirdMeetingStudioinfo={ThirdMeetingStudioinfo}
            ThirdNaboxinfo={ThirdNaboxinfo}
            bookingData={bookingData}
            roomData={roomData}
          />
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
