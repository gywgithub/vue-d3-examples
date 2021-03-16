import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { vuetify, i18n } from '@/plugins/vuetify'
import VueParticles from 'vue-particles'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueParticles)

require('./mock.js')

axios.defaults.withCredentials = true

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
