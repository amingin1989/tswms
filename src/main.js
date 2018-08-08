import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bootstrap from 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

Vue.use(bootstrap)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
