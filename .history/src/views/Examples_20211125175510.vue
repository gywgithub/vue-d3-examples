<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app width="280">
      <div class="img-container cursor-pointer">
        <img src="../assets/img/vue-logo.svg" class="logo-img" @click="goHome" />
        <img src="../assets/img/d3.svg" class="logo-img img-d3-padding" @click="goHome" />
      </div>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-group v-for="(item, key) in items" :key="key" v-model="item.active" :append-icon="item.appendIcon" @click="itemClick(item, key)">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item-group v-if="item.children" color="primary" v-model="subItemActive">
            <v-list-item v-for="(subItem, k) in item.children" :key="k" @click="subItemClick(subItem, k)">
              <v-list-item-icon></v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark :dense="denseFlag">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Vue D3 Examples</span>
      </v-toolbar-title>
      <v-text-field
        v-model="searchText"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        :dense="denseFlag"
        @keyup.enter="handleSearch"
      />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" small>
            <v-icon>mdi-translate</v-icon>
            <v-icon small> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-subheader>TRANSLATIONS</v-subheader>
            <v-list-item>
              <v-list-item-title @click="changeLang('en')">English</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="changeLang('zh')">简体中文</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-tooltip v-if="!fullScreen" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="requestFullscreen" v-bind="attrs" v-on="on">
            <v-icon>mdi-fullscreen</v-icon>
          </v-btn>
        </template>
        <span>Full Screen</span>
      </v-tooltip>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="exitFullScreen" v-bind="attrs" v-on="on">
            <v-icon>mdi-fullscreen-exit</v-icon>
          </v-btn>
        </template>
        <span>Exit Full Screen</span>
      </v-tooltip>
      <v-tooltip v-if="!dark" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="changeTheme" v-bind="attrs" v-on="on">
            <v-icon>mdi-brightness-7</v-icon>
          </v-btn>
        </template>
        <span>Light</span>
      </v-tooltip>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="changeTheme" v-bind="attrs" v-on="on">
            <v-icon>mdi-brightness-4</v-icon>
          </v-btn>
        </template>
        <span>Dark</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="openTab" v-bind="attrs" v-on="on">
            <v-icon size="28">mdi-github</v-icon>
          </v-btn>
        </template>
        <span>GitHub</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="dialog = true" v-bind="attrs" v-on="on">
            <v-icon size="28">mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <span>About</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title primary-title>Vue D3 Examples</v-card-title>
        <v-card-text>Version: v{{ version }}</v-card-text>
        <v-card-text>Author: YuanWei Guo</v-card-text>
        <v-card-text>Email: qingyi_w@outlook.com</v-card-text>
      </v-card>
    </v-dialog>
    <v-fab-transition>
      <v-btn v-if="!hidden" color="primary" dark fixed bottom right fab @click="scrollTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import packageJson from '../../package.json'
export default {
  data: () => ({
    version: '',
    fullScreen: false,
    hidden: true,
    dialog: false,
    dark: false,
    drawer: null,
    itemActive: 0,
    subItemActive: 0,
    selectedItem: 0,
    denseFlag: true,
    marginTop: 0,
    searchText: ''
  }),
  computed: {
    items: function () {
      return [
        {
          icon: 'mdi-alpha-i-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.titleIntroduction.value'),
          path: '/examples/introduction',
          appendIcon: null,
          active: true
        },
        {
          icon: 'mdi-alpha-b-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title1.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title1.children.title1.value'), path: '/examples/helloworld' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title1.children.title2.value'), path: '/examples/updateenterexit' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title1.children.title3.value'), path: '/examples/generalupdatepattern' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title1.children.title4.value'), path: '/examples/selectelementbinddata' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title1.children.title5.value'), path: '/examples/selectinsertremove' }
          ],
          appendIcon: 'mdi-chevron-down'
        },
        {
          icon: 'mdi-alpha-t-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title2.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title1.value'), path: '/examples/treeI' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title2.value'), path: '/examples/treeII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title3.value'), path: '/examples/treeIII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title4.value'), path: '/examples/treeIV' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title5.value'), path: '/examples/treeV' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title6.value'), path: '/examples/treeVI' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title7.value'), path: '/examples/treeVII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title2.children.title8.value'), path: '/examples/treeVIII' }
          ],
          appendIcon: 'mdi-chevron-down'
        },
        {
          icon: 'mdi-alpha-b-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title3.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title3.children.title1.value'), path: '/examples/barchartI' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title3.children.title2.value'), path: '/examples/barchartII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title3.children.title3.value'), path: '/examples/axis' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title3.children.title4.value'), path: '/examples/simplebarchart' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title3.children.title5.value'), path: '/examples/scale' }
          ],
          appendIcon: 'mdi-chevron-down'
        },
        {
          icon: 'mdi-alpha-z-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title4.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title4.children.title1.value'), path: '/examples/zoomable' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title4.children.title2.value'), path: '/examples/zoomabletext' }
          ],
          appendIcon: 'mdi-chevron-down'
        },
        {
          icon: 'mdi-alpha-f-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title5.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title1.value'), path: '/examples/forcebasedI' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title2.value'), path: '/examples/forcebasedII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title3.value'), path: '/examples/forcebasedIII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title4.value'), path: '/examples/forcedirected' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title5.value'), path: '/examples/forcelayoutI' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title6.value'), path: '/examples/forcelayoutII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title5.children.title7.value'), path: '/examples/forcelayoutIII' }
          ],
          appendIcon: 'mdi-chevron-down'
        },
        {
          icon: 'mdi-alpha-h-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title6.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title6.children.title1.value'), path: '/examples/histogramI' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title6.children.title2.value'), path: '/examples/histogramII' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title6.children.title3.value'), path: '/examples/histogramIII' }
          ],
          appendIcon: 'mdi-chevron-down'
        },
        {
          icon: 'mdi-alpha-l-box-outline',
          title: this.$vuetify.lang.t('$vuetify.sidebar.title7.value'),
          children: [
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title7.children.title1.value'), path: '/examples/lines/line-chart-I' },
            { title: this.$vuetify.lang.t('$vuetify.sidebar.title7.children.title2.value'), path: '/examples/lines/line-chart-II' }
          ],
          appendIcon: 'mdi-chevron-down'
        }
      ]
    }
  },
  created () {
    this.version = packageJson.version
    if (localStorage.getItem('themeDark') && localStorage.getItem('themeDark') === 'true') {
      this.$vuetify.theme.dark = true
      this.dark = true
    }
    if (this.$route.path === '/examples') {
      // default route path
      this.$router.push('/examples/introduction').catch(err => { }) // eslint-disable-line
    } else {
      this.$router.push(this.$route.path).catch(err => { }) // eslint-disable-line
      const path = this.$route.path
      this.items.forEach((item, key) => {
        if (item.path === path) {
          this.itemActive = key
        } else {
          if (item.children && item.children.length > 0) {
            item.children.forEach((v, k) => {
              if (v.path === path) {
                sessionStorage.setItem('itemActive', key)
                sessionStorage.setItem('subItemActive', k)
              }
            })
          }
        }
      })

      if (sessionStorage.getItem('itemActive')) {
        this.items[0].active = false
        this.items[Number(sessionStorage.getItem('itemActive'))]['active'] = true
      }

      if (sessionStorage.getItem('subItemActive')) {
        this.subItemActive = Number(sessionStorage.getItem('subItemActive'))
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('i18nLocale') && sessionStorage.getItem('i18nLocale') === 'zh') {
      this.selectedItem = 1
    }
    document.addEventListener('fullscreenchange', () => {
      console.log('fullscreenchange')
    })

    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 100) {
        this.hidden = false
      } else {
        this.hidden = true
      }
    })

    // -- Watch Material Design Breakpoints --
    // https://vuetifyjs.com/en/features/breakpoints/#breakpoint-service
    const self = this
    if (self.$vuetify.breakpoint.name === 'xl') {
      self.denseFlag = false
    }
    this.$watch(
      function () {
        return self.$vuetify.breakpoint.name
      },
      function (newVal, oldVal) {
        if (newVal === 'xl') {
          self.denseFlag = false
        } else {
          self.denseFlag = true
        }
      }
    )
    // -- end --
  },
  beforeDestroy () {
    sessionStorage.removeItem('subItemActive')
    sessionStorage.removeItem('itemActive')
  },
  methods: {
    handleSearch () {
      let flag = false
      this.subItemActive = null
      let parentIndex = this.items.findIndex(item => item.title.toLowerCase() === this.searchText.toLowerCase())
      if (parentIndex !== -1) {
        flag = true
        sessionStorage.setItem('itemActive', parentIndex)
        if (this.items[parentIndex].children) {
          sessionStorage.setItem('subItemActive', 0)
          this.$router.push(this.items[parentIndex].children[0].path).catch(err => { }) // eslint-disable-line
        } else {
          this.subItemActive = null
          this.$router.push(this.items[parentIndex].path).catch(err => { }) // eslint-disable-line
        }
      } else {
        this.items.forEach((item, key) => {
          if (item.children && item.children.length > 0) {
            let chilIndex = item.children.findIndex(child => child.title.toLowerCase() === this.searchText.toLowerCase())
            if (chilIndex !== -1) {
              flag = true
              sessionStorage.setItem('subItemActive', chilIndex)
              sessionStorage.setItem('itemActive', key)
              this.$router.push(item.children[chilIndex].path).catch(err => { }) // eslint-disable-line
            }
          }
        })
      }
      if (!flag) {
        alert('未匹配到菜单！')
        return
      }
      if (sessionStorage.getItem('itemActive')) {
        this.items[0].active = false
        this.items[Number(sessionStorage.getItem('itemActive'))]['active'] = true
      }
      if (sessionStorage.getItem('subItemActive')) {
        this.subItemActive = Number(sessionStorage.getItem('subItemActive'))
      }
    },
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    requestFullscreen () {
      this.fullScreen = true
      const docElm = document.documentElement
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      }
    },
    exitFullScreen () {
      this.fullScreen = false
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    },
    changeLang (lang) {
      this.$i18n.locale = lang
      sessionStorage.setItem('i18nLocale', lang)
      if (sessionStorage.getItem('itemActive')) {
        this.items[0].active = false
        this.items[Number(sessionStorage.getItem('itemActive'))]['active'] = true
        if (sessionStorage.getItem('subItemActive')) {
          this.subItemActive = Number(sessionStorage.getItem('subItemActive'))
        }
      }
    },
    openTab () {
      window.open('https://github.com/gywgithub/vue-d3-examples', '_blank')
    },
    itemClick (item, key) {
      this.subItemActive = null
      sessionStorage.setItem('itemActive', key)
      console.dir(item)
      if (!item.children) {
        this.$router.push(item.path).catch(err => { }) // eslint-disable-line
      }
    },
    subItemClick (item, key) {
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
  padding: 20px;
  width: 280px;
  height: 140px;
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
