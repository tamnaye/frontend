import styles from "./BookingTimeBox.module.css";
import { useRef, useState, useEffect } from "react";

const BookingMember = (props) => {

  const roomTypeArr = ["meeting", "nabax"];

  const memberNames = props.namesData.filter((member) => member !== props.userData.userName);

  useEffect(() => {
    setNamesState(
      props.namesData.filter((member) => member !== props.userData.userName)
    );
  }, [props.namesData] );
  //--------팀원 검색 기능---------//
  const [namesState, setNamesState] = useState([]);
  const [selectedNameState, setSelectedNameState] = useState([]);
  const [inputName, setInputName] = useState("");
  //팀원 리스트 모달창
  const [isShowModal, setIsShowModal] = useState(true);
  //useRef사용해서 outside클릭 시 모달창 사라짐
  const closeModal = useRef();

  function onClickModal() {
    setIsShowModal(true);
  }
  function onClickOutside(event) {
    if (selectedNameState.length > 0) {
      if (closeModal.current && !closeModal.current.contains(event.target)) {
        setIsShowModal(false);
      }
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
  });

  function nameChangeHandler(e) {
    setIsShowModal(true);
    setInputName(e.target.value);
    const str = e.target.value;
    let arr = [...memberNames];
    arr = arr.filter((member) => !selectedNameState.includes(member));
    if (arr.filter((member) => member.includes(str)).length > 0) {
      arr = arr.filter((member) => member.includes(str));
    }
    setNamesState(arr);
  }
  function addNameHandler(name) {
    setInputName("");
    setIsShowModal(false);
    // setSearchedNameState([]);

    const arr = [...selectedNameState];
    arr.push(name);

    setSelectedNameState(arr);
    props.onSelectNames(arr)
    setNamesState(memberNames.filter((member) => !arr.includes(member)));

  }
  function removeNameHandler(index) {
    const arr = [...selectedNameState];
    const arr2 = [...namesState];
    arr2.push(arr[index]);
    arr2.sort();
    arr.splice(index, 1);
    
    props.onSelectNames(arr)
    setSelectedNameState(arr);
    
    setNamesState(arr2);
    
  }
  //팀원 검색 enter event
  function onSubmit(e) {
    e.preventDefault();
    setIsShowModal(false);
    if (namesState.length === 1) {
      //이미 선택할 팀원이 나옴
      setInputName("");
      // setSearchedNameState([]);

      const arr = [...selectedNameState];
      arr.push(namesState[0]);
      setSelectedNameState(arr);
      setNamesState(
        memberNames.filter((member) => !arr.includes(member))
      );
    } else if (namesState.length > 1) {
      //검색 결과 두명 이상 나왔을 때 엔터친 경우
      alert("팀원을 한명씩 선택해 주세요 !");
    } else {
      //검색 안되는 이름 치고 엔터친 경우
      setInputName("");
      // setSearchedNameState([]);
      alert("팀원의 이름을 확인해주세요!");
    }
  }

  return (
    <div
      ref={closeModal} //div영역을 벗어나 클릭하면 모달창 사라짐
      className={
        props.roomType === roomTypeArr[0]
          ? [styles.meetingInfoBox]
          : [styles.naboxInfoBox]
      }
    >
      <p>
        신청자명
        <input
          style={{ fontWeight: "bold" }}
          className={styles.input}
          type="text"
          name="val"
          placeholder={props.userData.userName}
          disabled
        />
      </p>
      {/* 팀원 검색 input */}
      {props.roomType === roomTypeArr[0] ? (
        <div>
          <form onSubmit={onSubmit}>
            <p>
              팀원선택
              <input
                className={styles.input}
                onChange={nameChangeHandler}
                value={inputName}
                type="text"
                placeholder="팀원을 검색하세요"
                onClick={onClickModal}
              />
            </p>
          </form>
          {isShowModal === true ? (
            <div className={styles.meetingInputList}>
              {namesState.map((item, index) => (
                <button
                  onClick={() => addNameHandler(item)}
                  key={index}
                  className={styles.membersName}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
          <div className={styles.membersBox}>
            {selectedNameState.map((item, index) => (
              <button
                className={styles.selectMembers}
                onClick={() => removeNameHandler(index)}
                key={index}
              >
                {`${item} X`}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookingMember;
