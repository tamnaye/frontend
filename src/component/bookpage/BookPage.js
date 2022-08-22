//styles
import styles from './BookPage.module.css';
//BookingPage - component
import Navs from './Navs';
import RoomInfo from './RoomInfo';
import UserInfo from './UserInfo';
import TimeTable from './TimeTable';

function BookPage() {
  return (
    <div>
      <Navs />
      <div className={styles.container}>
        <RoomInfo />
        <div className={styles.infowrap}>
          <UserInfo />
          <TimeTable />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
