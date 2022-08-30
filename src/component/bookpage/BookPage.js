//styles
import styles from './BookPage.module.css';
//BookingPage - component
import NavsAdmin from './navs/NavsAdmin';
import NavsFloor2 from './navs/NavsFloor2';
import NavsFloor3 from './navs/NavsFloor3';
import RoomInfo from './RoomInfo';
import UserInfo from './UserInfo';
import TimeTable from './TimeTable';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookPage() {
  const { id } = useParams();

  //const [data, setData] = useState([]);
  const [userClasses, setUserClasses] = useState('');
  const [maxClasses, setMaxClasses] = useState('');

  const url = `http://192.168.5.157:8080/api/user/data?userId=${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //setData(data);
        setUserClasses(data.userData.classes);
        setMaxClasses(data.maxClasses);
      });
  }, [url]);
  //console.log(id);
  //console.log(data);
  //console.log(userClasses);
  //console.log(maxClasses);

  return (
    <div>
      {userClasses === 0 ? (
        <NavsAdmin />
      ) : userClasses === maxClasses ? (
        <NavsFloor3 />
      ) : (
        <NavsFloor2 />
      )}
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
