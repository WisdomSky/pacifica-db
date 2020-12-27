const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base } =  require('./utils');
const config = require('./config');


(async () => {


    if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
    let ln = [];
    if (!fs.existsSync(config.tmp + '/items')) fs.mkdirSync(config.tmp + '/items');
    for (let i=0;i<=20000;i++) {
        try {
            fs.writeFileSync(`${config.tmp}/items/${i}.png`, await download(base(`play/item/i/${i}`)));
            ln.push(i);
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/item/i/${i}`)
        }
    }

    fs.writeJsonSync(config.dest + '/items.files.scan.json', ln, { spaces: 4});

    console.log('\x1b[32m%s\x1b[0m', 'Done.');
})();



