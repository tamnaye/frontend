import SecondFloor from "./secondFloorComponents/SecondFloor";
import ThirdFloor from "./thirdFloorComponents/ThirdFloor";
import styles from "./MainTemplate.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUrl from "../../hooks/useUrl";

const MainTemplate = () => {
  const id = window.localStorage.getItem("userid");
  console.log("mainTemplete : ", id);
  const navigate = useNavigate();

  const myUrl = useUrl();

  const [userClasses, setUserClasses] = useState("");
  const [maxClasses, setMaxClasses] = useState("");

  const url = `http://${myUrl}/api/user/data?userId=${id}`;
  useEffect(() => {
    if (id === null) {
      alert("로그인 후 사용 가능합니다.");
      navigate(`/`);
    } else {
      fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setUserClasses(data.userData.classes);
          setMaxClasses(data.maxClasses);
          window.localStorage.setItem("class", data.userData.classes);
        });
    }
  }, [id, url, navigate]);

  const [ablebtn, setAblebtn] = useState(true); //예약시간이 아닐 때 상태변경(true일 때 버튼 활성화!)

  //21:00-08:30까지 예약 버튼 비활성화 함수
  const Now = new Date(); //현재 날짜 및 시간 -> Tue Aug 23 2022 16:33:51 GMT+0900
  const NowHour = Now.getHours();
  const NowMins = Now.getMinutes();

  function pluszero(times) {
    let time = times.toString(); //시간을 숫자에서 문자로 변환
    if (time.length < 2) {
      time = "0" + time; //숫자 앞에 0을 붙여줌
      return time;
    } else {
      return time;
    }
  }
  const nowHour = pluszero(NowHour);
  const nowMins = pluszero(NowMins);
  const nowTime = nowHour + nowMins;

  const startTime = "0830";
  const endTime = "2000";
  useEffect(() => {
    if (startTime > nowTime || endTime < nowTime) {
      setAblebtn(false);
    } else {
      setAblebtn(true);
    }
  }, []); //useEffect써서 한번만 렌더링 해줌

  return (
    <div>
      {ablebtn ? null : (
        <div>
          예약할 수 없는 시간입니다!오전08:30부터 오후21:00까지 예약이
          가능합니다.
        </div>
      )}
      <div className={styles.floorContainer}>
        {/* classes 활용 */}
        {userClasses === 0 ? (
          [
            <SecondFloor key="3" className={styles.secondFloor} />,
            <ThirdFloor key="2" className={styles.thirdFloor} />,
          ]
        ) : userClasses === maxClasses ? (
          <ThirdFloor key="2" className={styles.thirdFloor} />
        ) : (
          <SecondFloor key="3" className={styles.secondFloor} />
        )}
      </div>
    </div>
  );
};

export default MainTemplate;
