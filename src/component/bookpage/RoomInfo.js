//styles
import styles from './RoomInfo.module.css';
//hooks
import { useState, useEffect } from 'react';
import useRoomImg from '../../hooks/useRoomImg';

function RoomInfo({ currentRoomData }) {
  const [roomInfo, setRoomInfo] = useState('');

  useEffect(() => {
    setRoomInfo(
      currentRoomData
      // roomData?.filter((info) => info.roomId === Number(roomId))[0].roomName
      //왼쪽부터 오른쪽 순으로 -> 원래 데이터에서 필터를 돌리고 로컬 라우트에서 roomId와 일치하면 [0]배열의 roomName을 가져옴
    );
    //비동기 이해하기 -> 의존성 배열과 연결!
    //console.log('roominfo roomInfo :', roomInfo);
    //console.log('roominfo currentRoomData :', currentRoomData);
    // });
  }, [currentRoomData]);

  //로컬 자체에 room 이미지 저장해서 서버에서 받아온 roomId와 동일할 떄 원하는 이미지 불러오기
  const roomsImg = useRoomImg(); //useRoomImg 훅에서 가져옴
  //roomImg에서 필터를 돌면서 room_id와 roomData의 roomId가 같은 딕셔너리 추출
  //?의미 : roomInfo값이 없으면 null처리 해주고, 있으면 roomInfo.roomId를 읽어옴
  const [roomImg] = roomsImg.filter((img) => img.room_id === roomInfo?.roomId);

  return (
    <div className={styles.wrap}>
      <h3 className={styles.roomName}> {roomInfo.roomName} 공간</h3>
      <img className={styles.room_img} alt='room_img' src={roomImg?.img}></img>
      <div>
        <h6 className={styles.note}> 공간 사용 안내 </h6>
        <div className={styles.contents}>
          <p>- 모든 공간은 당일 예약만 가능</p>
          <p>- 최대 사용 가능 시간 : 2층-3시간 / 3층-2시간</p>
          <p>- 회의실은 1인 사용 및 예약 불가 </p>
          <p>- NaBox는 1인만 사용 가능 </p>
          <p>- 사용 후 기재 정리 및 모든 전원 OFF</p>
        </div>
      </div>
    </div>
  );
}
export default RoomInfo;
