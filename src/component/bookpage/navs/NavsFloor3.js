//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';

function NavsFloor3({ navRoomData }) {
  //console.log('NavsAdmin !! navRoomData :', navRoomData);

  const [roomData, setRoomData] = useState([]);
  //3층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  //룸타입 스튜디오 추가 총 룸타입 : official/meeting/nabox/studio
  //매니저가 아닌경우에는 2층에서 신양 회의실 제거하기 -> 룸타입은 official인 경우 필터에서 제거
  const floor3Studio = roomData.filter((room) => room.roomType === 'studio');
  const floor3Meeting = roomData.filter(
    (room) => room.roomType === 'meeting' && room.roomType !== 'official'
  );
  const floor3Nabox = roomData.filter((room) => room.roomType === 'nabox');

  useEffect(() => {
    setRoomData(navRoomData);
  }, [navRoomData]);

  return (
    <div className={styles.wrap}>
      <Dropdown className={styles.box}>
        <Dropdown.Toggle
          className={styles.toggle}
          variant=''
          id='dropdown-basic'
        >
          회의실
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {floor3Studio.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          {floor3Meeting.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className={styles.boxNabox}>
        <Dropdown.Toggle
          className={styles.toggle}
          variant=''
          id='dropdown-basic'
        >
          개인 자습실
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {floor3Nabox.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NavsFloor3;
