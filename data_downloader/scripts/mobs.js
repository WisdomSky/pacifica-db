const fs = require('fs-extra');
const download = require('download');
const { base, extract } =  require('../utils');
const Reader = require('n-readlines');
const CSV = require('comma-separated-values');

const config = require('../config');

exports.fetch = function () {
    console.log('Downloading mobs...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
        fs.writeFileSync(config.tmp +'/mobs.gz', await download(base('play/mobs')));
        await extract(config.tmp + '/mobs.gz', config.tmp + '/extracted');

        let reader = new Reader(config.tmp +'/extracted/mobs');
        let line;
        let mobs = [];

        while (line = reader.next()) {
            let row = CSV.parse(line.toString())[0];
            mobs.push({
                          name: row[0],
                          unknownCol: row[1],
                          undead: row[2]
                      });
        }
        resolve(mobs)
    })
};