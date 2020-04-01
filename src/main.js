import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import vuetify from '@/plugins/vuetify'
// import store from './store'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false
// Vue.use(vuetify)

new Vue({
  router,
  // store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
