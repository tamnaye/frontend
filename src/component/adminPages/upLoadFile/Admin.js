import styles from './Admin.module.css';
import React, { useState } from 'react';
import useUrl from '../../../hooks/useUrl';
import Footer from '../../footer/Footer';

const Admin = () => {
  const myUrl = useUrl();
  const [file, setFile] = useState(null);

  //input file 값 확인
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  //console.log(file);

  //Upload 버튼 클릭 시 새로고침 막아주고나서
  //파일이 없는 경우 alert -> 파일이 있는 경우 POST
  const onUploadSubmit = (event) => {
    event.preventDefault();

    if (file === null) {
      alert('csv파일을 선택 해주세요!');
    }

    //csv파일 POST
    fetch(`http://${myUrl}/api/csv/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        // 보낼 값
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        //제출하고 나면 빈값으로 변경
      });
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <h3 className={styles.title}>관리자 페이지</h3>
          <p className={styles.explain}>
            향후 관리자 페이지에 더 많은 기능을 추가할 예정입니다.
          </p>
          <hr className={styles.line} />
          <div className={styles.file}>
            기수 인재 번호와 이름 데이터 최신 버전 파일을 업로드 해주세요!
          </div>
          {/* <input> 태그의 accept 속성은 서버로 업로드할 수 있는 파일의 타입을 명시 -> 이 속성은 type 속성값이 “file”인 경우에만 사용할 수 있다. */}
          <form className={styles.form}>
            <input
              onChange={onChange}
              accept={'.csv'}
              type="file"
              className={styles.input}
            />
            <div>
              <button onClick={onUploadSubmit} className={styles.upload_btn}>
                Upload
              </button>
              {/* <button onClick={onContentSubmit} className={styles.content_btn}>
              Content
            </button> */}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
