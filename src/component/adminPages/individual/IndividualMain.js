//styles
import styles from './IndividualMain.module.css';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//hooks
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//custom hooks
import useUrl from '../../../hooks/useUrl';
import { fetchGet } from '../../../hooks/fetchUrl';

const IndividualMain = () => {
  const myUrl = useUrl();
  const navigate = useNavigate();

  // class 리스트 state //
  const [classList, setClassList] = useState([]);
  // 선택된 기수 state //
  const [classPickState, setClassPickState] = useState('기수 선택');
  // 관련 기수 users 전체 list //
  const [EachClassUsers, setEachClassUsers] = useState([]);
  // 모달창 show state
  const [show, setShow] = useState(false);
  // 수정에서 선택된 사람 데이터
  const [pickedUser, setPickedUser] = useState([]);

  // 드롭다운에 사용될 class들 가져오기//
  const url = `http://${myUrl}/admin/view/class-list`;
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      setClassList(data?.ClassList);
    });
  }, [url, myUrl, navigate]);

  console.log(classList);

  // 드롭 다운 선택 시 클릭 이름으로 변경 및 관련 데이터 가져오기
  const onClickClass = (event) => {
    setClassPickState(event.target.innerText);
    selectedClassData(event.target.value);
  };

  // 선택된 기수 관련 데이터 가져오는 함수
  const selectedClassData = (pickedClass) => {
    fetchGet(
      `http://${myUrl}/admin/view/user?classes=${pickedClass}`,
      navigate
    ).then((data) => {
      setEachClassUsers(data?.AllUserData);
    });
  };

  console.log(EachClassUsers);

  // userData title 리스트
  const userDataTitles = [
    { id: 'classes', title: '기수' },
    { id: 'userId', title: '인재번호' },
    { id: 'userName', title: '이름' },
    { id: 'roles', title: '권한' },
    { id: 'floor', title: '사용 가능 층수' },
  ];

  // 수정을 원하는 선택 user 정보 가져오기

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    // setPickedUser(data);
  };

  //----예약 데이터 보내기 참고하기----//
  function AddListConfirm() {
    // if (
    //   userClass !== 0 &&
    //   roomType === roomTypeArr[0] &&
    //   selectedNameState.length < 1 &&
    //   getStartEndTime(checkedState).timeLength === 0
    // ) {
    //   alert('회의 참여자와 회의 시간을 선택해 주세요');
    // } else if (
    //   roomType === roomTypeArr[0] &&
    //   userClass !== 0 &&
    //   selectedNameState.length < 1
    // ) {
    //   alert('회의 참여자를 1명 이상 선택해주세요');
    // } else if (getStartEndTime(checkedState).timeLength === 0) {
    //   alert('시간을 선택해 주세요');
    // } else {
    //   if (!isLoadding) {
    //     setIsLoading(true);
    //     const postUrl = `http://${myUrl}/api/booking/conference`;
    //     fetch(postUrl, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: getAuth().auth,
    //         reAuthorization: getAuth().reAuth,
    //       },
    //       body: JSON.stringify({
    //         //값 입력
    //         classes: userClass,
    //         roomId: roomId,
    //         roomType: roomType,
    //         // 시간 한시간일때랑 두시간일 때 예외처리 해줘야할듯
    //         startTime: getStartEndTime(checkedState).startTime, //checked state에서 index 찾아서 times 배열에서 뽑아냄
    //         endTime: timePlusMinus(
    //           getStartEndTime(checkedState).startTime,
    //           getStartEndTime(checkedState).timeLength
    //         ), // checked state에서  index 찾아서 times 배열에서 뽑아내서 +1
    //         teamMate: selectedNameState,
    //         userName: userName,
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data.message.success) {
    //           //console.log(data.message.success);
    //           alert(data.message.success);
    //           setIsLoading(false);
    //           navigate(`/mypage`);
    //         } else {
    //           //console.log(data.message.fail);
    //           alert(data.message.fail);
    //           setIsLoading(false);
    //         }
    //       });
    //   }
    // }
  }
  //----예약 데이터 보내기 참고하기----//

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <h3 className={styles.title}>개별 인재 관리</h3>
          <hr className={styles.line} />
          <div className={styles.buttons}>
            <DropdownButton
              style={{
                marginTop: '10px',
                fontSize: '12px',
                textAalign: 'center',
              }}
              id="dropdown-item-button"
              title={classPickState}
            >
              {classList.map((classes) => (
                <Dropdown.Item
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    fontSize: '13px',
                    textAalign: 'center',
                  }}
                  as="button"
                  key={classes}
                  value={classes}
                  onClick={(event) => {
                    onClickClass(event);
                  }}
                >
                  {classes === 0 ? '매니저' : `${classes}기`}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {/* 삭제 버튼 */}
            <button className={styles.upload_btn}>삭제</button>
          </div>
          <div>
            <Table bordered>
              <thead>
                <tr className={styles.tableTrTitle}>
                  <th className={styles.tableTh} style={{ width: '3rem' }}></th>
                  {/* 룸 타이틀 불러오기 */}
                  {userDataTitles.map((titles) => (
                    <th className={styles.tableTh} style={{ width: '12rem' }}>
                      {titles.title}
                    </th>
                  ))}
                  <th className={styles.tableTh} style={{}}>
                    수정하기
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 1. 추가하기 */}
                <tr>
                  <th></th>
                  {/* 1-1. 기수선택 */}
                  <th style={{ backgrondColor: 'rgb(93, 168, 226)' }}>
                    <Form.Select>
                      {classList.map((classes) => (
                        <option value={classes} style={{ textAlign: 'center' }}>
                          {classes === 0 ? '매니저' : `${classes}기`}
                        </option>
                      ))}
                    </Form.Select>
                  </th>
                  {/* 1-2. 인재번호 작성 */}
                  <th>
                    <Form.Group className="mb-1">
                      <Form.Control
                        style={{ textAlign: 'center' }}
                        placeholder="인재 번호"
                      />
                    </Form.Group>
                  </th>
                  {/* 1-3. 이름 작성 */}
                  <th>
                    <Form.Group className="mb-1">
                      <Form.Control
                        style={{ textAlign: 'center' }}
                        placeholder="이름"
                      />
                    </Form.Group>
                  </th>
                  {/* 1-4. 권한 선택 */}
                  <th>
                    <Form.Select style={{ textAlign: 'center' }}>
                      <option>USER</option>
                      <option>MANAGER</option>
                      <option>ADMIN</option>
                    </Form.Select>
                  </th>
                  {/* 1-5. 사용 층수 선택 */}
                  <th>
                    <Form.Select style={{ textAlign: 'center' }}>
                      <option>2</option>
                      <option>3</option>
                      <option>ALL</option>
                    </Form.Select>
                  </th>
                  {/* 1-6. 추가 하기 버튼 */}
                  <th>
                    <Button
                      style={{
                        width: '10rem',
                        marginLeft: '3px',
                        marginRight: '3px',
                        fontSize: '13px',
                      }}
                      variant="primary"
                      onClick={AddListConfirm}
                    >
                      추가하기
                    </Button>
                  </th>
                </tr>
                {EachClassUsers.map((data) => (
                  <tr key={data.userId}>
                    <th>
                      <input type="checkbox" value={data.classes} />
                    </th>
                    <th>
                      {data.classes === 0 ? '매니저' : `${data.classes}기`}
                    </th>
                    <th>{data.userId}</th>
                    <th>{data.userName}</th>
                    <th>{data.roles}</th>
                    <th>{data.floor}</th>
                    <th>
                      {/* 모달창 관련 */}
                      <>
                        {/* 모달창으로 들어가는 버튼 */}
                        <Button
                          style={{
                            width: '10rem',
                            marginLeft: '3px',
                            marginRight: '3px',
                            backgroundColor: '#2090ff',
                            fontSize: '13px',
                          }}
                          variant="primary"
                          onClick={handleShow}
                        >
                          수정하기
                        </Button>
                        {/* 모달창 */}
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          {/* 모달 창 헤더 */}
                          <Modal.Header closeButton>
                            <Modal.Title>{pickedUser.userId}</Modal.Title>
                          </Modal.Header>
                          {/* 모달창 내 수정사항 */}
                          <Modal.Body>
                            <Form.Group className="mb-1">
                              <Form.Label>이름</Form.Label>
                              <Form.Control placeholder="수정을 원하는 이름을 기입해주세요" />
                            </Form.Group>
                            <Form.Group className="mb-1">
                              <Form.Label>권한</Form.Label>
                              <Form.Select>
                                <option>USER</option>
                                <option>MANAGER</option>
                                <option>ADMIN</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>사용가능 층수</Form.Label>
                              <Form.Select>
                                <option>2</option>
                                <option>3</option>
                                <option>ALL</option>
                              </Form.Select>
                            </Form.Group>
                          </Modal.Body>
                          {/* 모달 창 아래 닫기 및 수정하기 버튼 */}
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              닫기
                            </Button>
                            <Button
                              variant="primary"
                              // onClick={onClickToChange}
                            >
                              수정하기
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualMain;
