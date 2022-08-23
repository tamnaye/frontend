//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
//hook
//import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import dummy from '../../db/roomData.json';

function Navs() {
  const { id } = useParams();
  console.log(id);

  //----더미 데이터 이용----//
  //2층 미팅룸 데이터 추출
  const rooms = dummy.roomData;
  console.log(rooms);
  const floor2 = rooms.filter((room) => room.floor === 2);
  const floor2Meeting = floor2.filter((room) => room.roomType === 'meeting');
  //2층 나박스 데이터 추출
  const floor2Nabox = floor2.filter((room) => room.roomType === 'nabax');
  //3층 미팅룸 데이터 추출
  const floor3 = rooms.filter((room) => room.floor === 3);
  const floor3Meeting = floor3.filter((room) => room.roomType === 'meeting');
  //3층 나박스 데이터 추출
  const floor3Nabax = floor3.filter((room) => room.roomType === 'nabax');

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
          {floor3Meeting.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          {floor3Nabax.map((item, index) => (
            <Dropdown.Item href={`/booking/${item.roomId}`} key={index}>
              {item.roomName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navs;
