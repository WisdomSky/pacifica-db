import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'
import Classes from '../views/Classes.vue'
import Gallery from '../views/Gallery.vue'
import Music from '../views/Music.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/items',
    name: 'Items',
    component: Items
  },
  {
    path: '/classes',
    name: 'Classes',
    component: Classes
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/music',
    name: 'Music',
    component: Music
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
