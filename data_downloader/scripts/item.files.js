const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('../utils');

const config = require('../config');


exports.fetch = function () {
    console.log('Downloading items files and ids...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.dest)) fs.mkdirSync(config.dest);
        let ln = [];
        if (!fs.existsSync(config.dest + '/items')) fs.mkdirSync(config.dest + '/items');
        for (let i=1;i<=894;i++) {
            try {
                fs.writeFileSync(`${config.dest}/items/${i}.png`, await download(base(`play/item/i/${i}`)));
                ln.push(i);
            } catch (e) {
                console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/item/i/${i}`)
            }
        }

        resolve(ln);
    })
};