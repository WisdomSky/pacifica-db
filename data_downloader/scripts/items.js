const fs = require('fs-extra');
const download = require('download');
const { base, extract } =  require('../utils');
const Reader = require('n-readlines');
const CSV = require('comma-separated-values');

const config = require('../config');


exports.fetch = function () {
    console.log('Downloading items...');
    return new Promise(async(resolve) => {
        if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
        fs.writeFileSync(config.tmp + '/items.gz', await download(base('play/itemdesc')));
        await extract(config.tmp + '/items.gz', config.tmp + '/extracted');

        let classes = ['Swordsman', 'Waif', 'Archer', 'Deacon', 'Knight', 'Bandit', 'Ranger', 'Cleric'];
        let reader = new Reader(config.tmp + '/extracted/items');
        let line;

        let items = [];
        while (line = reader.next()) {
            let row = CSV.parse(line.toString())[0];
            items.push({
                           name: row[0],
                           type: row[1],
                           lvlreq: row[2],
                           price: row[3],
                           weight: row[4],
                           unknownCol: row[5],
                           unknownCol2: row[6],
                           classreq: classes[row[7]],
                           stats: row[8],
                           nt: row[9],
                           desc: row[10]
                       });


        }
        resolve(items);
    })
};