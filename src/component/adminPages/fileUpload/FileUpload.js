import styles from './FileUpload.module.css';
import useUrl from '../../../hooks/useUrl';

const FileUpload = () => {
  const myUrl = useUrl();
  const formData = new FormData(); //FormData(): Creates a new FormData object 폼을 쉽게 보내주는 객체, HTML 폼 데이터를 나타냄
  console.log('empty file:', formData);

  //input file 값 확인
  const onChange = (e) => {
    formData.append('file', e.target.files[0]);
    console.log('target file:', formData);
    for (let value of formData.values()) {
      console.log('formData onchange value:', value);
    }
  };

  //Upload 버튼 클릭 시 새로고침 막아주고나서
  //파일이 없는 경우 alert -> 파일이 있는 경우 POST
  const onUploadSubmit = (event) => {
    event.preventDefault();

    // if (file === null) {
    //   console.log('empty file null ? ', file);
    //   alert('csv파일을 선택 해주세요!');
    // }

    //csv파일 POST
    fetch(`http://${myUrl}/admin/update/user`, {
      method: 'POST',
      //--폼을 전송할 때 HTTP 메시지의 Content-Type 속성은 항상 multipart/form-data이고 메시지는 인코딩되어 전송됩니다.
      //--파일이 있는 폼도 당연히 이 규칙을 따르기 때문에 <input type="file">로 지정한 필드 역시 일반 폼을 전송할 때와 유사하게 전송됩니다.
      //
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      //
      cache: 'no-cache',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data:', data);
        alert('파일이 업로드 되었습니다.');
        // console.log(data.message);
        //제출하고 나면 빈값으로 변경
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <h3 className={styles.title}>관리자 페이지</h3>
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
              {/* <button onClick={onContentSubmit} className={styles.content_btn}>
              Content
            </button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
