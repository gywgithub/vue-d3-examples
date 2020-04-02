<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app width="280">
      <div class="img-container cursor-pointer">
        <img src="../assets/img/logo.png" class="logo-img" @click="goHome" />
        <img src="../assets/img/d3.svg" class="logo-img img-d3-padding" @click="goHome" />
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="(item, key) in items"
          :key="key"
          v-model="item.active"
          :append-icon="item.appendIcon"
          @click="itemClick(item,key)"
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item-group v-if="item.children" color="primary" v-model="subItemActive">
            <v-list-item
              v-for="(subItem, k) in item.children"
              :key="k"
              @click="subItemClick(subItem, k)"
            >
              <v-list-item-icon></v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Vue D3 Examples</span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />-->
      <v-spacer />
      <v-btn icon @click="changeTheme">
        <v-icon v-if="!dark">mdi-brightness-7</v-icon>
        <v-icon v-else>mdi-brightness-4</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-btn bottom color="secondary" dark fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dark: false,
    drawer: null,
    itemActive: 0,
    subItemActive: null,
    items: [
      // {
      //   icon: 'mdi-alpha-b-box-outline',
      //   title: 'Introduction',
      //   path: '/examples/introduction',
      //   appendIcon: null,
      //   active: true
      // },
      {
        icon: 'mdi-alpha-b-box-outline',
        title: 'Basic',
        children: [
          { title: 'HelloWorld', path: '/examples/helloworld' },
          { title: 'UpdateEnterExit', path: '/examples/updateenterexit' },
          { title: 'GeneralUpdatePatternI', path: '/examples/generalupdatepattern' },
          { title: 'SelectElementAndBindData', path: '/examples/selectelementbinddata' },
          { title: 'SelectInsertRemove', path: '/examples/selectinsertremove' }
        ],
        appendIcon: 'mdi-chevron-down',
        active: true
      },
      {
        icon: 'mdi-alpha-t-box-outline',
        title: 'Tree',
        children: [
          { title: 'TreeI', path: '/examples/treeI' },
          { title: 'TreeII', path: '/examples/treeII' },
          { title: 'TreeIII', path: '/examples/treeIII' },
          { title: 'TreeIV', path: '/examples/treeIV' },
          { title: 'TreeV', path: '/examples/treeV' },
          { title: 'TreeVI', path: '/examples/treeVI' },
          { title: 'TreeVII', path: '/examples/treeVII' }
        ],
        appendIcon: 'mdi-chevron-down'
      },
      {
        icon: 'mdi-alpha-b-box-outline',
        title: 'BarChart',
        children: [
          { title: 'BarChartI', path: '/examples/barchartI' },
          { title: 'BarChartII', path: '/examples/barchartII' },
          { title: 'BarChartAxis', path: '/examples/axis' },
          { title: 'SimpleBarChart', path: '/examples/simplebarchart' },
          { title: 'Scale', path: '/examples/scale' }
        ],
        appendIcon: 'mdi-chevron-down'
      },
      {
        icon: 'mdi-alpha-z-box-outline',
        title: 'Zoom',
        children: [
          { title: 'Zoomable', path: '/examples/zoomable' },
          { title: 'ZoomableText', path: '/examples/zoomabletext' },
          { title: 'BarChartAxis', path: '/examples/axis' },
          { title: 'SimpleBarChart', path: '/examples/simplebarchart' }
        ],
        appendIcon: 'mdi-chevron-down'
      },
      {
        icon: 'mdi-alpha-f-box-outline',
        title: 'Force',
        children: [
          { title: 'ForceBasedI', path: '/examples/forcebasedI' },
          { title: 'ForceBasedII', path: '/examples/forcebasedII' },
          { title: 'ForceBasedIII', path: '/examples/forcebasedIII' },
          { title: 'ForceDirected', path: '/examples/forcedirected' },
          { title: 'ForceLayoutI', path: '/examples/forcelayoutI' },
          { title: 'ForceLayoutII', path: '/examples/forcelayoutII' },
          { title: 'ForceLayoutIII', path: '/examples/forcelayoutIII' }
        ],
        appendIcon: 'mdi-chevron-down'
      },
      {
        icon: 'mdi-alpha-h-box-outline',
        title: 'Histogram',
        children: [
          { title: 'HistogramI', path: '/examples/histogramI' },
          { title: 'HistogramII', path: '/examples/histogramII' },
          { title: 'HistogramIII', path: '/examples/histogramIII' }
        ],
        appendIcon: 'mdi-chevron-down'
      }
    ]
  }),
  created () {
    if (localStorage.getItem('themeDark') && localStorage.getItem('themeDark') === 'true') {
      this.$vuetify.theme.dark = true
      this.dark = true
    }
    if (this.$route.path === '/examples') {
      console.log('/example') // eslint-disable-line
      this.$router.push('/examples/helloworld').catch(err => { }) // eslint-disable-line
    } else {
      console.log(this.$route) // eslint-disable-line
      this.$router.push(this.$route.path).catch(err => { }) // eslint-disable-line
    }
    if (sessionStorage.getItem('itemActive')) {
      this.items[0].active = false
      this.items[Number(sessionStorage.getItem('itemActive'))]['active'] = true
    }
    console.log(this.items)

    if (sessionStorage.getItem('subItemActive')) {
      this.subItemActive = Number(sessionStorage.getItem('subItemActive'))
      console.log(sessionStorage.getItem('subItemActive'))
      console.log(133)
    }
  },
  beforeDestory () {
    sessionStorage.removeItem('subItemActive')
    sessionStorage.removeItem('itemActive')
  },
  mounted () {
  },
  methods: {
    itemClick (item, key) {
      this.subItemActive = null
      console.log(item, key) // eslint-disable-line
      sessionStorage.setItem('itemActive', key)
    },
    subItemClick (item, key) {
      console.log(item, key) // eslint-disable-line
      sessionStorage.setItem('subItemActive', key)
      this.$router.push(item.path).catch(err => { }) // eslint-disable-line
    },
    goHome () {
      this.$router.push('/Home').catch(err => { }) // eslint-disable-line
    },
    changeTheme () {
      this.dark = !this.dark
      localStorage.setItem('themeDark', String(this.dark))
      this.$vuetify.theme.dark = this.dark
    }
  }
}
</script>
<style scoped>
.img-container {
  display: flex;
  padding: 40px 20px;
}
.logo-img {
  width: 45%;
  object-fit: contain;
  margin: 0 5px;
}
.img-d3-padding {
  padding: 4px !important;
}
</style>
