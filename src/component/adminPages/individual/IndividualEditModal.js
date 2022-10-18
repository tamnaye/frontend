//styles
import styles from "./IndividualMain.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
//hooks
import React, { useState, useEffect } from "react";

const IndividualEditModal = (props) => {

//   const [show, setShow] = useState(false);

  //-- 수정 관련 state--//
  // 수정에서 선택된 사람 데이터
  const [pickedUserId, setPickedUserId] = useState({});

  // 수정에서 변경될 내용 데이터
  const [changedUserName, setChangedUserName] = useState("");
  const [changedUserRole, setChangedUserRole] = useState("USER");
  const [changedUserFloor, setChangedUserFloor] = useState("2");
  const [changedUserFloorNumber, setChangedUserFloorNumber] = useState("2");

    // useEffect(()=>{
    //     setShow(props.show)
    // },[])

  //-- 3.수정을 원하는 선택 user 정보 가져오기 --//
  const handleClose = () => {
    props.onClose(props.index)


    // setShow(false);
    // setChangedUserName("");
    // changedUserName.current = '';
  };

  const onChangeName = (e) => {
    e.preventDefault();
    // changedUserName.current = e.target.value;
    setChangedUserName(e.target.value);
    console.log(e.target.value);
  };

  const onChangeRole = (e) => {
    e.preventDefault();
    setChangedUserRole(e.target.value);
  };

  const onChangeFloor = (e) => {
    e.preventDefault();
    setChangedUserFloor(e.target.value);
    // setChangedUserFloorNumber([e.target.value === "ALL" ? 0 : e.target.value]);
  };
  const editUserHanlder = ()=>{

  }


  // 선택된 기수 관련 데이터 가져오는 함수
//   const selectedClassData = (pickedClass) => {
//     fetchGet(
//       `http://${myUrl}/admin/view/user?classes=${pickedClass}`,
//       navigate
//     ).then((data) => {
//       setEachClassUsers(data?.AllUserData);
//     });
//   };

//   const onClickToChange = () => {
//     // console.log(classPickNumber);
//     // console.log(changedUserFloorNumber[0]);
//     // console.log(changedUserRole);
//     // console.log(pickedUserId);
//     // console.log(changedUserName);

//     const postUrl = `http://${myUrl}/admin/update/user`;
//     const object = {
//       classes: classPickNumber,
//       floor: changedUserFloorNumber[0],
//       roles: changedUserRole,
//       userId: pickedUserId,
//       userName: changedUserName,
//     };

//     fetchPostJson(postUrl, object, navigate).then((data) => {
//       //console.log(data.message);
//       alert(data.message);

//       selectedClassData(classPickNumber);
//       handleClose();
//       // window.location.reload(); //alert 버튼 클릭 시, 새로고침해서 데이터 다시 받아옴
//     });
//     // handleClose();
//     // selectedClassData(classPickNumber);
//   };

  return (
    <div>
    <Modal show='true' onHide={handleClose} >
      {/* 모달 창 헤더 */}
      <Modal.Header closeButton>
        <Modal.Title>{pickedUserId}</Modal.Title>
      </Modal.Header>
      {/* 모달창 내 수정사항 */}
      <Form.Group className="mb-1">
        <Modal.Body>
          <Form.Label>이름</Form.Label>
          <Form.Control
            id="inputName"
            // placeholder="변경할 이름을 기입해주세요"
            onChange={(e) => onChangeName(e)}
            // onChange={onChangeName}
            value={changedUserName}
            required
            // ref={c}
          />
          <Form.Label>권한</Form.Label>
          <Form.Select
            id="role"
            onChange={(e) => onChangeRole(e)}
            value={changedUserRole}
            required
          >
            <option>USER</option>
            <option>MANAGER</option>
            <option>ADMIN</option>
          </Form.Select>
          <Form.Label>사용가능 층수</Form.Label>
          <Form.Select
            id="floor"
            onChange={(e) => onChangeFloor(e)}
            value={changedUserFloor}
            required
          >
            <option>2</option>
            <option>3</option>
            <option>ALL</option>
          </Form.Select>
        </Modal.Body>
        {/* 모달 창 아래 닫기 및 수정하기 버튼 */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={editUserHanlder}>
            수정하기
          </Button>
        </Modal.Footer>
      </Form.Group>
    </Modal>
    </div>
  );
};
export default IndividualEditModal
