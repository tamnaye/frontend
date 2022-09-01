import styles from './MyBookTable.module.css';
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

  return (
    <div className={styles.wrap}>
      <div id={styles.bookingBox}>
        <table className='table caption-top'>
          <thead>
            <tr>
              <th scope='col'>공간</th>
              <th scope='col'>시간</th>
              <th scope='col'>신청자</th>
              <th scope='col'>팀원</th>
              <th scope='col'>예약취소</th>
            </tr>
          </thead>
          <tbody>
            {myBookingList.map((item, index) => (
              <tr key={index}>
                <td>{item.roomName}</td>
                <td>
                  {item.startTime}-{item.endTime}
                </td>
                <td>{item.applicant.userName}</td>
                <td>{item.participants}</td>
                <td>
                  <button
                    key={index}
                    className={
                      item.applicant.userId === id
                        ? [styles.applicantCancel]
                        : [styles.memberCancel]
                    }
                    onClick={() => Cancel(item.bookingId, index)}
                    disabled={item.applicant.userId === id ? false : true}
                  >
                    {item.mode === 'cancel'
                      ? '공식일정'
                      : item.applicant.userId === id
                      ? '취소가능'
                      : '취소불가'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.warning}>
          * 예약 신청자인 경우에만 취소가 가능합니다.
        </p>
      </div>
    </div>
  );
}
export default MyBookTable;
