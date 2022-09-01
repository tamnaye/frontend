//styles
import styles from './UserInfoTimeData.module.css';
import 'antd/dist/antd.min.css';
import { Checkbox } from 'antd';
//component
import React from 'react';
import dummy from '../../db/booking_data.json';
//hooks
import UseUrl from '../../hooks/UseUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserInfoTimeData = ({ userClasses }) => {
  const { id } = useParams();
  const { roomId } = useParams();

  //input 값 입력 시 실제 돔에 불러오기//
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const onChange = (event) => setName(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (name === '') {
      return; //빈칸이면 함수를 실행하지 않음
    }
    setNames((currentArray) => {
      return [...currentArray, name];
    });
    setName('');
  };
  //----신청자명 데이터 로그인정보에서 불러오기 -> post----//
  const myUrl = UseUrl();
  const [userName, setUserName] = useState('');
  const [roomType, setRoomType] = useState('');
  const url = `http://${myUrl}/api/booking?roomId=${roomId}&userId=${id}`;

  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userData.userName);
        setRoomType(data.roomData.roomType);
      });
  }, [url]);
  //console.log(roomType);

  //----예약 데이터 보내기----//
  const BookingConfirm = () => {
    const postUrl = `http://${myUrl}/api/booking/conference`;
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //값 입력
        classes: userClasses,
        roomId: roomId,
        roomType: roomType,
        startTime: '12:00',
        endTime: '13:00',
        teamMate: ['이현정'],
        userId: id,
        userName: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message.success) {
          //console.log(data.message.success);
          alert(data.message.success);
          navigate(`/mypage/${id}`);
        } else {
          //console.log(data.message.fail);
          alert(data.message.fail);
        }
      });
  };

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
      time = '0' + time; //숫자 앞에 0을 붙여줌
      return time;
    } else {
      return time;
    }
  }
  const nowHour = pluszero(NowHour);
  const nowMins = pluszero(NowMins);
  const nowTime = nowHour + nowMins;
  //console.log(nowTime);
  const startTime = '0830';
  const endTime = '2100';
  useEffect(() => {
    if (startTime > nowTime || endTime < nowTime) {
      setAblebtn(false);
    } else {
      setAblebtn(true);
    }
  }, []); //useEffect써서 한번만 렌더링 해줌

  //----무결님 버튼 클릭 작업----//
  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];
  //예약된 시간 추출
  const booking_data = dummy.booking;
  const bookedTimes = [];
  booking_data.map((booking) =>
    bookedTimes.push(booking.time_start, booking.time_end)
  );
  //예약된 시간 적용한 disabledList 생성
  const defaultDisabledList = [];
  times.map((time) =>
    defaultDisabledList.push(bookedTimes.includes(time) ? true : false)
  );
  const [disabledState, setDisabledState] = useState(defaultDisabledList);
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
        alert('최대 예약시간은 2시간입니다 !');
      } else {
        updatedCheckedState(index);
      }
    }
  };

  return (
    <div>
      <div className={styles.wrap}>
        <h6 className={styles.userinfo}> 예약자 정보 </h6>
        <div className={styles.list}>
          <p>
            신청자명
            <input
              style={{ fontWeight: 'bold' }}
              className={styles.input}
              type='text'
              name='val'
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
                value={name}
                type='text'
                placeholder='팀원 선택하기'
                required
              />
            </p>
            <div className={styles.membersBox}>
              {names.map((item, index) => (
                <button key={index} className={styles.membersName}>
                  {item}
                </button>
              ))}
            </div>
          </form>
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
                variant='success'
                disabled={disabledState[index]}
                style={{
                  margin: '10px',
                  color: 'green',
                  fontSize: '16px',
                  fontWeight: 'bold',
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
          disabled={ablebtn === true ? false : true}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default UserInfoTimeData;
