const fs =require('fs');


exports.PO_URL = 'https://pacifica.me/';

exports.base = function (path) {
    return exports.PO_URL + path;
};


exports.extract = function (file, dest) {
    return new Promise((resolve, reject) => {

        if (!fs.existsSync(dest)) fs.mkdirSync(dest);

        require('7zip-min').unpack(file, dest, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        });
    })
};



exports.objectFlip = function(obj) {
    const ret = {};
    Object.keys(obj).forEach(key => {
        ret[obj[key]] = key;
    });
    return ret;
}
