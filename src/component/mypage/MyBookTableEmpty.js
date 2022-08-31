import React from 'react';
import styles from './MyBookTableEmpty.module.css';
import { Container } from 'react-bootstrap';

const MyBookTableEmpty = () => {
  return (
    <div>
      <Container className={styles.text}>
        현재 예약한 공간이 없습니다.
      </Container>
    </div>
  );
};

export default MyBookTableEmpty;
