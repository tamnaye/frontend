//styles
import styles from './Info.module.css';
//useHooks
import React, { useState } from 'react';
//component
import RoomImg from './RoomImg';

function Info() {
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

  return (
    <div className={styles.infoBox}>
      <RoomImg />
      <div className={styles.list}>
        <p>
          ✔ 신청자명
          <input className={styles.userName} type='text' name='val' disabled />
        </p>
        <p>
          ✔ 이용목적
          <select className={styles.purpose}>
            <option value=''></option>
            <option value='회의'>회의</option>
            <option value='스터디'>스터디</option>
            <option value='기타'>기타</option>
          </select>
        </p>
        <form onSubmit={onSubmit}>
          <p>
            ✔ 팀원선택
            <input
              className={styles.teamMembers}
              onChange={onChange}
              value={name}
              type='text'
              placeholder='검색'
            />
          </p>
          {/* 검색 이름 화면에 출력 */}
          <div className={styles.membersBox}>
            {names.map((item, index) => (
              <button key={index} className={styles.membersName}>
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Info;
