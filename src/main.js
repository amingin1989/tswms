import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bootstrap from 'bootstrap'
import vueMultiselect from 'vue-multiselect'
import VueGoodTablePlugin from 'vue-good-table';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-good-table/dist/vue-good-table.css'

library.add(faUserCog, faUsers, faWarehouse, faUserPlus, faTrashAlt, faSave,
  faEdit, faUser, faKey, faSignOutAlt, faSearch, faWrench, faUserAlt,
  faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight)

Vue.use(bootstrap)
Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('multiselect', vueMultiselect)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

