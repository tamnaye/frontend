import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
//styles
import styles from './RoomInfo.module.css'
//component
import logo from './img/logo.png'
import geomun from './img/geomun.jpeg'
import darrenche from './img/darrenche.jpeg'
import yongnuni from './img/yongnuni.jpeg'
import darabi from './img/darabi.jpeg'
import nabox from './img/nabox.jpeg'
import UseUrl from '../../hooks/UseUrl'

function RoomInfo() {
  const { roomId } = useParams() //App.js 동적 라우팅을 넘겨받은 데이터 변수 지정하기!
  const myUrl = UseUrl()

  const [roomData, setRoomData] = useState([])
  const [roomInfo, setRoomInfo] = useState('')
  const url = `http://${myUrl}/api/booking?floor=0&roomId=${roomId}`
  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setRoomData(data.roomData)
        setRoomInfo(
          data.roomData.filter((info) => info.roomId === Number(roomId))[0]
            .roomName
        )
      })
  }, [roomId, url])
  //console.log(roomData);
  //console.log(roomInfo);

  //로컬 자체에 room 이미지 저장해서 서버에서 받아온 roomId와 동일할 떄 원하는 이미지 불러오기
  const roomsImg = [
    {
      room_id: 201,
      img: logo,
    },
    {
      room_id: 202,
      img: logo,
    },
    {
      room_id: 203,
      img: logo,
    },
    {
      room_id: 204,
      img: logo,
    },
    {
      room_id: 205,
      img: logo,
    },
    {
      room_id: 206,
      img: logo,
    },
    {
      room_id: 207,
      img: logo,
    },
    {
      room_id: 208,
      img: logo,
    },
    {
      room_id: 209,
      img: logo,
    },
    {
      room_id: 210,
      img: logo,
    },
    {
      room_id: 211,
      img: logo,
    },
    {
      room_id: 212,
      img: nabox,
    },
    {
      room_id: 213,
      img: nabox,
    },
    {
      room_id: 214,
      img: nabox,
    },
    {
      room_id: 215,
      img: nabox,
    },
    {
      room_id: 216,
      img: nabox,
    },
    {
      room_id: 217,
      img: nabox,
    },
    {
      room_id: 301,
      img: darrenche,
    },
    {
      room_id: 302,
      img: yongnuni,
    },
    {
      room_id: 303,
      img: darabi,
    },
    {
      room_id: 304,
      img: geomun,
    },
    {
      room_id: 305,
      img: nabox,
    },
    {
      room_id: 306,
      img: nabox,
    },
    {
      room_id: 307,
      img: nabox,
    },
  ]
  const [roomImg] = roomsImg.filter((img) => img.room_id === Number(roomId))

  return (
    <div className={styles.wrap}>
      <h3 className={styles.roomName}> {roomInfo} 공간</h3>
      <img className={styles.room_img} alt="room_img" src={roomImg.img}></img>
      <div>
        <h6 className={styles.note}> 공간 사용 안내 </h6>
        <div className={styles.contents}>
          <p>- 모든 공간은 당일 예약만 가능</p>
          <p>- 최대 사용 가능 시간 : 2층-3시간 / 3층-2시간</p>
          <p>- 회의실은 1인 사용 및 예약 불가 </p>
          <p>- NaBox는 1인만 사용 가능 </p>
          <p>- 사용 후 기재 정리 및 모든 전원 OFF</p>
        </div>
      </div>
    </div>
  )
}
export default RoomInfo
