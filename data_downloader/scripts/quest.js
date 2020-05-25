const fs = require('fs-extra');
const download = require('download');
const { base, extract } =  require('../utils');
const Reader = require('n-readlines');
const CSV = require('comma-separated-values');

const config = require('../config');

exports.fetch = function () {
    console.log('Downloading quests...');
    return new Promise(async(resolve, reject) => {
        if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
        fs.writeFileSync(config.tmp +'/quests.gz', await download(base('play/quests')));
        await extract(config.tmp +'/quests.gz', config.tmp +'/extracted');

        let reader = new Reader(config.tmp +'/extracted/quests');
        let line;
        let quests = [];

        while (line = reader.next()) {
            let row = CSV.parse(line.toString())[0];

            quests.push({
                            name: row[0],
                            npc: row[1],
                            lvlreq: row[2],
                            unknownCol: row[3],
                            hint: row[4],
                            objective: row[5]
                        })

        }
        resolve(quests)
    })
};