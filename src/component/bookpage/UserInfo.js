//styles
import styles from './UserInfo.module.css';
//useHooks
import React, { useState } from 'react';

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
    <div className={styles.wrap}>
      <h6 className={styles.userinfo}> 예약자 정보 </h6>
      <div className={styles.list}>
        <p>
          신청자명
          <input className={styles.input} type='text' name='val' disabled />
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
