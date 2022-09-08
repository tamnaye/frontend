import React from 'react'
import { useState, useEffect } from 'react'
import styles from './ThirdFloorMeetingRoomState.module.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Poplay from '../Poplay'
import PoplayNabox from '../PoplayNabox'
import { Link } from 'react-router-dom'
import {
  EmojiSmileFill,
  ArrowRightCircleFill,
  Calendar2CheckFill,
} from 'react-bootstrap-icons'
import useUrl from '../../../hooks/useUrl'

// import { useNavigate } from 'react-router-dom'

const ThirdFloorMeetingRoomState = () =>
  // bookingData,
  // roomData,
  // ThirdMeetingStudioinfo,
  {
    // API 3층 회의실 가져오기
    const [bookingData, setBookingData] = useState([])
    const [roomData, setRoomData] = useState([])
    // const navigate = useNavigate()

    const myUrl = useUrl()
    const url = `http://${myUrl}/api/booking/details-booking?floor=3`
    useEffect(() => {
      fetch(url, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setBookingData(data.BookingData)
          setRoomData(data.RoomData)
        })
    }, [url, myUrl])

    const ThirdMeetingStudioinfo = roomData.filter(
      (rooms) => rooms.roomType === 'meeting' || rooms.roomType === 'studio'
    )

    // 타임 리스트 돌리기
    let timeList = []
    for (let i = 9; i <= 20; i++) {
      timeList.push(i + '시')
    }

    // 09:00 형태 9로 숫자만 뽑아주는 함수
    const TimeToString = (time) => {
      let newTime
      if (time === '09:00') {
        newTime = time.substr(1, 1)
      } else {
        newTime = time.substr(0, 2)
      }
      return newTime
    }

    // 9시 형태 9로 숫자만 뽑아주는 함수
    const onlyTime = (time) => {
      let newTime
      if (time === '9시') {
        newTime = time.substr(0, 1)
      } else {
        newTime = time.substr(0, 2)
      }
      return newTime
    }

    // 시간당 룸의 예약 데이터 불러오는 함수
    const TimeAndRoomFilter = (Time, Room) => {
      let timedata = bookingData.filter(
        (room) =>
          room.roomId === Room &&
          TimeToString(room.startTime) === onlyTime(Time)
      )
      return timedata
    }

    // 시간당 룸의 예약이 있는지 없는지 함수
    const IsThisTimeRoombooked = (Time, Room) => {
      const IsTrue = TimeAndRoomFilter(Time, Room).length !== 0
      return IsTrue
    }

    // 예약 시간 함수
    const bookingLength = (startTime, endTime) => {
      let length =
        Number(TimeToString(endTime)) - Number(TimeToString(startTime))
      return length
    }
    // console.log(navigate(`/booking/${301}`))

    return (
      <div className={styles.tableBox}>
        <table className="table table-bordered" id={styles.table}>
          <thead className="table-light" id={styles.thead}>
            <tr id={styles.theadTr}>
              <th className="table-primary" id={styles.time}></th>

              {/* 룸 값 불러오기 */}
              {ThirdMeetingStudioinfo.map((room) => (
                <th
                  key={room.roomId}
                  className="table-primary"
                  id={styles.text}
                >
                  <Link to={`/booking/${room.roomId}`} id={styles.roomTitle}>
                    <ArrowRightCircleFill />
                    {'\n'}
                    {room.roomName}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody id={styles.tbody}>
            {/* 시간을 맵으로 돌려 전체 상태값 전달 */}
            {timeList.map((time) => (
              <tr key={time} id={styles.tbodyTr}>
                <th className={styles.time}>{time}</th>

                {/* 룸을 맵으로 돌려 하나의 시간에 상태값 전달 */}
                {ThirdMeetingStudioinfo.map((room) => (
                  <th
                    key={room.roomId}
                    className={styles.roomstate}
                    // onClick={() => navigate(`/booking/${room.roomId}`)}
                  >
                    {IsThisTimeRoombooked(time, room.roomId) ? (
                      <OverlayTrigger
                        trigger={['hover', 'focus']}
                        key={TimeAndRoomFilter(time, room.roomId)[0].bookingId}
                        placement="top"
                        overlay={
                          <Popover id="popover-positioned-top">
                            <Popover.Body>
                              {room.roomId === 308 ? (
                                <PoplayNabox
                                  userName={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .applicant.userName
                                  }
                                  startTime={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .startTime
                                  }
                                  endTime={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .endTime
                                  }
                                  roomName={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .roomName
                                  }
                                />
                              ) : (
                                <Poplay
                                  userName={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .applicant.userName
                                  }
                                  startTime={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .startTime
                                  }
                                  endTime={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .endTime
                                  }
                                  roomName={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .roomName
                                  }
                                  participants={
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .participants
                                  }
                                />
                              )}
                              {/* <Poplay
                                userName={
                                  TimeAndRoomFilter(time, room.roomId)[0]
                                    .applicant.userName
                                }
                                startTime={
                                  TimeAndRoomFilter(time, room.roomId)[0]
                                    .startTime
                                }
                                endTime={
                                  TimeAndRoomFilter(time, room.roomId)[0]
                                    .endTime
                                }
                                roomName={
                                  TimeAndRoomFilter(time, room.roomId)[0]
                                    .roomName
                                }
                                participants={
                                  TimeAndRoomFilter(time, room.roomId)[0]
                                    .participants
                                }
                              /> */}
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <button
                          style={{
                            height: `${
                              bookingLength(
                                TimeAndRoomFilter(time, room.roomId)[0]
                                  .startTime,
                                TimeAndRoomFilter(time, room.roomId)[0].endTime
                              ) * 35.8
                            }px`,
                          }}
                          className={styles.bookingTime}
                          id={
                            TimeAndRoomFilter(time, room.roomId)[0].official
                              ? [styles.Manager]
                              : null
                          }
                          variant="secondary"
                        >
                          {TimeAndRoomFilter(time, room.roomId)[0].official
                            ? [
                                <p key={0}>
                                  <Calendar2CheckFill />
                                  &nbsp; 공식 일정
                                </p>,
                              ]
                            : [
                                <p key={1}>
                                  <EmojiSmileFill />
                                  {'\n'}
                                  {
                                    TimeAndRoomFilter(time, room.roomId)[0]
                                      .applicant.userName
                                  }
                                  {/* 님 예약 */}
                                </p>,
                              ]}
                        </button>
                      </OverlayTrigger>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

export default ThirdFloorMeetingRoomState
