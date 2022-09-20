//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
//hooks
import { useState, useEffect } from 'react';
import useUrl from '../../../hooks/useUrl';

function NavsFloor2() {
  const myUrl = useUrl();

  const [roomData, setRoomData] = useState([]);
  //2층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  //매니저가 아닌경우에는 2층에서 신양 회의실 제거하기
  const floor2Meeting = roomData.filter(
    (room) => room.roomType === 'meeting' && room.roomName !== '신양'
  );
  const floor2Nabox = roomData.filter((room) => room.roomType === 'nabox');

  const url = `http://${myUrl}/api/booking/room-data?floor=2`;
  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data.roomData);
      });
  }, [url, roomData]);

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
