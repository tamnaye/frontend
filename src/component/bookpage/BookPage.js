//styles
import styles from "./BookPage.module.css";
//BookingPage - component
import NavsAdmin from "./navs/NavsAdmin";
import NavsFloor2 from "./navs/NavsFloor2";
import NavsFloor3 from "./navs/NavsFloor3";
import RoomInfo from "./RoomInfo";
import BookingTimeBox from "./BookingTimeBox";
//hooks
import useUrl from "../../hooks/useUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGet } from "../../hooks/fetchUrl";
import BookingMember from "./BookingMember";
import {getStartEndTime} from "../../hooks/bookingModule"
import timePlusMinus from "../../hooks/timePlusMinus";
import { fetchPostJson } from "../../hooks/fetchUrl";
import BookingButton from "./BookingButton";

function BookPage() {
  const { roomId } = useParams();
  const [bookingData, setBookingData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [namesData, setNamesData] = useState([]);
  const [currentRoomData, setCurrentRoomData] = useState([]);
  const [navRoomData, setNavRoomData] = useState([]); //roomData
  const [floorUserData, setFloorUserData] = useState(""); //userData
  const myUrl = useUrl();
  const url = `http://${myUrl}/api/booking?roomId=${roomId}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      setBookingData(data.bookingData);
      setUserData(data.userData);
      setNamesData(data.namesData);
      setCurrentRoomData(data.currentRoomData);
      setNavRoomData(data.roomData);
      setFloorUserData(data.userData.floor);
    });
  }, [url, navigate]);

  //--------팀원 검색 데이터 받기---------//
  const [selectedNamesState, setSelectedNamesState] = useState([]);
  const selectednamesHandler = (names) => {
    setSelectedNamesState(names);
  };
//시간선택용 
const userClass = userData.classes;
const [isLoadding, setIsLoading] = useState(false);
const userName = userData.userName;
const [checkedState, setCheckedState] = useState(useState(new Array(12).fill(false)))
const selectedTimeHandler = (time)=>{
  console.log("[bookpage] checking time : ",time)
  setCheckedState(time)
}

  const roomType = currentRoomData.roomType;
  const roomTypeArr = ["meeting", "nabax"];




  function bookingConfirm() {
    if (
      userClass !== 0 &&
      roomType === roomTypeArr[0] &&
      selectedNamesState.length < 1 &&
      getStartEndTime(checkedState).timeLength === 0
    ) {
      alert("회의 참여자와 회의 시간을 선택해 주세요");
    } else if (
      roomType === roomTypeArr[0] &&
      userClass !== 0 &&
      selectedNamesState.length < 1
    ) {
      alert("회의 참여자를 1명 이상 선택해주세요");
    } else if (getStartEndTime(checkedState).timeLength === 0) {
      alert("시간을 선택해 주세요");
    } else {
      if (!isLoadding) {
        setIsLoading(true);
        const postUrl = `http://${myUrl}/api/booking/conference`;
        const object = {
          classes: userClass,
          roomId: roomId,
          roomType: roomType,
          startTime: getStartEndTime(checkedState).startTime,
          endTime: timePlusMinus(
            getStartEndTime(checkedState).startTime,
            getStartEndTime(checkedState).timeLength
          ),
          teamMate: selectedNamesState,
          userName: userName,
        };
        fetchPostJson(postUrl, object, navigate).then((data) => {
          if (data?.message.success) {
            alert(data.message.success);
            setIsLoading(false);
            navigate(`/mypage`);
          } else {
            alert(data?.message.fail);
            setIsLoading(false);
          }
        });
      }
    }
  }
  return (
    <div>
      {floorUserData === 0
        ? [<NavsAdmin key={0} navRoomData={navRoomData} />]
        : floorUserData === 2
        ? [<NavsFloor2 key={2} navRoomData={navRoomData} />]
        : [<NavsFloor3 key={3} navRoomData={navRoomData} />]}
      <div className={styles.roomInfo}>
        <RoomInfo currentRoomData={currentRoomData} />
        <div className={styles.bookingInfo}>
          <div className={styles.wrap}>
            <h6
              className={
                roomType === roomTypeArr[0]
                  ? [styles.meetingUserinfo]
                  : [styles.naboxUserinfo]
              }
            >
              예약자 정보
            </h6>
            <BookingMember
              onSelectNames={selectednamesHandler}
              userData={userData}
              namesData={namesData}
              roomType={roomType}
            />
          </div>
          <BookingTimeBox
            bookingData={bookingData}
            userData={userData}
            namesData={namesData}
            currentRoomData={currentRoomData}
            onSelectTime={selectedTimeHandler}
          />
        <BookingButton onBookingConfirm={bookingConfirm} />

        </div>
      </div>
    </div>
  );
}
export default BookPage;
