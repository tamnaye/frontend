//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
//hooks
import { useState, useEffect } from 'react';

function NavsAdmin({ navData, userFloor }) {
  console.log('NavsAdmin !! navData : ', navData);
  console.log('NavsAdmin !! userFloor : ', userFloor);

  //미팅룸 데이터 추출
  const [roomData, setRoomData] = useState([]);
  //2층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  const floor2 = roomData.filter((room) => room.floor === 2);
  const floor2Meeting = floor2.filter((room) => room.roomType === 'meeting');
  const floor2Nabox = floor2.filter((room) => room.roomType === 'nabox');
  //3층 룸리스트 추출 -> 미팅룸리스트, 개인자습룸리스트 추출
  const floor3 = roomData.filter((room) => room.floor === 3);
  const floor3Meeting = floor3.filter((room) => room.roomType === 'meeting');
  const floor3Nabox = floor3.filter((room) => room.roomType === 'nabox');
  const floor3Studio = floor3.filter((room) => room.roomType === 'studio');
  //4층 룸리스트 추출 -> 미팅룸리스트
  const floor4 = roomData.filter((room) => room.floor === 4);

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
          2층 예약실
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {floor2Meeting.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          {floor2Nabox.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className={styles.box}>
        <Dropdown.Toggle
          className={styles.toggle}
          variant=''
          id='dropdown-basic'
        >
          3층 예약실
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
          <Dropdown.Divider />
          {floor3Nabox.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className={styles.box}>
        <Dropdown.Toggle
          className={styles.toggle}
          variant=''
          id='dropdown-basic'
        >
          4층 예약실
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {floor4.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NavsAdmin;
