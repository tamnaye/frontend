//styles
import styles from './BookPage.module.css';
//BookingPage - component
import Dropdown from './Navs';
import Info from './Info';
import TimeTable from './TimeTable';

function BookPage() {
  return (
    <div>
      <Dropdown />
      <Info />
      <TimeTable />
    </div>
  );
}
export default BookPage;
