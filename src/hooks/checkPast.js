
export default function checkPast(time) {
    const now = new Date()
    const nowH = now.getHours();
    const timeH = Number(time.substring(0, 2));
    return timeH <= nowH ? true : false; //릴리즈용
    // return false; //개발용
}
