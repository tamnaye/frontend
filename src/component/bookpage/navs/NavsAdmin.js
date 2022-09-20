//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
//hooks
import { useState, useEffect } from 'react';
import useUrl from '../../../hooks/useUrl';

function NavsAdmin({ navData, userFloor }) {
  console.log('NavsAdmin !! navData : ', navData);
  console.log('NavsAdmin !! userFloor : ', userFloor);
  const myUrl = useUrl();
  //미팅룸 데이터 추출
  const [roomData, setRoomData] = useState([]);
  //console.log(roomData);
  //2층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  const floor2 = roomData.filter((room) => room.floor === 2);
  //console.log(floor2);
  const floor2Meeting = floor2.filter((room) => room.roomType === 'meeting');
  //console.log(floor2Meeting);
  const floor2Nabox = floor2.filter((room) => room.roomType === 'nabox');
  //console.log(floor2Nabox);
  //3층 룸리스트 추출 -> 미팅룸리스트, 개인자습룸리스트 추출
  const floor3 = roomData.filter((room) => room.floor === 3);
  //console.log(floor3);
  const floor3Meeting = floor3.filter((room) => room.roomType === 'meeting');
  //console.log(floor3Meeting);
  const floor3Nabox = floor3.filter((room) => room.roomType === 'nabox');
  //console.log(floor3Nabox);
  const floor3Studio = floor3.filter((room) => room.roomType === 'studio');
  //console.log(floor3Studio);
  //4층 룸리스트 추출 -> 미팅룸리스트
  const floor4 = roomData.filter((room) => room.floor === 4);
  //console.log(floor4);

  const url = `http://${myUrl}/api/booking/room-data?floor=0`;
  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data.roomData);
      });
  }, [url]);

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
