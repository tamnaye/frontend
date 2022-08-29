import styles from './MyBookTable.module.css';
import dummy from '../../db/userBookingData.json';

function MyBookTable() {
  //----dummy데이터 이용----//
  const userBookingData = dummy.userBookingData;
  //console.log(userBookingData);
  const roomName = userBookingData.map((room) => room.roomName);
  //console.log(roomName);
  const startTime = userBookingData.map((time) => time.startTime);
  const endTime = userBookingData.map((time) => time.endTime);
  //console.log(startTime);
  //console.log(endTime);
  const applicant = userBookingData.map((appli) => appli.applicant);
  console.log(applicant);
  const members = userBookingData.map((member) => member.participant);
  console.log(...members);

  // const person = members.join('[]');
  // console.log(person);

  const Cancel = () => {
    return window.confirm('예약을 취소하시겠습니까?');
  };

  return (
    <div className={styles.wrap}>
      <table id={styles.bookingBox} className='table caption-top'>
        <thead>
          <tr>
            <th scope='col'>공간</th>
            <th scope='col'>시간</th>
            <th scope='col'>신청자</th>
            <th scope='col'>팀원</th>
            <th scope='col'>예약수정</th>
          </tr>
        </thead>
        <tbody>
          {userBookingData.map((item, index) => (
            <tr key={index}>
              <td>{item.roomName}</td>
              <td>
                {item.startTime}-{item.endTime}
              </td>
              <td>{item.applicant}</td>
              <td>{item.members}</td>
              <td>
                <button className={styles.cancel} onClick={Cancel}>
                  취소하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default MyBookTable;
