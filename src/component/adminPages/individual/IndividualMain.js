//styles
import styles from "./IndividualMain.module.css";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import IndividualEditModal from "./IndividualEditModal";
//hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//custom hooks
import useUrl from "../../../hooks/useUrl";
import { fetchGet, fetchPostJson } from "../../../hooks/fetchUrl";

const IndividualMain = () => {
  const myUrl = useUrl();
  const navigate = useNavigate();

  // class 리스트 state //
  const [classList, setClassList] = useState([]);
  // 선택된 기수 state //
  const [classPickState, setClassPickState] = useState("기수 선택");
  const [classPickNumber, setClassPickNumber] = useState("");
  // 관련 기수 users 전체 list //
  const [EachClassUsers, setEachClassUsers] = useState([]);
  // 모달창 show state
  const [show, setShow] = useState([]);
  const [defaultShow, setDefaultShow] = useState([]);
  console.log("main show :", show);

  //--삭제 관련 state--//
  const [deletecheckedList, setDeletecheckedList] = useState([]);

  //--추가 관련 state--//
  const [addUserClass, setAddUserClass] = useState("6기");
  const [addUserClassNumber, setAddUserClassNumber] = useState("6");
  const [addUserId, setAddUserId] = useState(null);
  const [addUserName, setAddUserName] = useState(null);
  const [addUserRole, setAddUserRole] = useState("USER");
  const [addUserFloor, setAddUserFloor] = useState("2");
  const [addUserFloorNumber, setAddUserFloorNumber] = useState("2");

  //-- 수정 관련 state--//
  // 수정에서 선택된 사람 데이터
  const [pickedUserId, setPickedUserId] = useState({});

  // 수정에서 변경될 내용 데이터
  const [changedUserName, setChangedUserName] = useState("");
  const [changedUserRole, setChangedUserRole] = useState("USER");
  const [changedUserFloor, setChangedUserFloor] = useState("2");
  const [changedUserFloorNumber, setChangedUserFloorNumber] = useState("2");

  // const changedUserName = useRef(null);

  // 드롭다운에 사용될 class들 가져오기//
  const url = `http://${myUrl}/admin/view/class-list`;
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      console.log("useeffect list", data?.ClassList);
      setClassList(data?.ClassList);
    });
  }, [url, myUrl, navigate]);

  // console.log(classList);

  // 드롭 다운 선택 시 클릭 이름으로 변경 및 관련 데이터 가져오기
  const onClickClass = (event) => {
    setClassPickState(event.target.innerText);
    setClassPickNumber(event.target.value);
    selectedClassData(event.target.value);
  };

  // 선택된 기수 관련 데이터 가져오는 함수
  const selectedClassData = (pickedClass) => {
    fetchGet(
      `http://${myUrl}/admin/view/user?classes=${pickedClass}`,
      navigate
    ).then((data) => {
      setDefaultShow(new Array(data?.AllUserData.length).fill(false));
      setEachClassUsers(data?.AllUserData);
    });
  };

  // console.log(EachClassUsers);

  // userData title 리스트
  const userDataTitles = [
    { id: "classes", title: "기수" },
    { id: "userId", title: "인재번호" },
    { id: "userName", title: "이름" },
    { id: "roles", title: "권한" },
    { id: "floor", title: "사용 가능 층수" },
  ];

  //-- 1. 삭제를 원하는 User 정보 가져오기 --//
  const onDeleteChecked = (data) => {
    console.log("deletecheckedList.length : ", deletecheckedList.length);
    // setIsChecked(!isChecked);
    // console.log(checkedArr);
    if (deletecheckedList.length === 0) {
      setDeletecheckedList((deletecheckedList) => [
        ...deletecheckedList,
        data.data.userId,
      ]);
    } else {
      if (!deletecheckedList.includes(data.data.userId)) {
        setDeletecheckedList((deletecheckedList) => [
          ...deletecheckedList,
          data.data.userId,
        ]);
      } else {
        setDeletecheckedList(
          deletecheckedList.filter((checked) => checked !== data.data.userId)
        );
      }
    }
    // 변경된 state로 불러오는지 확인
    // selectedClassData(data.data.classes);
    console.log("deletecheckedList 1 ", deletecheckedList);
  };
  console.log("deletecheckedList 1 ", deletecheckedList);

  const onDeleteButton = () => {
    console.log("onDeleteButton : ", deletecheckedList);
    const postUrl = `http://${myUrl}/admin/deletion/user
    `;
    const object = {
      userIdList: deletecheckedList,
    };
    fetchPostJson(postUrl, object, navigate).then((data) => {
      //console.log(data.message);
      alert(data.message);
      selectedClassData(classPickNumber);
      // window.location.reload(); //alert 버튼 클릭 시, 새로고침해서 데이터 다시 받아옴
    });
  };

  //-- 2.추가를 원하는 user 정보 가져오기 --//
  const onAddUserClass = (e) => {
    setAddUserClass(e.target.value);
    setAddUserClassNumber([
      e.target.value === "매니저" ? 0 : Number(e.target.value.slice(0, 1)),
    ]);
  };

  const onAddUserId = (e) => {
    e.preventDefault();
    setAddUserId(e.target.value);
  };
  const onAddUserName = (e) => {
    e.preventDefault();
    setAddUserName(e.target.value);
  };
  const onAddUserRole = (e) => {
    e.preventDefault();
    setAddUserRole(e.target.value);
  };
  const onAddUserFloor = (e) => {
    e.preventDefault();
    setAddUserFloor(e.target.value);
    setAddUserFloorNumber([e.target.value === "ALL" ? 0 : e.target.value]);
  };

  const onAddListConfirm = () => {
    // console.log(addUserClassNumber[0]);
    // console.log(addUserId);
    // console.log(addUserName);
    // console.log(addUserRole);
    // console.log(addUserFloorNumber[0]);

    const postUrl = `http://${myUrl}/admin/insertion/user`;
    const object = {
      classes: addUserClassNumber[0],
      floor: addUserFloorNumber[0],
      roles: addUserRole,
      userId: addUserId,
      userName: addUserName,
    };
    fetchPostJson(postUrl, object, navigate).then((data) => {
      //console.log(data.message);
      alert(data.message);
      window.location.reload(); //alert 버튼 클릭 시, 새로고침해서 데이터 다시 받아옴
      selectedClassData(addUserClassNumber[0]);
      setAddUserId(" ");
      setAddUserName(" ");
    });
  };

  //-- 3.수정을 원하는 선택 user 정보 가져오기 --//
  const closeModalHandler = (index) => {
    const arr = [...defaultShow];
    // arr[index] = false
    setShow(arr);
    // setChangedUserName("");
    // changedUserName.current = '';
  };

  const handleShow = (index) => {
    console.log("handle show : ", index);
    const arr = [...defaultShow];
    arr[index] = true;
    setShow(arr);
    // console.log("handle show :",data.data.userId)
    // console.log("handle show data :", data);
    // setPickedUserId(data.userId);
    // console.log(data.data);
    // console.log(data.data.userId);
    // console.log(pickedUserId);
  };

  // const onChangeName = (e) => {
  //   e.preventDefault();
  //   // changedUserName.current = e.target.value;
  //   setChangedUserName(e.target.value);
  //   console.log(e.target.value);
  // };

  // const onChangeRole = (e) => {
  //   e.preventDefault();
  //   setChangedUserRole(e.target.value);
  // };

  // const onChangeFloor = (e) => {
  //   e.preventDefault();
  //   setChangedUserFloor(e.target.value);
  //   setChangedUserFloorNumber([e.target.value === 'ALL' ? 0 : e.target.value]);
  // };

  const userEditHandler = (userName, role, floor) => {
    // console.log(classPickNumber);
    // console.log(changedUserFloorNumber[0]);
    // console.log(changedUserRole);
    // console.log(pickedUserId);
    // console.log(changedUserName);
    setShow(false);

    const postUrl = `http://${myUrl}/admin/update/user`;
    // const object = {
    //   classes: classPickNumber,
    //   floor: changedUserFloorNumber[0],
    //   roles: changedUserRole,
    //   userId: pickedUserId,
    //   userName: changedUserName,
    // };
    const object = {
      classes: classPickNumber,
      floor: floor,
      roles: role,
      userId: pickedUserId,
      userName: userName,
    };
    fetchPostJson(postUrl, object, navigate).then((data) => {
      //console.log(data.message);
      alert(data.message);

      selectedClassData(classPickNumber);
      // handleClose();
      // window.location.reload(); //alert 버튼 클릭 시, 새로고침해서 데이터 다시 받아옴
    });
    // handleClose();
    // selectedClassData(classPickNumber);
  };

  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h3 className={styles.title}>개별 인재 관리</h3>
            </div>
            <hr className={styles.line} />
            <div className={styles.buttons}>
              {/* 기수 데이터 정하는 버튼 */}
              <DropdownButton
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  textAalign: "center",
                }}
                id="dropdown-item-button"
                title={classPickState}
              >
                {classList.map((classes) => (
                  <Dropdown.Item
                    style={{
                      marginLeft: "3px",
                      marginRight: "3px",
                      fontSize: "13px",
                      textAalign: "center",
                    }}
                    as="button"
                    key={classes}
                    value={classes}
                    onClick={(event) => {
                      onClickClass(event);
                    }}
                  >
                    {classes === 0 ? "매니저" : `${classes}기`}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {/* 삭제 버튼 */}
              <button className={styles.upload_btn} onClick={onDeleteButton}>
                삭제
              </button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <Table
              bordered
              style={{ display: "block", height: "65vh", overflowY: "auto" }}
            >
              <thead style={{ tableLayout: "fixed" }}>
                <tr className={styles.tableTrTitle}>
                  <th className={styles.tableTh} style={{ width: "3rem" }}></th>
                  {/* 룸 타이틀 불러오기 */}
                  {userDataTitles.map((titles, idx) => (
                    <th
                      className={styles.tableTh}
                      key={idx}
                      style={{ width: "12rem" }}
                    >
                      {titles.title}
                    </th>
                  ))}
                  <th className={styles.tableTh}>수정하기</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. 추가하기 */}
                <tr>
                  <th></th>

                  {/* 1-1. 기수선택 */}
                  <th style={{ backgrondColor: "rgb(93, 168, 226)" }}>
                    <Form.Group className="mb-1">
                      <Form.Select
                        value={addUserClass}
                        onChange={(e) => onAddUserClass(e)}
                      >
                        {classList.map((classes, idx) => (
                          <option key={idx} style={{ textAlign: "center" }}>
                            {classes === 0 ? "매니저" : `${classes}기`}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </th>
                  {/* 1-2. 인재번호 작성 */}
                  <th>
                    <Form.Group className="mb-1">
                      <Form.Control
                        style={{ textAlign: "center" }}
                        placeholder="인재 번호"
                        value={addUserId}
                        onChange={(e) => onAddUserId(e)}
                        required
                      />
                    </Form.Group>
                  </th>
                  {/* 1-3. 이름 작성 */}
                  <th>
                    <Form.Group className="mb-1">
                      <Form.Control
                        style={{ textAlign: "center" }}
                        placeholder="이름"
                        value={addUserName}
                        onChange={(e) => onAddUserName(e)}
                        required
                      />
                    </Form.Group>
                  </th>
                  {/* 1-4. 권한 선택 */}
                  <th>
                    <Form.Group className="mb-1">
                      <Form.Select
                        style={{ textAlign: "center" }}
                        value={addUserRole}
                        onChange={(e) => onAddUserRole(e)}
                        required
                      >
                        <option>USER</option>
                        <option>MANAGER</option>
                        <option>ADMIN</option>
                      </Form.Select>
                    </Form.Group>
                  </th>
                  {/* 1-5. 사용 층수 선택 */}
                  <th>
                    <Form.Group className="mb-1">
                      <Form.Select
                        style={{ textAlign: "center" }}
                        value={addUserFloor}
                        onChange={(e) => onAddUserFloor(e)}
                        required
                      >
                        <option>2</option>
                        <option>3</option>
                        <option>ALL</option>
                      </Form.Select>
                    </Form.Group>
                  </th>
                  {/* 1-6. 추가 하기 버튼 */}
                  <th>
                    <Button
                      style={{
                        width: "10rem",
                        marginLeft: "3px",
                        marginRight: "3px",
                        fontSize: "13px",
                      }}
                      variant="primary"
                      onClick={onAddListConfirm}
                    >
                      추가하기
                    </Button>
                  </th>
                </tr>
                {/* 기수 정보 리스트 */}
                {EachClassUsers.map((data, index) => (
                  <tr key={data.userId}>
                    {/* 삭제 버튼 */}
                    <th>
                      <input
                        type="checkbox"
                        onChange={() => onDeleteChecked({ data })}
                        // checked={isChecked}
                      />
                    </th>
                    {/* 유저 정보 */}
                    <th>
                      {data.classes === 0 ? "매니저" : `${data.classes}기`}
                    </th>
                    <th>{data.userId}</th>
                    <th>{data.userName}</th>
                    <th>{data.roles}</th>
                    <th>{data.floor === 0 ? "ALL" : data.floor}</th>
                    <th>
                      {/* 모달창 관련 */}

                      {/* 모달창으로 들어가는 버튼 */}
                      <Button
                        style={{
                          width: "10rem",
                          marginLeft: "3px",
                          marginRight: "3px",
                          backgroundColor: "#2090ff",
                          fontSize: "13px",
                        }}
                        variant="primary"
                        onClick={() => handleShow(index)}
                      >
                        수정하기
                      </Button>
                    </th>
                      {show[index] ? (
                        <IndividualEditModal
                          userName={data.userName}
                          index={index}
                          onClose={closeModalHandler}
                          onEditUser={userEditHandler}
                          // pickedUserId={pickedUserId}
                        />
                      ) : null}
                  </tr>
                ))}
              </tbody>
              {/* 모달창 */}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndividualMain);
// export default IndividualMain;
