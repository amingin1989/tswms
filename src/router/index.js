import Vue from 'vue'
import Router from 'vue-router'
import M0001 from '@/components/M0001'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/m0001',
      name: 'M0001',
      component: M0001
    }
  ]
})
