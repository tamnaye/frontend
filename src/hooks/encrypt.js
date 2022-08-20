import CryptoJS from "crypto-js";

export default function encrypt(pwd) {
    const secretKey = "2yjEnv5T1e2wYI2Ldhpz96lXpYjcPlh2"
    const iv = "0000000000000000"
    const cipher = CryptoJS.AES.encrypt(pwd, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Hex.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }); 

  return cipher.toString();
}
