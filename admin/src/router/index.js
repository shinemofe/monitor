import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "about" */ '../views/list.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/detail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
