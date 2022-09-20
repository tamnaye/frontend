import styles from "./Room.module.css";
import Table from "react-bootstrap/Table";
//hooks
import { useState, useEffect } from "react";
import useUrl from "../../../hooks/useUrl";
import { fetchGet } from "../../../hooks/fetchUrl";
import { Navigate, useNavigate } from "react-router-dom";

const Room = () => {
  const [maxHour, setMaxHour] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomData, setRoomData] = useState([]);
  console.log("roomData : ",roomData);
  const navgiate = useNavigate()

  const myUrl = useUrl();
  const url = `http://${myUrl}/admin/view/room?floor=2`;
  useEffect(() => {
    fetchGet(url,navgiate).then((data) => {
      setRoomData(data?.RoomData);
    });
  }, [url]);

  function getRooms(floor) {
    const url = `http://${myUrl}/admin/view/room?floor=${floor}`;
    fetchGet(url,navgiate).then((data) => {
      setRoomData(data.RoomData);
    });
  }
  function updateMaxHour(hour) {
    setMaxHour(hour);
  }
  function updateName(newName) {
    setRoomName(newName);
  }
  //----select box 값 가져오기
  const onChangeFloor = (event) => {
    console.log("target value", event.target.value);
    getRooms(event.target.value);
  };
  const onChangeMaxHour = (event) => {
    console.log("target value", event.target.value);
  };

  //----수정 버튼 클릭 시 수정한 데이터 post
  const btnClickChange = (changeFloor, index) => {
    const newArr = [...roomData];
    console.log(newArr);

    const postUrl = `http://${myUrl}/admin/change/floor`;
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classes: changeFloor.classes,
        floor: maxHour,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <h3 className={styles.title}>회이실 데이터 관리</h3>
        <hr className={styles.line} />
        <div className={styles.file}>회의실 데이터를 수정할 수 있습니다.</div>
        <div className={styles.file}>층수</div>
        <div className={styles.table_box}>
          <Table responsive>
            <thead>
              <tr>
                <td>층수</td>
                <select
                  name="floor"
                  //   className={styles.select_floor}
                  onChange={onChangeFloor}
                >
                  <option className={styles.option_difault} value="default">
                    2
                  </option>
                  {/* <hr /> */}
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </tr>
            </thead>
            <thead>
              <tr className={styles.tableTrTitle}>
                <th className={styles.tableTh} scope="col">
                  회의실이름
                </th>
                <th className={styles.tableTh} scope="col">
                  최대이용시간
                </th>
                <th className={styles.tableTh} scope="col">
                  수정버튼
                </th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div>{item.roomName}</div>
                  </td>
                  <td>
                    <select
                      name="maxHour"
                      className={styles.select_floor}
                      onChange={onChangeMaxHour}
                    >
                      <option className={styles.option_difault} value="default">
                        {item.maxTime}
                      </option>
                      {/* <hr /> */}
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.btn}
                      onClick={() => btnClickChange(item, index)}
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Room;
