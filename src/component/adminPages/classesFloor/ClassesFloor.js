import styles from './ClassesFloor.module.css';
import Table from 'react-bootstrap/Table';
//hooks
import { useState, useEffect } from 'react';
import useUrl from '../../../hooks/useUrl';
import { fetchGet, fetchPostJson } from '../../../hooks/fetchUrl';
import { useNavigate } from 'react-router-dom';

const ClassesFloor = () => {
  const navigate = useNavigate();
  const myUrl = useUrl();

  //const floorSelection = [0, 2, 3]; //select-option 층수 배열로 만들어 준 후 map으로 돌림 <- back에서 데이터 받아오기로!
  const [floorData, setFloorData] = useState([]); //[0, 2, 3]
  const [classOfFloorData, setClassOfFloorData] = useState([]); //classes, floor

  const [floor, setFloor] = useState([]);
  const [newFloor, setNewFloor] = useState([]);
  //console.log("floor 원본:", floor);
  //console.log("newFloor 복제:", newFloor);

  const url = `http://${myUrl}/admin/view/class&floor`;
  useEffect(() => {
    fetchGet(url).then((data) => {
      setFloorData(data.floorData);
      setClassOfFloorData(data.ClassOfFloorData);

      const newArr = [];
      data.ClassOfFloorData.map((item) => {
        return newArr.push(item.floor);
      });
      //console.log("floorsNewArr:", newArr);
      setFloor(newArr);
      setNewFloor(newArr);
    });
  }, [url]);
  //console.log("floor GET:", floor)
  //console.log("newFloor POST:", newFloor)

  //----select box 값 가져오기
  const onChange = (event, index) => {
    const newArr = [...newFloor];
    newArr[index] = Number(event.target.value);
    //console.log('floorsInputNewArr:', newArr, typeof newArr[index]);
    setNewFloor(newArr);
  };

  //----수정 버튼 클릭 시 수정한 데이터 post
  //console.log(`비교: ${floor} = ${newFloor}`);
  const btnClickChange = (changeFloor, index) => {
    //console.log('btnClickChange classOfFloorData : ', classOfFloorData[index]);
    //console.log('btnClickChange newFloor : ', newFloor[index]);
    const postUrl = `http://${myUrl}/admin/change/floor`;
    if (floor[index] === newFloor[index]) {
      alert('수정사항이 없습니다.');
    } else {
      const object = {
        classes: changeFloor.classes,
        floor: newFloor[index],
      };
      fetchPostJson(postUrl, object, navigate).then((data) => {
        const arr = [...floor]; //방법1. 전체 새로고침 없이 변경한 상태의 값만 바로 화면에 띄우기 위해
        arr[index] = Number(newFloor[index]);
        setFloor(arr);
        //console.log(floor);
        alert(data.message);
        //방법2. window.location.reload(); //alert 버튼 클릭 시, 새로고침해서 데이터 다시 받아옴
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <h3 className={styles.title}>기수별 층수관리</h3>
        <hr className={styles.line} />
        <div className={styles.file}>
          기수로 구분하여 각각 층수를 수정할 수 있습니다.
        </div>
        <div className={styles.table_box}>
          <Table responsive>
            <thead>
              <tr className={styles.tableTrTitle}>
                <th className={styles.tableTh} scope='col'>
                  기수
                </th>
                <th className={styles.tableTh} scope='col'>
                  층수
                </th>
                <th className={styles.tableTh} scope='col'>
                  수정버튼
                </th>
              </tr>
            </thead>
            <tbody>
              {classOfFloorData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.classe}>{item.classes}기</div>
                  </td>
                  <td>
                    <select
                      name='floor'
                      className={styles.select_floor}
                      onChange={(event) => onChange(event, index)}
                    >
                      <option
                        className={styles.option_difault}
                        value={item.floor}
                      >
                        {item.floor === 0 ? 'ALL' : item.floor}
                      </option>
                      <optgroup label='--'></optgroup>
                      {floorData.map((floor, index) =>
                        floor === item.floor ? null : (
                          <option key={index} value={floor}>
                            {floor === 0 ? 'ALL' : floor}
                          </option>
                        )
                      )}
                      {/* <option value='0'>ALL</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option> */}
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

export default ClassesFloor;
