import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/examples',
      name: 'examples',
      component: () => import('./views/Examples.vue'),
      children: [
        {
          path: '/examples/helloworld',
          name: 'helloworld',
          component: () => import('./components/HelloWorld.vue')
        },
        {
          path: '/examples/updateenterexit',
          name: 'updateenterexit',
          component: () => import('./components/UpdateEnterExit.vue')
        },
        {
          path: '/examples/treeI',
          name: 'treeI',
          component: () => import('./components/TreeI.vue')
        },
        {
          path: '/examples/treeII',
          name: 'treeII',
          component: () => import('./components/TreeII.vue')
        },
        {
          path: '/examples/treeIII',
          name: 'treeIII',
          component: () => import('./components/TreeIII.vue')
        },
        {
          path: '/examples/treeIV',
          name: 'treeIV',
          component: () => import('./components/TreeIV.vue')
        },
        {
          path: '/examples/treeV',
          name: 'treeV',
          component: () => import('./components/TreeV.vue')
        },
        {
          path: '/examples/treeVI',
          name: 'treeVI',
          component: () => import('./components/TreeVI.vue')
        },
        {
          path: '/examples/treeVII',
          name: 'treeVII',
          component: () => import('./components/TreeVII.vue')
        },
        {
          path: '/examples/barchartI',
          name: 'barchartI',
          component: () => import('./components/BarChartI.vue')
        },
        {
          path: '/examples/barchartII',
          name: 'barchartII',
          component: () => import('./components/BarChartII.vue')
        },
        {
          path: '/examples/axis',
          name: 'axis',
          component: () => import('./components/Axis.vue')
        },
        {
          path: '/examples/histogramI',
          name: 'histogramI',
          component: () => import('./components/CompleteHistogramI.vue')
        },
        {
          path: '/examples/histogramII',
          name: 'histogramII',
          component: () => import('./components/CompleteHistogramII.vue')
        },
        {
          path: '/examples/histogramIII',
          name: 'histogramIII',
          component: () => import('./components/CompleteHistogramIII.vue')
        },
        {
          path: '/examples/forcebasedI',
          name: 'forcebasedI',
          component: () => import('./components/ForceBasedLabelPlacementI.vue')
        },
        {
          path: '/examples/forcebasedII',
          name: 'forcebasedII',
          component: () => import('./components/ForceBasedLabelPlacementII.vue')
        },
        {
          path: '/examples/forcebasedIII',
          name: 'forcebasedIII',
          component: () => import('./components/ForceBasedLabelPlacementIII.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('./views/NotFound.vue')
    }
  ]
})
