//styles
import styles from './BookPage.module.css';
//BookingPage - component
import NavsAdmin from './navs/NavsAdmin';
import NavsFloor2 from './navs/NavsFloor2';
import NavsFloor3 from './navs/NavsFloor3';
import RoomInfo from './RoomInfo';
import UserInfoTimeData from './UserInfoTimeData';
//hooks
import useUrl from '../../hooks/useUrl';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookPage() {
  const { id } = useParams();
  const myUrl = useUrl();

  //const [data, setData] = useState([]);
  const [userClass, setUserClass] = useState('');
  const [maxClass, setMaxClass] = useState('');

  const url = `http://${myUrl}/api/user/data?userId=${id}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //setData(data);
        setUserClass(data.userData.classes);
        setMaxClass(data.maxClasses);
      });
  }, [url]);
  //console.log(id);
  //console.log(data);
  // console.log(userClass);
  // console.log(maxClass);

  return (
    <div>
      {userClass === 0 ? (
        <NavsAdmin />
      ) : userClass === maxClass ? (
        <NavsFloor3 />
      ) : (
        <NavsFloor2 />
      )}
      <div className={styles.container}>
        <RoomInfo />
        <div className={styles.infowrap}>
          <UserInfoTimeData userClass={userClass} />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
