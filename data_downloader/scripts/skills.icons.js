const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('../utils');

const config = require('../config');

exports.fetch = function () {
    console.log('Downloading Skill icons...');
    return new Promise(async(resolve, reject) => {
        if (!fs.existsSync(config.dest)) fs.mkdirSync(config.dest);
        if (!fs.existsSync(config.dest + '/skills')) fs.mkdirSync(config.dest + '/skills');
        for (let i=0;i<=3;i++) {
            try {
                fs.writeFileSync(`${config.dest}/skills/${i}.png`, await download(base(`play/skill/${i}`)));
            } catch (e) {
                console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/skill/${i}`)
            }
        }
        resolve();
    })
};