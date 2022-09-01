import React from 'react'
import UseUrl from './useUrl';

export default function getUser() {
    const url = UseUrl()
    let userName = ""
    let roomType = ""
 
    fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      userName = data.userData.userName;
      roomType = data.roomData.roomType;
    });
   
    const user = {
        name : userName,
        roomType : roomType
    }
  return user
}
