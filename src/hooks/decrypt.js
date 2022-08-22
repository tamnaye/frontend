import cryptoJs from 'crypto-js'
export default function decrypt(encryptedText) {
    const secretKey = "2yjEnv5T1e2wYI2Ldhpz96lXpYjcPlh2"
    const iv = "0000000000000000"
    const decipher = cryptoJs.AES.decrypt(encryptedText, cryptoJs.enc.Utf8.parse(secretKey), {
        iv: cryptoJs.enc.Hex.parse(iv),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    })

    return decipher.toString(cryptoJs.enc.Utf8);
}
