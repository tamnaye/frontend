export default function useUrl() {
  const url = process.env.REACT_APP_BACK_URL_TEST;
  // const url = process.env.REACT_APP_BACK_Dev_URL;

  return url;
}
