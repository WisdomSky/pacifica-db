const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('../utils');

const config = require('../config');

exports.fetch = function () {
    console.log('Downloading BGMs...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.dest)) fs.mkdirSync(config.dest);
        if (!fs.existsSync(config.dest + '/music')) fs.mkdirSync(config.dest + '/music');
        for (let i=0;i<=69;i++) {
            try {
                fs.writeFileSync(`${config.dest}/music/${i}.mp4`, await download(base(`play/bgm/${i}`)));
            } catch (e) {
                console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/bgm/${i}`)
            }
        }
        resolve();
    })
};