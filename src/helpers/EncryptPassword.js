import CryptoJs from 'crypto-js';

const secretKey = `Star*Wars*SWAPI*-Test/${Date.now()}`

export const encrypt = (key) => {
    localStorage.setItem('password', CryptoJs.AES.encrypt(key, secretKey));
}