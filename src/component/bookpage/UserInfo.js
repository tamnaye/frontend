//styles
import styles from './UserInfo.module.css';
//useHooks
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseUrl from '../../hooks/UseUrl';

function Info() {
  //input 값 입력 시 실제 돔에 불러오기//
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const onChange = (event) => setName(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (name === '') {
      return; //빈칸이면 함수를 실행하지 않음
    }
    setNames((currentArray) => {
      return [...currentArray, name];
    });
    setName('');
  };

  //신청자명 데이터 로그인정보에서 불러오기 -> post//
  const { id } = useParams();
  const myUrl = UseUrl();

  const [userName, setUserName] = useState('');

  const url = `http://${myUrl}/api/user/data?userId=${id}`;

  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userData.userName);
      });
  }, [url]);
  //console.log(userName);

  //값보내는 거 이따!!!!!!!!!!!
  const postData = () => {
    const postUrl = `http://${myUrl}/api/booking/conference`;
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //값 입력
        classes: 6,
        official: false,
        roomId: 305,
        roomType: 'rabox',
        startTime: '12:00',
        endTime: '14:00',
        teamMate: [],
        userId: id,
        userName: userName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className={styles.wrap}>
      <h6 className={styles.userinfo}> 예약자 정보 </h6>
      <div className={styles.list}>
        <p>
          신청자명
          <input
            className={styles.input}
            type='text'
            name='val'
            placeholder={userName}
            disabled
          />
        </p>
        <form onSubmit={onSubmit}>
          <p>
            팀원선택
            <input
              className={styles.input}
              onChange={onChange}
              value={name}
              type='text'
              placeholder='검색'
              required
            />
          </p>
          <div className={styles.membersBox}>
            {names.map((item, index) => (
              <button key={index} className={styles.membersName}>
                {item}
              </button>
            ))}
          </div>
          <button onClick={postData}>post 연습용</button>
        </form>
      </div>
    </div>
  );
}
export default Info;
