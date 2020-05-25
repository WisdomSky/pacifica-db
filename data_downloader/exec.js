const fs = require('fs-extra');
const rimraf = require('rimraf');
const utils = require('./utils');


const config = require('./config');

const hash = require('hash-sum');

(async () => {


    // quests
    let quests = await require('./scripts/quest').fetch();
    fs.writeJsonSync(config.dest + '/quests.json', quests, { spaces: 4});


    // skills
    await require('./scripts/skills.icons').fetch();
    let skills = await require('./scripts/skills').fetch();
    fs.writeJsonSync(config.dest + '/skills.json', skills, { spaces: 4});


    // mobs
    let mobs = await require('./scripts/mobs').fetch();
    fs.writeJsonSync(config.dest + '/mobs.json', mobs, { spaces: 4});


    // items
    let items = await require('./scripts/items').fetch();
    fs.writeJsonSync(config.dest + '/items.json', items, { spaces: 4});

    let itemfiles = await require('./scripts/item.files').fetch();
    fs.writeJsonSync(config.dest + '/items.files.json', itemfiles, { spaces: 4});

    let itemsid = await require('./scripts/item.id').fetch();
    fs.writeJsonSync(config.dest + '/items.id.json', itemsid, { spaces: 4});

    let itemsidflipped = utils.objectFlip(itemsid);

    let itemsmapped = items.map((item) => {
        item.id = Number(itemsidflipped[item.name]);
        item.hash = hash(item);
        return item;
    });

    fs.writeJsonSync(config.dest + '/items.mapped.json', itemsmapped, { spaces: 4});


    // bgm
    await require('./scripts/bgm').fetch();


    // gfx
    await require('./scripts/gfx').fetch();


    // gfx
    await require('./scripts/misc').fetch();


    rimraf.sync(config.tmp);
    console.log('\x1b[32m%s\x1b[0m', 'Done.');
})();



