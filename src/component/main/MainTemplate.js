import SecondFloor from './secondFloorComponents/SecondFloor';
import ThirdFloor from './thirdFloorComponents/ThirdFloor';
import FourthFloor from './fourthFloorComponents/FourthFloor';
import styles from './MainTemplate.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useUrl from '../../hooks/useUrl';
import { fetchGet } from '../../hooks/fetchUrl';
import { tokenExpired, refreshToken, removeToken, sendAuth } from '../../hooks/authModule';


const MainTemplate = () => {

  const myUrl = useUrl();

  const [userClasses, setUserClasses] = useState('');
  console.log("6) MainTemplate !! userClass : ",userClasses)
  const [maxClasses, setMaxClasses] = useState('');
  console.log("7) MainTemplate !! maxClasses : ",maxClasses)

  const url = `http://${myUrl}/api/user/data`;
  const location = useLocation()
  useEffect(() => {
    
    fetchGet(url,location)
  
        .then((data) => {
            console.log("5) MainTemplate !! data : ",data)
            setUserClasses(data.userData.classes);
            setMaxClasses(data.maxClasses);
        }).catch(e=>console.log("5) MainTemplate !! catch error : ",e))
  }, [ url, location]);
  return (
    <div>
      <div className={styles.floorContainer}>
        {/* classes 활용 */}
        {userClasses === 0 ? (
          [
            <SecondFloor key='2' className={styles.secondFloor} />,
            <ThirdFloor key='3' className={styles.thirdFloor} />,
            <FourthFloor key='4' className={styles.fourthFloor} />,
          ]
        ) : userClasses === maxClasses ? (
          <ThirdFloor key='3' className={styles.thirdFloor} />
        ) : (
          <SecondFloor key='2' className={styles.secondFloor} />
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
