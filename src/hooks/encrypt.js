import CryptoJS from "crypto-js";

export default function encrypt(pwd) {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const iv = process.env.REACT_APP_IV;
  const cipher = CryptoJS.AES.encrypt(pwd, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: CryptoJS.enc.Hex.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return cipher.toString();
}
