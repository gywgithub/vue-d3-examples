<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app width="280">
      <div class="img-container cursor-pointer">
        <img src="../assets/img/vue.png" class="logo-img" @click="goHome" />
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
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-translate</v-icon>
          <v-icon small>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item>
            <v-list-item-title @click="changeLang('en')">English</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="changeLang('zh')">简体中文</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
      <v-btn icon @click="requestFullscreen">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <v-btn icon @click="exitFullScreen">
        <v-icon>mdi-fullscreen-exit</v-icon>
      </v-btn>
      <v-btn icon @click="changeTheme">
        <v-icon v-if="!dark">mdi-brightness-7</v-icon>
        <v-icon v-else>mdi-brightness-4</v-icon>
      </v-btn>
      <v-btn icon @click="openTab">
        <v-icon size="28">mdi-github</v-icon>
      </v-btn>
      <v-btn icon @click="dialog = true">
        <v-icon size="28">mdi-information-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title primary-title>Vue D3 Examples</v-card-title>
        <v-card-text>Version: v{{version}}</v-card-text>
        <v-card-text>Author: YuanWei Guo</v-card-text>
        <v-card-text>Email: qingyi_w@outlook.com</v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import packageJson from '../../package.json'
export default {
  data: () => ({
    version: '',
    dialog: false,
    dark: false,
    drawer: null,
    itemActive: 0,
    subItemActive: 0,
    selectedItem: 0
  }),
  computed: {
    items: function () {
      return [
        {
          icon: 'mdi-alpha-i-box-outline',
          title: 'Introduction',
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
          // ,
          // active: true
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
  },
  beforeDestroy () {
    sessionStorage.removeItem('subItemActive')
    sessionStorage.removeItem('itemActive')
  },
  methods: {
    requestFullscreen () {
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
