import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/Examples',
      name: 'Examples',
      component: () => import('./views/Examples.vue')
    },
    {
      path: '/NextBranch',
      name: 'NextBranch',
      component: () => import('./views/NextBranch.vue')
    }
  ]
})
