const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('../utils');

const config = require('../config');

exports.fetch = function () {
    console.log('Downloading Misc...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.dest)) fs.mkdirSync(config.dest);
        if (!fs.existsSync(config.dest + '/misc')) fs.mkdirSync(config.dest + '/misc');
        try {
            fs.writeFileSync(`${config.dest}/misc/paper.png`, await download(base(`play/ui/Paper`)));
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/ui/Paper`)
        }
        resolve();
    })
};