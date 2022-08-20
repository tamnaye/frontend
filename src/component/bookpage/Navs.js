//styles
import styles from './Navs.module.css'
import Dropdown from 'react-bootstrap/Dropdown';

function Navs() {
  const meetingRoom = ['거문오름', '다랑쉬오름', '용눈이오름', '따라비오름'];
  const studyRoom = ['NaBox1', 'NaBox2', 'NaBox3'];

  return (
    <Dropdown>
      <Dropdown.Toggle variant='' id='dropdown-basic'>
        2층 예약실
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {meetingRoom.map((item, index) => (
          <Dropdown.Item href={`/booking/${item}`} key={index}>
            {item}
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        {studyRoom.map((item, index) => (
          <Dropdown.Item href={'/booking/' + item} key={index}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Navs;
