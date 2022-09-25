import styles from './FileUpload.module.css';
import useUrl from '../../../hooks/useUrl';
import { useEffect } from 'react';
import { fetchGet } from '../../../hooks/fetchUrl';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const myUrl = useUrl();
  const url = `http://${myUrl}/admin/insert/user`;
  const navigate = useNavigate();

  useEffect(() => {
    fetchGet(url, navigate);
    // .then((data) => console.log(data));
  });

  let formData = new FormData(); //FormData(): Creates a new FormData object
  //console.log('FormData():', formData); // -> FormData {}

  //----input file 값 확인
  const onChange = (e) => {
    formData.append('file', e.target.files[0]);
    //console.log('target file:', formData);
    for (let value of formData.values()) {
      //console.log('formData onchange value:', value);
    }
  };

  //----Upload 버튼 클릭 시 새로고침 막아주고나서 POST
  const onUploadSubmit = (event) => {
    event.preventDefault();

    //----csv파일 POST
    fetch(`http://${myUrl}/admin/insert/user`, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log('data:', data, data.message);
        alert(data.message);
        window.location.reload(); //리액트 새로고침 -> 파일 Input 빈값처리
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <h3 className={styles.title}>최신기수 업로드</h3>
          <hr className={styles.line} />
          <div className={styles.file}>
            기수 인재 번호와 이름 데이터 최신 버전 파일을 업로드 해주세요!
            <br />
            <span className={styles.file_span}>
              📌 기수 | 인재번호 | 이름 순의 양식을 지켜주세요.
            </span>
          </div>
          {/* <input> 태그의 accept 속성은 서버로 업로드할 수 있는 파일의 타입을 명시 -> 이 속성은 type 속성값이 “file”인 경우에만 사용할 수 있다. */}
          <form className={styles.form}>
            <input
              onChange={onChange}
              accept={'.csv'}
              type='file'
              className={styles.input}
            />
            <div>
              <button onClick={onUploadSubmit} className={styles.upload_btn}>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
