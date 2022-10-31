
export function getStartEndTime(checkedState) {
    function getCheckedIndex(checkedState) {
      var arr = [];
      var index = checkedState.indexOf(true);
      while (index !== -1) {
        arr.push(index);
        index = checkedState.indexOf(true, index + 1);
      }
      return arr;
    }
    const object = {
      startTime: times()[getCheckedIndex(checkedState)[0]],
      timeLength: getCheckedIndex(checkedState).length,
    };
    return object;
  }

  export function getTimes(startTime, endTime) {
    const arr = [];
    const start = startTime.substring(0, 2);
    const end = endTime.substring(0, 2);
    const startInt = Number(start);
    const endInt = Number(end);
    for (let i = startInt; i < endInt; i++) {
      const timestr = String(i);
      let changedTime = '';
      if (timestr.length < 2) {
        changedTime = '0' + timestr + ':00';
      } else {
        changedTime = timestr + ':00';
      }
      arr.push(changedTime);
    }
    return arr; // 09:00, 13:00, etc
  }

  export function times() {
    const times = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
    ];
    return times;
  }
  export function checkPast(time) {
    const now = new Date()
    const nowH = now.getHours()
    const min = now.getMinutes()
    const timeH = Number(time.substring(0, 2))
  
    if(nowH <8){
      return true 
    }else if (nowH===8 && min<30){
      return true
    }else{
      return nowH > timeH  ? true : false; //릴리즈용
    }
      // return false //개발용
   
  }


export function timePlusMinus(givenTime, int) {
  const str = givenTime.substring(0, 2);
  const time = Number(str) + int;
  const timestr = String(time);
  let changedTime = '';
  if (timestr.length < 2) {
    changedTime = '0' + timestr + ':00';
    return changedTime;
  } else {
    changedTime = timestr + ':00';
    return changedTime;
  }
}
