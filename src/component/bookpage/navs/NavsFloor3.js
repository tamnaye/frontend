//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';

function NavsFloor3({ navData }) {
  //----/api/booking----//
  const [roomData, setRoomData] = useState([]);
  //3층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  const floor3Studio = roomData.filter((room) => room.roomType === 'studio');
  const floor3Meeting = roomData.filter((room) => room.roomType === 'meeting');
  const floor3Nabox = roomData.filter((room) => room.roomType === 'nabox');

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
