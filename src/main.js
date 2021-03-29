import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify, i18n } from '@/plugins/vuetify'
import VueParticles from 'vue-particles'

Vue.config.productionTip = false
Vue.use(VueParticles)

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
