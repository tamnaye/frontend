export default function useUrl() {

  const url = process.env.REACT_APP_BACK_URL;
  // const url = process.env.REACT_APP_BACK_Dev_URL;
  // const url = "192.168.5.92:8080"

  return url;
}
