//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import dummy from '../../../db/roomData.json';

function NavsFloor2() {
  const { roomId } = useParams();
  const { id } = useParams();

  //----/api/booking----//
  //const [data, setData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  //2층 룸리스트 추출 -> 미팅룸리스트 개인자습룸리스트 추출
  const floor2Meeting = roomData.filter((room) => room.roomType === 'meeting');
  const floor2Nabox = roomData.filter((room) => room.roomType === 'nabox');

  const url = `http://192.168.5.157:8080/api/booking?floor=2&roomId=${roomId}`;
  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        //setData(data);
        setRoomData(data.roomData);
      });
  }, [url]);

  //----더미 데이터 이용----//
  //2층 미팅룸 데이터 추출
  //const rooms = dummy.roomData;
  //console.log(rooms);
  //const floor2 = rooms.filter((room) => room.floor === 2);
  //const floor2Meeting = floor2.filter((room) => room.roomType === 'meeting');
  //2층 나박스 데이터 추출
  //const floor2Nabox = floor2.filter((room) => room.roomType === 'nabax');

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
            <Dropdown.Item href={`/booking/${item.roomId}/${id}`} key={index}>
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
          개인 자습실
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {floor2Nabox.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}/${id}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default NavsFloor2;
