

let config = {
    css: {
        loaderOptions: {
            sass: {
                implementation: require('dart-sass'), // This line must in sass option
            },
        },
    },


};




if (process.env.NODE_ENV === 'production') {


    const list = require('@rowanmanning/list-all-files');
    const pagelist = list.sync('./src/views');

    config.pages = pagelist.reduce((pages, page) => {

            let page_name = page.replace(/.*\/([^\/]+)\.vue$/, '$1').toLowerCase();

            pages[page_name] = {
                entry: 'src/main.js',
                template: 'public/index.html',
                filename: page_name + '.html'
            }
            return pages;
        }, {});
}


module.exports = config;
