import { useEffect, useState } from 'react'

const useTimeAlert = () => {
  const [ablebtn, setAblebtn] = useState(true) //예약시간이 아닐 때 상태변경(true일 때 버튼 활성화!)

  //21:00-08:30까지 예약 버튼 비활성화 함수
  const Now = new Date() //현재 날짜 및 시간 -> Tue Aug 23 2022 16:33:51 GMT+0900
  const NowHour = Now.getHours()
  const NowMins = Now.getMinutes()

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
    if (startTime > nowTime || endTime < nowTime) {
      setAblebtn(false)
    } else {
      setAblebtn(true)
    }
  }, []) //useEffect써서 한번만 렌더링 해줌

  const BookingConfirm = () => {
    if (startTime > nowTime || endTime < nowTime) {
      alert(
        '예약할 수 없는 시간입니다!\n오전08:30부터 오후21:00까지 예약이 가능합니다.'
      )
    }
  }
  return [ablebtn, BookingConfirm]
}

export default useTimeAlert
