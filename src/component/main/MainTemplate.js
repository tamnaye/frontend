import SecondFloor from './secondFloorComponents/SecondFloor';
import ThirdFloor from './thirdFloorComponents/ThirdFloor';
import FourthFloor from './fourthFloorComponents/FourthFloor';
import styles from './MainTemplate.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUrl from '../../hooks/useUrl';

const MainTemplate = () => {
  const id = window.localStorage.getItem('userid');
  const authorization = window.localStorage.getItem('Authorization');
  //console.log(authorization)
  // console.log('mainTemplete : ', id)
  const navigate = useNavigate();

  const myUrl = useUrl();

  const [userClasses, setUserClasses] = useState('');
  const [maxClasses, setMaxClasses] = useState('');

  const url = `http://${myUrl}/api/user/data?userId=${id}`;
  useEffect(() => {
    if (id === null) {
      alert('로그인 후 사용 가능합니다.');
      navigate(`/`);
    } else {
      fetch(url, {
        method: 'GET',
        // headers: {
          // Authorization: authorization,
        // },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserClasses(data.userData.classes);
          setMaxClasses(data.maxClasses);
          // window.localStorage.setItem('class', data.userData.classes);
        });
    }
  }, [id, url, navigate]);

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
