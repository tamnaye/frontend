import CryptoJS from "crypto-js";
  
import { isAdmin, removeToken } from "./authModule";
import { fetchGet } from "./fetchUrl";

export function doLogout(navigate, url) {
  fetchGet(url, navigate)
  .then(
    (data) => {
      console.log("logout data : ", data);
      if (data.message === "success") {
        removeToken();
        isAdmin() ? navigate("/admin") : navigate('/')
      }else{
        alert("로그아웃 실패 : 관리자에게 문의하세요")
      }
    }
  );
}

export function decrypt(encryptedText) {
    const secretKey =process.env.REACT_APP_SECRET_KEY
    const iv = process.env.REACT_APP_IV
    const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Hex.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })

    return decipher.toString(CryptoJS.enc.Utf8);
}

export function encrypt(pwd) {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    const iv = process.env.REACT_APP_IV;
    const cipher = CryptoJS.AES.encrypt(pwd, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: CryptoJS.enc.Hex.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
  
    return cipher.toString();
  }


