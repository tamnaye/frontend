import styles from "./Room.module.css";
import Table from "react-bootstrap/Table";
//hooks
import { useState, useEffect } from "react";
import useUrl from "../../../hooks/useUrl";
import { fetchGet, fetchPostJson } from "../../../hooks/fetchUrl";
import { Navigate, useNavigate } from "react-router-dom";

const Room = () => {
  const hourSelection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const roomTypeSelection = ["meeting", "nabox", "studio", "official"];
  const [maxHour, setMaxHour] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [newMaxHour, setNewMaxHour] = useState([]);
  const [newRoomType, setNewRoomType] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  const defaultFloor = 2;
  console.log("maxHour : ",maxHour)
  console.log("newMaxHour : ",newMaxHour)
  console.log("roomType : ",roomType)
  console.log("newRoomType : ",newRoomType)
  const myUrl = useUrl();
  const url = `http://${myUrl}/admin/view/room?floor=${defaultFloor}`;
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      console.log("room useeffect data : ", data.RoomData);
      setRoomData(data?.RoomData);
      const arr1 = [];
      const arr2 = [];
      data?.RoomData.map((item) => {
        arr1.push(item.maxTime);
        arr2.push(item.roomType);
      });
      setMaxHour(arr1);
      setNewMaxHour(arr1);
      setRoomType(arr2);
      setNewRoomType(arr2);
    });
  }, [url]);

  function getRooms(floor) {
    const url = `http://${myUrl}/admin/view/room?floor=${floor}`;
    fetchGet(url, navigate).then((data) => {
      console.log("room getRooms data : ", data?.RoomData);
      setRoomData(data?.RoomData);
      const arr1 = [];
      const arr2 = [];
      data?.RoomData.map((item) => {
        arr1.push(item.maxTime);
        arr2.push(item.roomType);
      });
      setMaxHour(arr1);
      setNewMaxHour(arr1);
      setRoomType(arr2);
      setNewRoomType(arr2);
    });
  }

  const onChangeFloor = (event) => {
    getRooms(event.target.value);
  };
  const onChangeMaxHour = (event, index) => {
    const arr = [...newMaxHour];
    arr[index] = Number(event.target.value);
    setNewMaxHour(arr);
  };
  const onChangeRoomType = (event, index) => {
    const arr = [...newRoomType];
    arr[index] = event.target.value;
    setNewRoomType(arr);
  };

  function updateRoomData(roomid, index) {
    const url = `http://${myUrl}/admin/update/room-data`;

    if (
      newMaxHour[index] === maxHour[index] &&
      newRoomType[index] === roomType[index]
    ) {
      alert("수정사항이 없습니다.");
    } else {
      const object = {
        roomId: roomid,
        maxTime: newMaxHour[index],
        roomType: newRoomType[index],
      };
      fetchPostJson(url, object, navigate).then((data) => {
          const arr = [...maxHour]
          const arr2 = [...roomType]
          arr[index] = Number(newMaxHour[index])
          arr2[index] = newRoomType[index]
          setMaxHour(arr)
          setRoomType(arr2)
          alert(data?.message)
      });
    }
  }

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
                    {/* <option value="4">4</option> */}
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
                  타입
                </th>
                <th className={styles.tableTh} scope="col">
                  수정버튼
                </th>
              </tr>
            </thead>
            <tbody>
              {roomData?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div>{item.roomName}</div>
                  </td>
                  <td>
                    <select
                      name="maxHour"
                      className={styles.select_floor}
                      // onChange={onChangeMaxHour}
                      onChange={(e) => onChangeMaxHour(e, index)}
                    >
                      <option value={item.maxTime}>{item.maxTime}</option>
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
                    <select
                      name="roomType"
                      className={styles.select_type}
                      onChange={(e)=>onChangeRoomType(e,index)}
                    >
                      <option value={item.roomType}>{item.roomType}</option>
                      {roomTypeSelection.map((type, index) =>
                        type === item.roomType ? null : (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.btn}
                      onClick={() => updateRoomData(item.roomId, index)}
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
