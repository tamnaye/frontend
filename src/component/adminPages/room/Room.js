import styles from "./Room.module.css";
import Table from "react-bootstrap/Table";
//hooks
import { useState, useEffect } from "react";
import useUrl from "../../../hooks/useUrl";
import { fetchGet, fetchPostJson } from "../../../hooks/fetchUrl";
import { Navigate, useNavigate } from "react-router-dom";

const Room = () => {
  const hourSelection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [maxHour, setMaxHour] = useState("");
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  const defaultFloor = 2;

  const myUrl = useUrl();
  const url = `http://${myUrl}/admin/view/room?floor=${defaultFloor}`;
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      console.log("room useeffect data : ", data);

      setRoomData(data?.RoomData);
    });
  }, [url]);

  function getRooms(floor) {
    const url = `http://${myUrl}/admin/view/room?floor=${floor}`;
    fetchGet(url, navigate).then((data) => {
      setRoomData(data.RoomData);
    });
  }
  function updateMaxHour(roomid, index) {
    const url = `http://${myUrl}/admin/change/maxtime`;
    const object = {
      roomId: roomid,
      maxTime: maxHour,
    };
    fetchPostJson(url, object, navigate).then((data) => {
      alert(
        `${
          roomData[index].roomType === "meeting"
            ? roomData[index].roomName + "(회의실)"
            : roomData[index].roomName
        }의 최대 이용시간이 수정되었습니다.`
      );
    });
  }

  //----select box 값 가져오기
  const onChangeFloor = (event) => {
    console.log("target value", event.target.value);
    getRooms(event.target.value);
  };
  const onChangeMaxHour = (event) => {
    console.log("target value", event.target.value);
    setMaxHour(event.target.value);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <h3 className={styles.title}>회이실 데이터 관리</h3>
        <hr className={styles.line} />
        <div className={styles.file}>회의실 데이터를 수정할 수 있습니다.</div>
        <div className={styles.table_box}>
          <Table responsive>
            <thead>
              <tr>
                <th>층수</th>
                <td>
                  <select
                    name="floor"
                    className={styles.select_floor}
                    onChange={onChangeFloor}
                  >
                    <option value={defaultFloor}>{defaultFloor}</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </td>
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
                      <option
                        className={styles.option_difault}
                        value={item.maxTime}
                      >
                        {item.maxTime}
                      </option>
                      {hourSelection.map((hour, index) =>
                        hour === item.maxTime ? null : (
                          <option key={index} value={hour}>
                            {hour}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.btn}
                      onClick={() => updateMaxHour(item.roomId, index)}
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
