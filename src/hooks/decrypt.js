import cryptoJs from 'crypto-js'
export default function decrypt(encryptedText) {
    const secretKey =process.env.REACT_APP_SECRET_KEY
    const iv = process.env.REACT_APP_IV
    const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(secretKey), {
        iv: cryptoJs.enc.Hex.parse(iv),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    })

    return decipher.toString(cryptoJs.enc.Utf8);
}
