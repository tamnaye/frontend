import { useParams } from 'react-router-dom'; //App.js 동적 라우팅을 넘겨받기 위해서
//styles
import styles from '../bookpage/RoomImg.module.css';
//component
import geomun from './img/geomun.jpeg';
import darrenche from './img/darrenche.jpeg';
import yongnuni from './img/yongnuni.jpeg';
import darabi from './img/darabi.jpeg';
import nabox from './img/nabox.jpeg';

function RoomImg() {
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
  console.log(roominfo);
  //const roominfo = rooms.filter((room) => room.room_name === space);
  //console.log(roominfo[0]);

  return (
    <div>
      <h3 className={styles.roomName}>{roominfo.room_name} 공간</h3>
      <img className={styles.room_img} alt='room_img' src={roominfo.img}></img>
    </div>
  );
}
export default RoomImg;

//<img className={styles.room_geomun} alt='geomun' src={studio} />
