const fs = require('fs-extra');
const download = require('download');
const { base } =  require('../utils');
const config = require('../config');


exports.fetch = function () {
    console.log('Downloading mapped items info...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
        fs.writeFileSync(config.tmp +'/daemonMaskDB.js', await download(base('play/daemonMaskDB.js')));
        require(config.tmp + '/daemonMaskDB.js');

        let itemIds = daemonInfo.reduce((obj, val) => {

            obj[val.id] = val.name;

            return obj;
        }, {});
        resolve(itemIds);
    })
};