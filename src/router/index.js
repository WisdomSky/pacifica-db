import Vue from 'vue'
import VueRouter from 'vue-router'

let pages = require.context('../views/', false, /\.vue/);

let page_routes = pages.keys().map(page => {
  let name = page.replace(/^\.\/(.*)\.vue$/, '$1');
  return {
      name,
      path: '/' + (name === 'Index' ?'': name.toLowerCase()),
      component() {
        return import(`../views/${name}.vue`);
      }
  }
});


Vue.use(VueRouter);

  const routes = [
      ...page_routes,

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
