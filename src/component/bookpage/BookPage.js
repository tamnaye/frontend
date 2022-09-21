//styles
import styles from './BookPage.module.css';
//BookingPage - component
import NavsAdmin from './navs/NavsAdmin';
import NavsFloor2 from './navs/NavsFloor2';
import NavsFloor3 from './navs/NavsFloor3';
import RoomInfo from './RoomInfo';
import BookingData from './BookingData';
//hooks
import useUrl from '../../hooks/useUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchGet } from '../../hooks/fetchUrl';

function BookPage() {
  const [bookingData, setBookingData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [namesData, setNamesData] = useState([]);

  const [roomData, setRoomData] = useState([]);

  const [navData, setNavData] = useState([]);
  const [userFloor, setUserFloor] = useState('');

  const { roomId } = useParams();
  const myUrl = useUrl();
  const url = `http://${myUrl}/api/booking?roomId=${roomId}`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      //console.log('bookpage !! data :', data);

      setBookingData(data.bookingData);
      setUserData(data.userData);
      setNamesData(data.namesData);

      setRoomData(data.nowRoomData);

      setNavData(data.roomData);
      setUserFloor(data.userData.floor);
    });
  }, [url, navigate]);
  return (
    <div>
      {userFloor === 0
        ? [<NavsAdmin key={0} navData={navData} />]
        : userFloor === 2
        ? [<NavsFloor2 key={2} navData={navData} />]
        : [<NavsFloor3 key={3} navData={navData} />]}
      <div className={styles.roomInfo}>
        <RoomInfo roomData={roomData} />
        <div className={styles.bookingInfo}>
          <BookingData
            bookingData={bookingData}
            userData={userData}
            namesData={namesData}
            roomData={roomData}
          />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
