import { useParams } from 'react-router-dom'; //App.js 동적 라우팅을 넘겨받기 위해서
//import useFetch from '../../hooks/useFetch';
//styles
import styles from './RoomInfo.module.css';
//component
import geomun from './img/geomun.jpeg';
import darrenche from './img/darrenche.jpeg';
import yongnuni from './img/yongnuni.jpeg';
import darabi from './img/darabi.jpeg';
import nabox from './img/nabox.jpeg';

function RoomInfo() {
  // const room = useFetch('http://144.24.91.218:8000/rooms/');
  // console.log(room);

  const { spaceName } = useParams(); //App.js 동적 라우팅을 넘겨받은 데이터 변수 지정하기!
  //두가지 방법
  //딕셔너리안에 키값을 넣기위해서는 예시로 room.room이렇게 갖고 와야하는데 변수 {} 지정해주이 이미 딕션너리 안에 키값을 가져온거니깐 그냥 사용하면 됨!
  //const room_name = useParams(); //<h3>{room_name.room_name} 회의실</h3>
  const rooms = [
    {
      room_name: '다랑쉬오름',
      img: darrenche,
    },
    {
      room_name: '용눈이오름',
      img: yongnuni,
    },
    {
      room_name: '따라비오름',
      img: darabi,
    },
    {
      room_name: '거문오름',
      img: geomun,
    },
    {
      room_name: 'NaBox1',
      img: nabox,
    },
    {
      room_name: 'NaBox2',
      img: nabox,
    },
    {
      room_name: 'NaBox3',
      img: nabox,
    },
  ];

  const [roominfo] = rooms.filter((room) => room.room_name === spaceName);
  //console.log(roominfo);
  //const roominfo = rooms.filter((room) => room.room_name === space);
  //console.log(roominfo[0]);
  return (
    <div className={styles.wrap}>
      <h3 className={styles.roomName}>{roominfo.room_name} 공간</h3>
      <img className={styles.room_img} alt='room_img' src={roominfo.img}></img>
      <div>
        <h6 className={styles.note}> 공간 사용 안내 </h6>
        <div className={styles.contents}>
          <p>- 모든 공간은 당일 예약만 가능</p>
          <p>- 1일 최대 사용 가능 시간 : 2시간</p>
          <p>- 회의실은 1인 사용 및 예약 불가 </p>
          <p>- NaBox는 1인만 사용 가능 </p>
          <p>- 사용 후 기재 정리 및 모든 전원 OFF</p>
        </div>
      </div>
    </div>
  );
}
export default RoomInfo;
