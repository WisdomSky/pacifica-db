const fs = require('fs-extra');
const download = require('download');
const { base, extract } =  require('../utils');
const Reader = require('n-readlines');
const CSV = require('comma-separated-values');

const config = require('../config');


exports.fetch = function () {
    console.log('Downloading skills...');
    return new Promise(async(resolve, reject) => {
        if (!fs.existsSync(config.tmp)) fs.mkdirSync(config.tmp);
        fs.writeFileSync(config.tmp +'/skills.gz', await download(base('play/skills')));
        await extract(config.tmp +'/skills.gz', config.tmp +'/extracted');

        let reader = new Reader(config.tmp +'/extracted/skills');

        let classes = ['Swordsman', 'Waif', 'Archer', 'Deacon', 'Knight', 'Bandit', 'Ranger', 'Cleric'];


        let skill_types = {
            s: 'Splash Attack',
            a: 'Single Attack',
            t: 'Splash target',
            p: 'Passive',
            b: 'Buff',
            c: 'Party Buff',
            i: 'Self Buff'
        };
        let skills = [];
        let line;

        while (line = reader.next()) {
            let row = CSV.parse(line.toString())[0];
            skills.push({
                            name: row[0],
                            type: skill_types[row[1]],
                            points: row[2],
                            formula: row[3],
                            required: row[4],
                            maxlvl: row[5],
                            secondclass: row[6],
                            classreq: row[7],
                            classreqlvl: classes[row[7] + (row[6] ? 4: 0)],
                            desc: row[8]
                        });


        }
        resolve(skills);
    })
};