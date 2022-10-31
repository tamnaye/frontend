import styles from './SecondFloorMap.module.css';
import { Link } from 'react-router-dom';
import { EmojiFrownFill } from 'react-bootstrap-icons';

const SecondFloorMap = ({
  ablebtn,
  BookingConfirm,
  SecondMeetingRoominfo,
  SecondNaboxinfo,
  bookingData,
  SecondOfficial,
  roomData,
  floor,
}) => {
  // roomFull 함수 설정
  // 현재 시간을 통해 남은 예약 가능 시간 확인
  const Now = new Date();
  const NowHour = Now.getHours();
  const RemainTime = 21 - NowHour;

  // 09:00 과 같은 형태 9로 수정해주는 함수
  const TimeToString = (time) => {
    let newTime;
    if (time === '09:00') {
      newTime = time.substr(1, 1);
    } else {
      newTime = time.substr(0, 2);
    }
    return newTime;
  };

  const notroomFull = (roomid) => {
    // room아이디와 현재 시간으로 거른 예약 현황
    const roomState = bookingData.filter(
      (room) =>
        room.roomId === roomid &&
        Number(TimeToString(room.startTime)) >= Number(NowHour)
    );

    //중간에 껴있는 시간 추출
    const middleRoomState = bookingData.filter(
      (room) =>
        room.roomId === roomid &&
        Number(TimeToString(room.startTime)) < Number(NowHour) &&
        Number(TimeToString(room.endTime)) > Number(NowHour)
    );

    // 거른 예약 현황을 대상으로 시간 추출 리스트
    const roomBookingState = roomState.map(
      (room) =>
        TimeToString(room.endTime) - Number(TimeToString(room.startTime))
    );

    //중간에 껴있는 시간의 현재 시간 이후 시간 추출 리스트
    const middleBookingState = middleRoomState.map(
      (room) => Number(TimeToString(room.endTime)) - Number(NowHour)
    );

    // 추출한 시간 합
    const sum = roomBookingState.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    //중간에 껴있는 시간 합
    const middleSum = middleBookingState.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    // 전체 추출 시간들의 합과 남은 시간 불린으로 결과값 제출
    return sum + middleSum < RemainTime;

    // 함수 테스트
    // return [middleSum, sum, sum + middleSum < RemainTime]
  };

  return (
    <div className={styles.Container}>
      <div className={styles.mapContainer}>
        {ablebtn ? null : (
          <h2 className={styles.alert}>
            <EmojiFrownFill />
            &nbsp;현재는 예약 시간이 아닙니다
          </h2>
        )}
        {SecondMeetingRoominfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}`}
            key={rooms.roomId}
            className={styles[rooms.roomName]}
            id={
              notroomFull(rooms.roomId) && ablebtn
                ? [styles.MeetingRoom]
                : [styles.full]
            }
            onClick={BookingConfirm}
          >
            <div>
              {notroomFull(rooms.roomId) && ablebtn
                ? rooms.roomName
                : `${rooms.roomName}\n마감`}
            </div>
          </Link>
        ))}
        {SecondNaboxinfo.map((rooms) => (
          <Link
            to={`/booking/${rooms.roomId}`}
            key={rooms.roomId}
            className={styles[`NaBox${rooms.roomId}`]}
            id={
              notroomFull(rooms.roomId) && ablebtn
                ? [styles.NaBox]
                : [styles.full]
            }
            onClick={BookingConfirm}
          >
            <div>
              {notroomFull(rooms.roomId) && ablebtn
                ? rooms.roomName.substr(6, 1)
                : `${rooms.roomName.substr(6, 1)}\n마감`}
            </div>
          </Link>
        ))}

        {/* official */}
        {SecondOfficial.map((rooms) =>
          floor === 0 ? (
            <Link
              to={`/booking/${rooms.roomId}`}
              key={1}
              className={styles[`official${rooms.roomId}`]}
              id={
                notroomFull(rooms.roomId) && ablebtn
                  ? [styles.MeetingRoom]
                  : [styles.full]
              }
              onClick={BookingConfirm}
            >
              <div>
                {notroomFull(rooms.roomId) && ablebtn
                  ? rooms.roomName
                  : `${rooms.roomName}\n마감`}
              </div>
            </Link>
          ) : (
            <div
              className={styles[`official${rooms.roomId}`]}
              key={2}
              id={styles.notSelect}
            >
              {rooms.roomName}
            </div>
          )
        )}

        <div className={styles.space범섬} id={styles.notSelect}>
          {`space\n범섬`}
        </div>
        <div className={styles.Lounge} id={styles.notSelect}>
          {`내일\nLounge`}
        </div>
        <div className={styles.화장실} id={styles.notSelect}>
          {`화\n장\n실`}
        </div>
        <div className={styles.stair} id={styles.notSelect}>
          {`계\n단`}
        </div>
        <div className={styles.EV} id={styles.notSelect}>
          E.V
        </div>
        <div className={styles.Stair2} id={styles.notSelect}>
          {`계\n단`}
        </div>
        <div className={styles.space우도} id={styles.notSelect}>
          {`space\n우도`}
        </div>
        <div className={styles.space비양도} id={styles.notSelect}>
          {`space\n비양도`}
        </div>
      </div>
    </div>
  );
};

export default SecondFloorMap;
