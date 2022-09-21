export default function checkPast(time) {
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
