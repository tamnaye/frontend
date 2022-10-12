
export default function timePlusMinus(givenTime, int) {
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
