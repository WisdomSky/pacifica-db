const fs = require('fs-extra');
const download = require('download');
const { PO_URL, base, extract } =  require('./utils');
const Reader = require('n-readlines');
const CSV = require('comma-separated-values');
const rimraf = require('rimraf');


const dest = "../data/";


(async () => {


    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');

    let reader;
    let line;

    // quests
    console.log('Downloading quests...');
    fs.writeFileSync('tmp/quests.gz', await download(base('play/quests')));
    await extract('tmp/quests.gz', 'tmp/extracted');

    reader = new Reader('./tmp/extracted/quests');

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
    fs.writeJsonSync(dest + 'quests.json', quests, { spaces: 4});




    // skills
    console.log('Downloading skills...');
    fs.writeFileSync('tmp/skills.gz', await download(base('play/skills')));
    await extract('tmp/skills.gz', 'tmp/extracted');

    reader = new Reader('./tmp/extracted/skills');

    let classes = ['Warrior', 'Waif', 'Archer', 'Deacon', 'Knight', 'Bandit', 'Ranger', 'Cleric'];


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
            classreqlbl: classes[row[7] + (row[6] ? 4: 0)],
            desc: row[8]
        });


    }

    fs.writeJsonSync(dest + 'skills.json', skills, { spaces: 4});


    // gfx
    console.log('Downloading Skill icons...');
    if (!fs.existsSync(dest + 'skills')) fs.mkdirSync(dest + 'skills');
    for (let i=0;i<=3;i++) {
        try {
            fs.writeFileSync(`${dest}skills/${i}.png`, await download(base(`play/skill/${i}`)));
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/skill/${i}`)
        }
    }





    // mobs
    console.log('Downloading mobs...');
    fs.writeFileSync('tmp/mobs.gz', await download(base('play/mobs')));
    await extract('tmp/mobs.gz', 'tmp/extracted');

    reader = new Reader('./tmp/extracted/mobs');

    let mobs = [];

    while (line = reader.next()) {
        let row = CSV.parse(line.toString())[0];
        mobs.push({
            name: row[0],
            unknownCol: row[1],
            undead: row[2]
        });
    }

    fs.writeJsonSync(dest + 'mobs.json', mobs, { spaces: 4});


    // items
    console.log('Downloading items...');
    fs.writeFileSync('tmp/items.gz', await download(base('play/itemdesc')));
    await extract('tmp/items.gz', 'tmp/extracted');

    reader = new Reader('./tmp/extracted/items');

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

    fs.writeJsonSync(dest + 'items.json', items, { spaces: 4});

    if (!fs.existsSync(dest + 'items')) fs.mkdirSync(dest + 'items');
    for (let i=1;i<=894;i++) {
        try {
            fs.writeFileSync(`${dest}items/${i}.png`, await download(base(`play/item/i/${i}`)));
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/item/i/${i}`)
        }
    }




    // bgm
    console.log('Downloading BGMs...');
    if (!fs.existsSync(dest + 'music')) fs.mkdirSync(dest + 'music');
    for (let i=1;i<=69;i++) {
        try {
            fs.writeFileSync(`${dest}music/${i}.mp3`, await download(base(`play/bgm/${i}`)));
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/bgm/${i}`)
        }
    }



    // gfx
    console.log('Downloading GFXs...');
    if (!fs.existsSync(dest + 'gfx')) fs.mkdirSync(dest + 'gfx');
    for (let i=1;i<=18;i++) {
        try {
            fs.writeFileSync(`${dest}gfx/${i}.png`, await download(base(`play/gfx/${i}`)));
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/gfx/${i}`)
        }
    }


    console.log('Downloading Misc...');
    if (!fs.existsSync(dest + 'misc')) fs.mkdirSync(dest + 'misc');
    try {
        fs.writeFileSync(`${dest}misc/paper.png`, await download(base(`play/ui/Paper`)));
    } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', `Error downloading ${PO_URL}play/ui/Paper`)
    }



    rimraf.sync('tmp');
    console.log('\x1b[32m%s\x1b[0m', 'Done.');
})();



