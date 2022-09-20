import styles from './ClassesFloor.module.css';
import Table from 'react-bootstrap/Table';
//hooks
import { useState, useEffect } from 'react';
import useUrl from '../../../hooks/useUrl';
import { fetchGet } from '../../../hooks/fetchUrl';

const ClassesFloor = () => {
  const myUrl = useUrl();
  const [floorChangeData, setFloorChangeData] = useState('');

  const [classOfFloorData, setClassOfFloorData] = useState([]);
  const url = `http://${myUrl}/admin/view/class&floor`;
  useEffect(() => {
    fetchGet(url).then((data) => {
      setClassOfFloorData(data.ClassOfFloorData);
    });
  }, [url]);
  console.log(classOfFloorData);

  //----select box 값 가져오기
  const onChange = (event) => {
    console.log(event.target.value);
    setFloorChangeData(event.target.value);
    console.log(floorChangeData);
  };

  //----수정 버튼 클릭 시 수정한 데이터 post
  const btnClickChange = (changeFloor, index) => {
    console.log(changeFloor, index);
    console.log(changeFloor.classes);
    console.log(changeFloor.floor);

    const newArr = [...classOfFloorData];
    console.log(newArr);

    const postUrl = `http://${myUrl}/admin/change/floor`;
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classes: changeFloor.classes,
        floor: floorChangeData,
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
                    <div className={styles.classe}>{item.classes}</div>
                  </td>
                  <td>
                    <select
                      name='floor'
                      className={styles.select_floor}
                      onChange={onChange}
                    >
                      <option className={styles.option_difault} value='default'>
                        {item.floor}
                      </option>
                      {/* <hr /> */}
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
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
