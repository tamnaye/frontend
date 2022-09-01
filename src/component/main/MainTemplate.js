import SecondFloor from './secondFloorComponents/SecondFloor';
import ThirdFloor from './thirdFloorComponents/ThirdFloor';
import styles from './MainTemplate.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUrl from '../../hooks/useUrl';
// import useFetch from '../../hooks/useFetch'

const MainTemplate = () => {
  const { id } = useParams();
  const myUrl = useUrl();

  const [userClasses, setUserClasses] = useState('');
  const [maxClasses, setMaxClasses] = useState('');

  const url = `http://${myUrl}/api/user/data?userId=${id}`;
  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setUserClasses(data.userData.classes);
        setMaxClasses(data.maxClasses);
      });
  }, [id, url]);

  return (
    <div>
      <div className={styles.floorContainer}>
        {/* classes 활용 */}
        {userClasses === 0 ? (
          [
            <SecondFloor key='3' className={styles.secondFloor} />,
            <ThirdFloor key='2' className={styles.thirdFloor} />,
          ]
        ) : userClasses === maxClasses ? (
          <ThirdFloor key='2' className={styles.thirdFloor} />
        ) : (
          <SecondFloor key='3' className={styles.secondFloor} />
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
