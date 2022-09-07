export default function getTimes(startTime, endTime) {
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
  console.log('get Time arr', arr);
  return arr;
}
