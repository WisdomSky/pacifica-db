


exports.PO_URL = 'https://pacifica.me/';

exports.base = function (path) {
    return exports.PO_URL + path;
};


exports.extract = function (file, dest) {
    return new Promise((resolve, reject) => {
        require('7zip-min').unpack(file, dest, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        });
    })
};

