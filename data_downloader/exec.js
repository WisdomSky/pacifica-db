const fs = require('fs-extra');
const rimraf = require('rimraf');


const dest = require('./config').dest + '/';


(async () => {


    // quests
    let quests = await require('./scripts/quest').fetch();
    fs.writeJsonSync(dest + 'quests.json', quests, { spaces: 4});


    // skills
    await require('./scripts/skills.icons').fetch();
    let skills = await require('./scripts/skills').fetch();
    fs.writeJsonSync(dest + 'skills.json', skills, { spaces: 4});


    // mobs
    let mobs = await require('./scripts/mobs').fetch();
    fs.writeJsonSync(dest + 'mobs.json', mobs, { spaces: 4});


    // items
    let items = await require('./scripts/items').fetch();
    fs.writeJsonSync(dest + 'items.json', items, { spaces: 4});

    let itemfiles = await require('./scripts/item.files').fetch();
    fs.writeJsonSync(dest + 'items.files.json', itemfiles, { spaces: 4});

    let itemsmapped = await require('./scripts/item.mapped').fetch();
    fs.writeJsonSync(dest + 'items.mapped.json', itemsmapped, { spaces: 4});


    // bgm
    await require('./scripts/bgm').fetch();

    // gfx
    await require('./scripts/gfx').fetch();

    // gfx
    await require('./scripts/misc').fetch();


    rimraf.sync(dest.tmp);
    console.log('\x1b[32m%s\x1b[0m', 'Done.');
})();



