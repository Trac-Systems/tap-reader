//pwd has to be 32 chars long
//iv is optional, but when included should be 16 chars long

var crypto = require('crypto');
var CIPHER = 'aes-256-cbc';

function encrypt(string, pwd, iv) {
    iv = iv ||'axxhcgAAAAAAAAAA'; 
    var cipher, encrypted, error;
    try {
        cipher = crypto.createCipheriv(CIPHER, pwd, iv);
        encrypted = cipher.update(string, 'utf8', 'hex');
        encrypted+= cipher.final('hex');
    } catch(e) {
        error =e;
        console.log(e);
    }
    return { encrypted: encrypted, e: error };
    return encrypted;
}
 
function decrypt(string, pwd, iv) {
    iv = iv ||'axxhcgAAAAAAAAAA'; 
    var decipher, decrypted, error;
    try {
        decipher = crypto.createDecipheriv(CIPHER, pwd, iv);
        decrypted = decipher.update(string, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
    } catch(e) {
        error =e;
        console.log(e);
    }
    return { decrypted: decrypted, e: error };
}

// function createPwd() {
//     return crypto.createHash('sha256').update('Nixnogen').digest();
// }

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
};

// var pwd = '12345678';
// pwd += pwd;
// pwd += pwd;
// console.log(pwd, pwd.length);
// var iv = '12345678';
// iv += iv;
// console.log(iv, iv.length);
// var e = encrypt('bla', pwd, iv);
// console.log(e);
// console.log(decrypt(e.encrypted, pwd, iv));

