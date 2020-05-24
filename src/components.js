const components_req = require.context('./components', true, /^(.*\.(vue))[^.]*$/im);


export default components_req.keys().reduce(function(acc, key){
    const name = key.replace(/^.*\/([^\.]+)\.vue/,'$1');
    if (name !== 'App') {
        let comp = components_req(key);
        acc[name] = comp.default && comp.__esModule ? comp.default : comp;
    }
    return acc;
}, {});