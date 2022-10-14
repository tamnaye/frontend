import { useEffect, useState } from 'react'

const useTimeAbled = () => {
    const [ablebtn, setAblebtn] = useState(true) //예약시간이 아닐 때 상태변경(true일 때 버튼 활성화!)

    //21:00-08:30까지 예약 버튼 비활성화 함수
    const Now = new Date()
    const NowHour = Now.getHours()
    const NowMins = Now.getMinutes()

    //주말 예약 버튼 비활성화
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const NowDay = Now.getDay(); //new Date()
    const weekDay = day[NowDay];

  function pluszero(times) {
    let time = times.toString() //시간을 숫자에서 문자로 변환
    if (time.length < 2) {
      time = '0' + time //숫자 앞에 0을 붙여줌
      return time
    } else {
      return time
    }
  }
  const nowHour = pluszero(NowHour)
  const nowMins = pluszero(NowMins)
  const nowTime = nowHour + nowMins

  const startTime = '0830'
  const endTime = '2100'

  useEffect(() => {
  if (
    startTime > nowTime ||
    endTime < nowTime ||
    weekDay === '토' ||
    weekDay === '일'
  ) {
    setAblebtn(false);
  } else {
    setAblebtn(true);
  }
}, [nowTime, weekDay]);

  return ablebtn
}

export default useTimeAbled;