import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './global.scss'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import VuePackeryPlugin from 'vue-packery-plugin'

Vue.use(VuePackeryPlugin)

import VueAplayer from 'vue-aplayer';
Vue.component('VueAplayer', VueAplayer);

import VueGallery from 'vue-gallery';
Vue.component('VueGallery', VueGallery);

import {VueMasonryPlugin} from 'vue-masonry';
Vue.use(VueMasonryPlugin)

import Dropdown from 'bp-vuejs-dropdown';
Vue.component('dropdown', Dropdown)


import components from '@/components'

for (const name in components) {
    if (components.hasOwnProperty(name)) {
        Vue.component(name, components[name]);
    }
}



import firebase from 'firebase/app';
import 'firebase/database';



import VueLazyload from 'vue-lazyload'


let images = require.context('./assets/', false, /\.png$/);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'assets/logo.png',
    loading: 'img/logo.png',
    attempt: 1
})


window.fbapp = firebase.initializeApp({
             apiKey: "AIzaSyAl9QnVeV1apTB6VWjlD5ezAtfwSaVyM8M",
             authDomain: "pacifica-db.firebaseapp.com",
             databaseURL: "https://pacifica-db.firebaseio.com",
             projectId: "pacifica-db",
             storageBucket: "pacifica-db.appspot.com",
             messagingSenderId: "133968955032",
             appId: "1:133968955032:web:78d51cc168dde9e43532ed"
         });



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
