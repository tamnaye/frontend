//useHook
import { useNavigate } from 'react-router-dom';
//styles
import styles from './TimeTable.module.css';

function TimeTable() {
  const navigate = useNavigate();
  const BookingConfirm = () => {
    alert('🎉 예약 되었습니다 🎉 마이페이지로 이동합니다 :)');
    navigate('/mypage');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.timeTable}>
        <div>
          <p className={styles.title}>✔︎ 원하는 시간대를 선택해 주세요.</p>
          <div>
            <p className={styles.text}>오전</p>
            <div className={styles.btnBox}>
              {/* 로컬 자체에서 배열 만들어서 맵으로 만들어 주기 */}
              <button>09:00</button>
              <button>10:00</button>
              <button>11:00</button>
              <button>12:00</button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className={styles.text}>오후</p>
            <div className={styles.btnBox}>
              <button>13:00</button>
              <button>14:00</button>
              <button>15:00</button>
              <button>16:00</button>
              <button>17:00</button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className={styles.text}>야근</p>
            <div className={styles.btnBox}>
              <button>18:00</button>
              <button>19:00</button>
              <button>20:00</button>
            </div>
          </div>
        </div>
      </div>
      <button className={styles.bookbtn} onClick={BookingConfirm}>
        예약하기
      </button>
    </div>
  );
}

export default TimeTable;
