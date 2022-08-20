import { useEffect, useState } from 'react';


export default function useFetch(url) { 
    const [data, setData] = useState([])
    useEffect(()=>{ //1. 랜더링 후 호출, 상태 변화에 따라 호출, 컴포넌트가 죽기 전 
        fetch(url) // 비동기 
        .then(res=> res.json())
        .then(data => {
            setData(data)})
      },[url])
      return data;
}
