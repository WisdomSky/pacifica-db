const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('../utils');

const config = require('../config');

exports.fetch = function () {
    console.log('Downloading GFXs...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.dest)) fs.mkdirSync(config.dest);
        if (!fs.existsSync(config.dest + '/gfx')) fs.mkdirSync(config.dest + '/gfx');
        for (let i=1;i<=18;i++) {
            try {
                fs.writeFileSync(`${config.dest}/gfx/${i}.png`, await download(base(`play/gfx/${i}`)));
            } catch (e) {
                console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/gfx/${i}`)
            }
        }
        resolve();
    })
};