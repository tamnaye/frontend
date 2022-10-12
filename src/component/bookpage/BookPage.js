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

  const [currentRoomData, setCurrentRoomData] = useState([]);

  const [navRoomData, setNavRoomData] = useState([]);
  const [floorUserData, setFloorUserData] = useState('');

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

      setCurrentRoomData(data.currentRoomData);

      setNavRoomData(data.roomData);
      setFloorUserData(data.userData.floor);
    });
  }, [url, navigate]);
  return (
    <div>
      {floorUserData === 0
        ? [<NavsAdmin key={0} navRoomData={navRoomData} />]
        : floorUserData === 2
        ? [<NavsFloor2 key={2} navRoomData={navRoomData} />]
        : [<NavsFloor3 key={3} navRoomData={navRoomData} />]}
      <div className={styles.roomInfo}>
        <RoomInfo currentRoomData={currentRoomData} />
        <div className={styles.bookingInfo}>
          <BookingData
            bookingData={bookingData}
            userData={userData}
            namesData={namesData}
            currentRoomData={currentRoomData}
          />
        </div>
      </div>
    </div>
  );
}
export default BookPage;
