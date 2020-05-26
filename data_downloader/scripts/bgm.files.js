const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('../utils');
const Reader = require('n-readlines');


const config = require('../config');

exports.fetch = function () {
    console.log('Downloading BGMs...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.dest)) fs.mkdirSync(config.dest);
        if (!fs.existsSync(config.dest + '/music')) fs.mkdirSync(config.dest + '/music');



        let reader = new Reader(require('path').resolve('./data/bgm.txt'));
        let line;

        let bgms = {};
        while (line = reader.next()) {
            let [id, name] = line.toString().replace(/^<a.*\/(\d+)\.mp4.*>(.*)<\/a>.*$/i,'$1|$2').split('|');

            bgms[id] = name;
        }

        for (let i=0;i<=69;i++) {
            try {
                let filename = bgms[i]|| i;
                fs.writeFileSync(`${config.dest}/music/${filename}.mp4`, await download(base(`play/bgm/${i}`)));
            } catch (e) {
                console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/bgm/${i}`)
            }
        }
        resolve();
    })
};