//styles
import styles from './MyBookTable.module.css';
import Table from 'react-bootstrap/Table';
//hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUrl from '../../hooks/useUrl';

function MyBookTable() {
  const { id } = useParams();
  const myUrl = useUrl();
  //----서버데이터 불러오기----//
  const [myBookingList, setMyBookingList] = useState([]);
  const url = `http://${myUrl}/api/user/mypage?userId=${id}`;
  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setMyBookingList(data.myBookingDetailDataList);
      });
  }, [url]);
  console.log(myBookingList);
  //useId랑 applicantUserId랑 같을 때 값 출력하기
  const Cancel = (bid, index) => {
    const arr = [...myBookingList];
    //console.log(arr)
    if (window.confirm('예약을 취소하시겠습니까?')) {
      //console.log(bid);
      const postUrl = `http://${myUrl}/api/booking/cancellation`;
      fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          arr.splice(index, 1);
          setMyBookingList(arr);
        });
    }
  };
  //팀원 띄어쓰기로 보여주기//
  const Listout = (list) => {
    //console.log(list);
    let output = '';
    for (let people of list) {
      output += people + ' ';
    }
    return output;
  };

  //----시간이 지난경우 표시해주기 ----//
  // const Now = new Date();
  // const NowHour = Now.getHours();
  // console.log(NowHour); //12

  // const [passedTime, setPassedTime] = useState(true);
  // const PassTime = (pass) => {
  //   useEffect(() => {
  //     console.log(pass);
  //     let passEndTime = pass.substr(0, 2);
  //     console.log(passEndTime);
  //     if (Number(NowHour) < Number(passEndTime)) {
  //       setPassedTime(false);
  //     } else {
  //       setPassedTime(true);
  //     }
  //   }, [NowHour]);
  // };
  // console.log(passedTime);
  // PassTime("10:00")

  //----시간이 지난경우 표시해주기 ----//
  const Now = new Date();
  const NowHour = Now.getHours();
  console.log(NowHour); //13

  const passEndTime = myBookingList.filter((end) => end.endTime);
  console.log(passEndTime);

  return (
    <div>
      <Table responsive>
        <thead>
          <tr className={styles.tableTr}>
            <th className={styles.tableTh} scope='col'>
              공간
            </th>
            <th className={styles.tableTh} scope='col'>
              시간
            </th>
            <th className={styles.tableTh} scope='col'>
              신청자
            </th>
            <th className={styles.tableTh} scope='col'>
              팀원
            </th>
            <th className={styles.tableTh} scope='col'>
              예약취소
            </th>
          </tr>
        </thead>
        <tbody>
          {myBookingList.map((item, index) => (
            <tr key={index} className={styles.tableTr}>
              <td className={styles.tableTh}>{item.roomName}</td>
              <td className={styles.tableTh}>
                {item.startTime}-{item.endTime}
              </td>
              <td className={styles.tableTh}>{item.applicant.userName}</td>
              {/* 배열자체를 가져와서 문자열로 보여주기 -> `${item.participants}` //출력 : 송민아,이현정 */}
              {/* 팀원들을 for문을 돌려서 띄어쓰기로 보여주기 */}
              <td className={styles.tableTh}>{Listout(item.participants)}</td>
              <td className={styles.tableTh}>
                <button
                  key={index}
                  className={
                    item.mode === 'cancel'
                      ? [styles.managerCancel]
                      : item.applicant.userId === id
                      ? [styles.applicantCancel]
                      : [styles.memberCancel]
                  }
                  onClick={() => Cancel(item.bookingId, index)}
                  disabled={
                    item.mode === 'cancel'
                      ? true
                      : item.applicant.userId === id
                      ? false
                      : true
                  }
                >
                  {item.mode === 'cancel'
                    ? '사용불가'
                    : item.applicant.userId === id
                    ? '취소가능'
                    : '취소불가'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={styles.warning}>
        <p className={styles.warning1}>
          * 예약 신청자인 경우에만 취소가 가능합니다.
        </p>
        <p className={styles.warning2}>
          * 공식일정으로 인해 예약이 취소될 수 있습니다.
        </p>
      </div>
    </div>
  );
}
export default MyBookTable;
