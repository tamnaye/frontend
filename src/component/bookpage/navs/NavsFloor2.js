//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
//hooks
import { useState, useEffect } from 'react';

function NavsFloor2({ navData }) {
  //console.log('NavsAdmin !! navData :', navData);

  const [roomData, setRoomData] = useState([]);
  //2층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  //매니저가 아닌경우에는 2층에서 신양 회의실 제거하기
  const floor2Meeting = roomData.filter(
    (room) => room.roomType === 'meeting' && room.roomName !== '신양'
  );
  const floor2Nabox = roomData.filter((room) => room.roomType === 'nabox');

  useEffect(() => {
    setRoomData(navData);
  }, [navData]);

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
          {floor2Meeting.map((item, index) => (
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
          {floor2Nabox.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NavsFloor2;
