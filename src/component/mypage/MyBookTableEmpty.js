import React from 'react';
import styles from './MyBookTableEmpty.module.css';

const MyBookTableEmpty = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>현재 예약한 공간이 없습니다.</div>
    </div>
  );
};

export default MyBookTableEmpty;
