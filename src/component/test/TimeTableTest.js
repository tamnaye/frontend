import { Button } from 'react-bootstrap'
import { useState } from 'react'
import dummy from '../../db/booking_data.json'
import './Timetable_test.module.css'

function TimeTableTest() {
  //length = 12
  const booking_data = dummy.booking
  const timeArray = []
  booking_data.map((booking) => timeArray.push(booking.time_start))
  booking_data.map((booking) => timeArray.push(booking.time_end))
  const baseTables = [
    { id: 1, time: '09:00', current: false },
    { id: 2, time: '10:00', current: false },
    { id: 3, time: '11:00', current: false },
    { id: 4, time: '12:00', current: false },
    { id: 5, time: '13:00', current: false },
    { id: 6, time: '14:00', current: false },
    { id: 7, time: '15:00', current: false },
    { id: 8, time: '16:00', current: false },
    { id: 9, time: '17:00', current: false },
    { id: 10, time: '18:00', current: false },
    { id: 11, time: '19:00', current: false },
    { id: 12, time: '20:00', current: false },
  ]
  let currentTimes = baseTables.map((times) =>
    timeArray.includes(times.time) ? { ...times, current: true } : times
  )
  const [times, setTimes] = useState(currentTimes)
  function category(id) {
    if (id === 1) {
      return <p>오전</p>
    } else if (id === 5) {
      return <p>오후</p>
    } else if (id === 10) {
      return <p>야간</p>
    }
  }
  function onClick(id) {
    console.log(id)
  }
  return (
    <div>
      {times.map((time) => (
        <span key={time.id}>
          {category(time.id)}
          <Button
            variant="success"
            disabled={time.current}
            style={{ margin: '10px' }}
          >
            {time.time}
          </Button>
        </span>
      ))}
    </div>
  )
}
export default TimeTableTest
