import styles from './Admin.module.css';
import React, { useState } from 'react';
import useUrl from '../../hooks/useUrl';

const TestAdmin = () => {
  const myUrl = useUrl();
  const [file, setFile] = useState(null);

  //+파일 배열로 만들기
  const [array, setArray] = useState([]);

  //+file데이터 프론트에서 해석해서 보여주는 작업
  //+new 내장함수를 이용해서 배열 복사
  const fileReader = new FileReader();

  //input file 값 확인
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(file);

  //+업로드한 파일을 js객체 배열로 변환하여 일반 텍스트 유형으로 읽을 수 있게 작업
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n')).split('\n');

    const array = csvRows.map((i) => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
  };

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

  //+Content 버튼 클릭 시 새로고침 막아주고나서
  //파일이 있다면 파일을 객체로 변화해서 읽어 보여주는 작업
  const onContentSubmit = (event) => {
    event.preventDefault();

    //+onload 이벤트를 이용해서 문서나 객체가 브라우저에서 로딩이 완료되면 이벤트가 발생한다.
    if (file) {
      fileReader.onload = (event) => {
        const text = event.target.result;
        csvFileToArray(text);
      };
      //readAsText()메서드는 파일의 컨텐츠를 읽기 위해 사용된다.
      fileReader.readAsText(file);
    }
  };
  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
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
            type='file'
            className={styles.input}
          />
          <div>
            <button onClick={onUploadSubmit} className={styles.upload_btn}>
              Upload
            </button>
            <button onClick={onContentSubmit} className={styles.content_btn}>
              Content
            </button>
          </div>
        </form>
        <br />
        <table>
          <tbody>
            <tr key={'header'}>
              {headerKeys.map((key) => (
                <td>{key}</td>
              ))}
            </tr>
            {array.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestAdmin;
