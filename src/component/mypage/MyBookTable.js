//style commit test222
import styles from './MyBookTable.module.css';

function MyBookTable() {
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
            <th scope='col'>팀원</th>
            <th scope='col'>예약수정</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>거문오름</td>
            <td>09:00~11:00</td>
            <td>송민아 조무결 안수빈</td>
            <td>
              <button className={styles.cancel} onClick={Cancel}>
                취소하기
              </button>
            </td>
          </tr>
          <tr>
            <td>NaBox1</td>
            <td>11:00~13:00</td>
            <td></td>
            <td>
              <button className={styles.cancel} onClick={Cancel}>
                취소하기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default MyBookTable;
