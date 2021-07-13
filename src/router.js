import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { title: '' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { title: 'Home' }
    },
    {
      path: '/examples',
      name: 'examples',
      component: () => import('./views/Examples.vue'),
      meta: { title: 'Examples' },
      children: [
        {
          path: '/examples/helloworld',
          name: 'helloworld',
          component: () => import('./components/HelloWorld.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/examples/updateenterexit',
          name: 'updateenterexit',
          component: () => import('./components/UpdateEnterExit.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/examples/generalupdatepattern',
          name: 'generalupdatepattern',
          component: () => import('./components/GeneralUpdatePatternI.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/examples/selectelementbinddata',
          name: 'selectelementbinddata',
          component: () => import('./components/SelectElementAndBindData.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/examples/selectinsertremove',
          name: 'selectinsertremove',
          component: () => import('./components/SelectInsertRemove.vue'),
          meta: { title: 'Basic' }
        },
        {
          path: '/examples/treeI',
          name: 'treeI',
          component: () => import('./components/TreeI.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeII',
          name: 'treeII',
          component: () => import('./components/TreeII.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeIII',
          name: 'treeIII',
          component: () => import('./components/TreeIII.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeIV',
          name: 'treeIV',
          component: () => import('./components/TreeIV.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeV',
          name: 'treeV',
          component: () => import('./components/TreeV.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeVI',
          name: 'treeVI',
          component: () => import('./components/TreeVI.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeVII',
          name: 'treeVII',
          component: () => import('./components/TreeVII.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/treeVIII',
          name: 'treeVIII',
          component: () => import('./components/TreeVIII.vue'),
          meta: { title: 'Tree' }
        },
        {
          path: '/examples/barchartI',
          name: 'barchartI',
          component: () => import('./components/BarChartI.vue'),
          meta: { title: 'BarChart' }
        },
        {
          path: '/examples/barchartII',
          name: 'barchartII',
          component: () => import('./components/BarChartII.vue'),
          meta: { title: 'BarChart' }
        },
        {
          path: '/examples/axis',
          name: 'axis',
          component: () => import('./components/Axis.vue'),
          meta: { title: 'BarChart' }
        },
        {
          path: '/examples/simplebarchart',
          name: 'simplebarchart',
          component: () => import('./components/SimpleBarChart.vue'),
          meta: { title: 'BarChart' }
        },
        {
          path: '/examples/scale',
          name: 'scale',
          component: () => import('./components/Scale.vue'),
          meta: { title: 'BarChart' }
        },
        {
          path: '/examples/histogramI',
          name: 'histogramI',
          component: () => import('./components/CompleteHistogramI.vue'),
          meta: { title: 'Histogram' }
        },
        {
          path: '/examples/histogramII',
          name: 'histogramII',
          component: () => import('./components/CompleteHistogramII.vue'),
          meta: { title: 'Histogram' }
        },
        {
          path: '/examples/histogramIII',
          name: 'histogramIII',
          component: () => import('./components/CompleteHistogramIII.vue'),
          meta: { title: 'Histogram' }
        },
        {
          path: '/examples/forcebasedI',
          name: 'forcebasedI',
          component: () => import('./components/ForceBasedLabelPlacementI.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/forcebasedII',
          name: 'forcebasedII',
          component: () => import('./components/ForceBasedLabelPlacementII.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/forcebasedIII',
          name: 'forcebasedIII',
          component: () => import('./components/ForceBasedLabelPlacementIII.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/forcedirected',
          name: 'forcedirected',
          component: () => import('./components/ForceDirectedGraph.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/forcelayoutI',
          name: 'forcelayoutI',
          component: () => import('./components/ModifyingAForceLayoutI.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/forcelayoutII',
          name: 'forcelayoutII',
          component: () => import('./components/ModifyingAForceLayoutII.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/forcelayoutIII',
          name: 'forcelayoutIII',
          component: () => import('./components/ModifyingAForceLayoutIII.vue'),
          meta: { title: 'Force' }
        },
        {
          path: '/examples/zoomable',
          name: 'zoomable',
          component: () => import('./components/Zoomable.vue'),
          meta: { title: 'Zoom' }
        },
        {
          path: '/examples/zoomabletext',
          name: 'zoomabletext',
          component: () => import('./components/ZoomableText.vue'),
          meta: { title: 'Zoom' }
        }
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('./views/NotFound.vue'),
      meta: { title: 'Notfound' }
    }
  ]
})

// router guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title + ' | ' + 'Vue D3 V5 Examples' : 'Vue D3 V5 Examples'
  next()
})

export default router
