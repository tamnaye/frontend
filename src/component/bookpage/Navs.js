//styles
import styles from './Navs.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

function Navs() {
  const meetingRoom2 = [
    '협재',
    '곽지',
    '이호',
    '함덕',
    '김녕',
    '월정',
    '신양',
    '하모',
    '화순',
    '중문',
    '표선',
  ];
  const studyRoom2 = [
    'NaBox1',
    'NaBox2',
    'NaBox3',
    'NaBox4',
    'NaBox5',
    'NaBox6',
  ];
  const meetingRoom3 = ['거문오름', '다랑쉬오름', '용눈이오름', '따라비오름'];
  const studyRoom3 = ['NaBox1', 'NaBox2', 'NaBox3'];

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
          {meetingRoom2.map((item, index) => (
            <Dropdown.Item href={`/booking/${item}`} key={index}>
              {item}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          {studyRoom2.map((item, index) => (
            <Dropdown.Item href={'/booking/' + item} key={index}>
              {item}
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
          {meetingRoom3.map((item, index) => (
            <Dropdown.Item href={`/booking/${item}`} key={index}>
              {item}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          {studyRoom3.map((item, index) => (
            <Dropdown.Item href={'/booking/' + item} key={index}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navs;
