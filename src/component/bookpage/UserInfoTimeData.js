//styles
import styles from "./UserInfoTimeData.module.css";
import "antd/dist/antd.min.css";
import { Checkbox } from "antd";
//component
import React from "react";
import dummy from "../../db/booking_data.json";
import dummy_names from "../../db/tamnaMembers.json";
//hooks
import useUrl from "../../hooks/useUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useTimes from "../../hooks/useTimes";

//더큰내일센터 인원들 로컬 데이터베이스 만들기 (객체 배열) : (id, class, 이름)
//백에서 booking id 별 start,end Time 받아와야함 (endTime -1시간 해줘야함)
//post 보낼 때 endtime + 1시간 해줘야함

const UserInfoTimeData = ({ userClass }) => {
  //starttime, endtime,
  const { id } = useParams();
  const { roomId } = useParams();
  const myUrl = useUrl();
  const [userName, setUserName] = useState("");
  const [roomType, setRoomType] = useState(""); // 나박스 / 회의실

  const times = useTimes();
  const [disabledState, setDisabledState] = useState([]); //test
  const [defaultDisabledList, setDefaultDisabledList] = useState([]); //test
  const url = `http://${myUrl}/api/booking?roomId=${roomId}&userId=${id}&classes=${userClass}`;
  console.log(" main thread url : " ,url )

  const [memberNames, setMemberNames] = useState([])
  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userData.userName);
        setRoomType(data.roomData.roomType);
        setDefaultDisabledList(bookingdDataHandler(data.bookingData));
        setDisabledState(bookingdDataHandler(data.bookingData));
        setMemberNames(data.namesData)


      });
  }, [url]);

 
  function bookingdDataHandler (bookingData){
    const bookedTimes = [];
    bookingData.map((booking) =>
      bookedTimes.push(booking.startTime, booking.endTime)
    );
    const arr = [...defaultDisabledList];
    times.map((time) =>
      arr.push(bookedTimes.includes(time) ? true : false)
    );
    return arr;
  }



  //----무결님 버튼 클릭 작업----//

  const [checkedState, setCheckedState] = useState(new Array(12).fill(false));
  // i의 최소값이 0, 최대값은 11이기 때문에 처음 시간과 마지막 시간일때의 예외처리는 반복문에서 자연스럽게 처리됨
  // 클릭한 시간 전꺼, 다음꺼 중 만약 이미 예약이 된것들은 이미 disabled : true인 상태이기 때문에
  // onChange 첫번째 if문에서 예외처리됨 (checkedStateLength === 0 )
  // 나머지 중 disabled false인 것들 disabled = true로 바꿔줌
  function updateDisabledList(index) {
    //최초 클릭 시 disablesState update
    const disableUpdateList = [...disabledState];
    for (let i = 0; i < times.length; i++) {
      if (i !== index && i !== index + 1 && i !== index - 1) {
        if (disableUpdateList[i] !== true) {
          disableUpdateList[i] = true;
        }
      }
    }
    setDisabledState(disableUpdateList);
  }
  //checkedState 길이 반환
  function checkedStateLength() {
    return checkedState.filter((bool) => bool === true).length;
  }
  //indexOf 메소드는 체크된 인덱스 반환해줌,
  //하지만 버튼 두개 눌린 생태에서 다음 버튼 클릭의 인덱스랑 비교하려면 클릭 된 체크박스 인덱스들을 배열로 가지고 있어야함
  function getCheckedIndexArray(checkedState) {
    var arr = [];
    var index = checkedState.indexOf(true);
    while (index !== -1) {
      arr.push(index);
      index = checkedState.indexOf(true, index + 1);
    }
    return arr;
  }
  //체크된 체크박스 checkedState 배열로 관리해주기 위함
  //기본적으로 onChange에서 호출해줌, 하지만 체크 false로 강제해야하는 조건에서는 호출 하지 않음
  function updatedCheckedState(index) {
    const updatedCheckedState = checkedState.map((item, id) =>
      id === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }
  const onChangeInput = (index) => {
    if (checkedStateLength() === 0) {
      updateDisabledList(index);
      updatedCheckedState(index);
    } else if (checkedStateLength() === 1) {
      updatedCheckedState(index);
      if (checkedState.indexOf(true) === index) {
        setDisabledState(defaultDisabledList); //체크해제
      } else {
        //pass
      }
    } else if (checkedStateLength() === 2) {
      if (getCheckedIndexArray(checkedState).includes(index) === false) {
        alert("최대 예약시간은 2시간입니다 !");
      } else {
        updatedCheckedState(index);
      }
    }
  };

  //--------팀원 검색 기능---------//
  const [searchedNameState, setSearchedNameState] = useState([]);
  const [selectedNameState, setSelectedNameState] = useState([]);
  const [inputName, setInputName] = useState("");

  function onChange(e) {
    console.log("TAG : onChange");
    setInputName(e.target.value);
    const str = e.target.value;
    let arr = [...memberNames];
    arr =
      str === "" ? (arr = []) : arr.filter((member) => member.includes(str) && member !== userName);
    //타이핑할때 깜빡거리는거 안되게 예외처리하려고 했는데 한글 특성상 어려움.. 글자 단위로 처리할 수 있어야함
    // const check = JSON.stringify(arr) === JSON.stringify(searchedNameState);
    // console.log("check", check);
    // if (!check)
    setSearchedNameState(arr);
  }
  function onClickSearched(name) {
    setInputName("");
    setSearchedNameState([]);

    const arr = [...selectedNameState];
    arr.push(name);
    setSelectedNameState(arr);
  }
  function onClickSelected(index) {
    const arr = [...selectedNameState];
    arr.splice(index, 1);
    setSelectedNameState(arr);
    alert("해제?");
  }

  function onSubmit(e) {
    e.preventDefault();

    if (searchedNameState.length === 1) {
      //이미 선택할 팀원이 나옴
      setInputName("");
      setSearchedNameState([]);
      const arr = [...selectedNameState];
      arr.push(searchedNameState[0]);
      setSelectedNameState(arr);
    } else if (searchedNameState > 1) {
      //검색 결과 두명 이상 나왔을 때 엔터친 경우
      alert("팀원을 한명씩 선택해 주세요 !");
    } else {
      //검색 안되는 이름 치고 엔터친 경우
      setInputName("");
      setSearchedNameState([]);
      alert("더큰내일센터 인원이 아닙니다 !\n팀원의 이름을 확인해주세요!");
    }
  }

  //----예약시간에 따른 버튼 비활성화를 함수----//
  const [ablebtn, setAblebtn] = useState(true); //예약시간이 아닐 때 상태변경(true일 때 버튼 활성화!)
  const navigate = useNavigate();
  //21:00-08:30까지 예약 버튼 비활성화 함수
  const Now = new Date();
  const NowHour = Now.getHours();
  const NowMins = Now.getMinutes();
  function pluszero(times) {
    let time = times.toString(); //시간을 숫자에서 문자로 변환
    if (time.length < 2) {
      time = "0" + time; //숫자 앞에 0을 붙여줌
      return time;
    } else {
      return time;
    }
  }
  const nowHour = pluszero(NowHour);
  const nowMins = pluszero(NowMins);
  const nowTime = nowHour + nowMins;
  console.log("nowHour",nowHour);
  const startTime = "0830";
  const endTime = "2100";
  useEffect(() => {
    if (startTime > nowTime || endTime < nowTime) {
      setAblebtn(false);
    } else {
      setAblebtn(true);
    }
  }, []); //useEffect써서 한번만 렌더링 해줌

  //----예약 데이터 보내기----//
  const BookingConfirm = () => {
    const postUrl = `http://${myUrl}/api/booking/conference`;
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //값 입력
        classes: userClass,
        roomId: roomId,
        roomType: roomType,

        // 시간 한시간일때랑 두시간일 때 예외처리 해줘야할듯
        startTime: "19:00", //checked state에서 index 찾아서 times 배열에서 뽑아냄
        endTime: "20:00", // checked state에서  index 찾아서 times 배열에서 뽑아내서 +1
        teamMate: selectedNameState,

        userId: id,
        userName: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (startTime > nowTime || endTime < nowTime) {
          alert(
            "예약할 수 없는 시간입니다!\n오전08:30부터 오후21:00까지 예약이 가능합니다."
          );
          navigate(`/${id}`);
        } else if (data.message.success) {
          //console.log(data.message.success);
          alert(data.message.success);
          navigate(`/mypage/${id}`);
        } else {
          //console.log(data.message.fail);
          alert(data.message.fail);
        }
      });
  };
  return (
    <div>
      <div className={styles.wrap}>
        <h6 className={styles.userinfo}> 예약자 정보 </h6>
        <div className={styles.list}>
          <p>
            신청자명
            <input
              style={{ fontWeight: "bold" }}
              className={styles.input}
              type="text"
              name="val"
              placeholder={userName}
              disabled
            />
          </p>
          <form onSubmit={onSubmit}>
            <p>
              팀원선택
              <input
                className={styles.input}
                onChange={onChange}
                value={inputName}
                type="text"
                placeholder="검색"
                required
              />
            </p>
          </form>

          <div>
            {searchedNameState.map((item, index) => (
              <button
                onClick={() => onClickSearched(item)}
                key={index}
                className={styles.membersName}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.membersBox}>
            {selectedNameState.map((item, index) => (
              <button onClick={() => onClickSelected(index)} key={index}>
                {`${item} (x)`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h6 className={styles.time}> 시간 선택 </h6>
        <div className={styles.timetable}>
          {times.map((time, index) => (
            <span key={index}>
              <Checkbox
                onChange={() => onChangeInput(index)}
                checked={checkedState[index]}
                variant="success"
                disabled={disabledState[index]}
                style={{
                  margin: "10px",
                  color: "green",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {time}
              </Checkbox>
            </span>
          ))}
        </div>

        <button
          className={ablebtn === true ? styles.bookbtn : styles.bookbtnOff}
          onClick={BookingConfirm}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default UserInfoTimeData;
