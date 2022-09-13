// import { Button } from "react-bootstrap";
// import { Che } from "antd";
import { useState } from 'react'
import dummy from '../db/booking_data.json'
import { Checkbox } from 'antd'
// import { click } from "@testing-library/user-event/dist/click";
import 'antd/dist/antd.min.css'

function TimeTableTest() {
  //length = 12
  const booking_data = dummy.booking
  const timeArray = []
  booking_data.map((booking) => timeArray.push(booking.time_start))
  booking_data.map((booking) => timeArray.push(booking.time_end))
  const baseTables = [
    { id: 0, time: '09:00', current: false },
    { id: 1, time: '10:00', current: false },
    { id: 2, time: '11:00', current: false },
    { id: 3, time: '12:00', current: false },
    { id: 4, time: '13:00', current: false },
    { id: 5, time: '14:00', current: false },
    { id: 6, time: '15:00', current: false },
    { id: 7, time: '16:00', current: false },
    { id: 8, time: '17:00', current: false },
    { id: 9, time: '18:00', current: false },
    { id: 10, time: '19:00', current: false },
    { id: 11, time: '20:00', current: false },
  ]
  const currentTimes = baseTables.map((times) =>
    timeArray.includes(times.time) ? { ...times, current: true } : times
  )
  const [times, setTimes] = useState(currentTimes)
  function category(id) {
    if (id === 0) {
      return <p>오전</p>
    } else if (id === 4) {
      return <p>오후</p>
    } else if (id === 9) {
      return <p>야간</p>
    }
  }
  //clicked ids state말고 전역 변수로 쓰면 setTimes 로 변수 초기화 됨
  //clicked ids state로 처리하면 비동기 처리로 시간차 발생함 (로그에 업데이트 사항 바로 안찍힘)
  // ## 배열 참고 : push는 길이를 반환하고, concat은 인자가 추가된 새로운 배열을 반환함
  const [clickedIds, setClickedIds] = useState([])

  function onClick(id) {
    const newArr = [...times]
    const originIds = [...clickedIds]
    if (clickedIds.length === 0) {
      setClickedIds([id])
      // max i = 11 / max id+1 = 12 / id = 11일 경우 id+1 true로 바꿔주는 로직은 알아서 예외처리 됨
      //i = id일 경우 current = false상태로 pass..
      //id+1은 그대로 pass
      //나머지 중 false인 것들 true로 바꿔줌
      //상태는 총 3가지임 : clicked, active, disabled
      for (let i = 0; i < newArr.length; i++) {
        if (i !== id && i !== id + 1 && i !== id - 1) {
          if (newArr[i].current !== true) {
            newArr[i].current = true
          }
        }
      }
      // setTimes(newArr)
    }
    //length가 1일 때 => clciked id = id : 해제 clicked id clear, setTimes /  clicked id != id : 추가 clickedids.push
    //length가 2일 때 => clickedIds.filter(num=> num!=id)
    else if (clickedIds.length >= 1) {
      if (clickedIds.length === 1) {
        if (clickedIds[0] === id) {
          //자기 자신 눌렀을때 -> 체크 해제
          originIds.length = 0
          setClickedIds(originIds)
          // clickedIds.length=0;
          setTimes(currentTimes)
        } else if (clickedIds[0] !== id) {
          //두개째 눌렀을때
          // if(clickedIds[0]>id && newArr[id+2].current===false){
          //   newArr[id+2].current=true
          // }else if(clickedIds[0]<id && newArr[id-2].current===false){
          //   newArr[id-2].current=true
          // }
          originIds.push(id)
          setClickedIds(originIds)
          setTimes(newArr)
        }
      } else if (clickedIds.length === 2) {
        // 두개다 눌린 상태에서 1) 하나 해제할 때 2) 다른 하나 선택할 때
        if (clickedIds.includes(id)) {
          const filteredIds = originIds.filter((num) => num !== id)
          setClickedIds(filteredIds)
        } else {
          window.confirm('no')
        }
      }
    }
    // console.log('clickedIds  : ', clickedIds)

    //기본 : 해당 id, id+1 active
    //1. filter -> false인 객체를 찾는다.
    //2. false인 객체 중 id값이 id+1인 객체가 있으면 id+1은 false로 남겨두고, 나머지를 true로 바꾼다.
    //3. false인 객체 중 id값이 id+1인 객체가 없으면 모두 true로 바꾼다.
  }
  return (
    <div>
      {times.map((time) => (
        <span key={time.id}>
          {category(time.id)}
          <Checkbox
            onClick={() => {
              onClick(time.id)
            }}
            variant="success"
            defaultChecked={false}
            disabled={time.current}
            style={{ margin: '10px' }}
          >
            {time.time}
          </Checkbox>
        </span>
      ))}
    </div>
  )
}
export default TimeTableTest
