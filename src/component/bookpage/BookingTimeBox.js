//styles
import styles from "./BookingTimeBox.module.css";
import "antd/dist/antd.min.css";
import { Checkbox, Tooltip } from "antd";
//hooks
import { getTimes, times, checkPast }  from "../../hooks/bookingModule";
import { useEffect, useState } from "react";
//component
import TimeBtnExplain from "./TimeBtnExplain";

//매니저님 예외처리한 부분
//1) checkBox 예약된거 disable 안하고 그레이 처리 해줌
//2) defaultDisable에서 break 하는 부분 break 안하도록 해줌
//3) bookingConfirm()에서 체크해줄 때 팀원 선택 안해도 되게 해줌

const BookingTimeBox = (props) => {
  const userClass = props.userData.classes;
  const floor = props.currentRoomData.floor;
  const maxTime = props.currentRoomData.maxTime;

  const [bookedState, setBookedState] = useState([]);
  const [pastState, setPastState] = useState([]);
  const [isOfficial, setIsOfficial] = useState([]);

  useEffect(() => {
    const bookedTimes = [];
    const officialTimes = [];
    props.bookingData.map((booking) =>
      bookedTimes.push(...getTimes(booking.startTime, booking.endTime)) 
      &&
      booking.official
        ? officialTimes.push(...getTimes(booking.startTime, booking.endTime))
        : null
        
    );
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    times().map(
      (time) =>
        arr1.push(checkPast(time)) &&
        arr2.push(bookedTimes.includes(time) ? true : false) &&
        arr3.push(officialTimes.includes(time) ? true : false)
    );
    setPastState(arr1);
    setBookedState(arr2);
    setIsOfficial(arr3);
    //     });
  }, [props.bookingData, props.namesData]); //의존성 경고문 없애기 (콜백 방식 알아볼것)

  //-------시간 체크박스------//
  const [indeterminateState, setIndeterminateState] = useState(
    new Array(12).fill(false)
  );
  const [checkedState, setCheckedState] = useState(new Array(12).fill(false));
  const [timeRange, setTimeRange] = useState([]);
  const maxHour = userClass === 0 ? 12 : maxTime;

  //timeRange 내에서 시간 선택 event
  //처음 꺼 눌렀을 때 -> 해제
  //마지막꺼 체크 -> 마지막꺼 + 중간껏들도 체크
  //마지막꺼 해제 -> 마지막꺼만 해제
  //timeRange에서 첫시간, 마지막 시간 사이 중간 시간 선택
  //-> 선택인 경우 : 시작~중간 체크 | 해제일 경우 : 중간~끝 해제
  const onChangeCheckBox = (index) => {
    const lastIndex = timeRange.length - 1;
    if (timeRange.includes(index)) {
      if (timeRange[0] === index) {
        //시작 시간 체크 해제
        setTimeRange([]);
        setIndeterminateState(new Array(12).fill(false));
        const checkedArr = new Array(12).fill(false)
        setCheckedState(checkedArr);
        props.onSelectTime(checkedArr)
      } else if (timeRange[lastIndex] === index) {
        // timeRange에서 마지막 시간 선택
        const checkedArr = [...checkedState];
        if (checkedArr[index]) {
          checkedArr[index] = false;
        } else {
          for (let i = timeRange[0]; i <= timeRange[lastIndex]; i++) {
            checkedArr[i] = true;
          }
        }
        setCheckedState(checkedArr);
        props.onSelectTime(checkedArr)
      } else {
        //참고 : timeRange.length >1 경우만 이 조건문으로 들어옴
        //=> 중간 시간 선택
        const checkedArr = [...checkedState];
        if (!checkedArr[index]) {
          for (let i = timeRange[1]; i <= index; i++) {
            checkedArr[i] = true;
          }
        } else {
          for (let i = index; i <= timeRange[lastIndex]; i++) {
            checkedArr[i] = false;
          }
        }
        setCheckedState(checkedArr);
        props.onSelectTime(checkedArr)

      }
    } else {
      // 최초 시작 시간 선택 or timeRange 외부 시간 선택 [선택한 시간이 시작시간이 됨]
      const checkIdArr = [];
      const indeterminateArr = new Array(12).fill(false);
      const checkedArr = new Array(12).fill(false);
      for (let i = index; i < index + maxHour; i++) {
        checkedArr[index] = true;
        if (userClass !== 0) {
          if (bookedState[i]) break;
        } else {
          if (isOfficial[i]) break;
        }
        checkIdArr.push(i);
        if (i !== index) {
          indeterminateArr[i] = true;
        }
      }
      console.log("checking checkedState in else : ",checkedArr)
      setCheckedState(checkedArr);
      props.onSelectTime(checkedArr)

      setTimeRange(checkIdArr);
      setIndeterminateState(indeterminateArr);
    }
  };

  return (
    <div>
      <h6 className={styles.title}> 시간 선택 </h6>
      {/* 매니저인 경우만 버튼 안내 */}
      {userClass === 0 ? <TimeBtnExplain /> : null}
      {/* 시간 선택 체크 박스  */}
      <div className={styles.timetable}>
        {times().map((time, index) => (
          <span key={index}>
            <Tooltip
              placement="bottom"
              title={
                userClass !== 0 ||
                floor === 4 ||
                pastState[index] ||
                !bookedState[index]
                  ? ""
                  : isOfficial[index]
                  ? "공식일정예약"
                  : "인재예약"
              }
            >
              <Checkbox
                onChange={() => onChangeCheckBox(index)}
                variant="success"
                checked={checkedState[index]}
                disabled={
                  pastState[index] || isOfficial[index]
                    ? true
                    : userClass === 0 && floor !== 4
                    ? false
                    : bookedState[index]
                }
                style={
                  userClass === 0 && bookedState[index] && floor !== 4
                    ? {
                        margin: "10px",
                        color: "pink",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }
                    : checkedState[index] || indeterminateState[index]
                    ? {
                        margin: "10px",
                        color: "#3695f5",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }
                    : {
                        margin: "10px",
                        color: "green",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }
                }
              >
                {time}
              </Checkbox>
            </Tooltip>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BookingTimeBox;
