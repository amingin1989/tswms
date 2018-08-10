import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/components/Login'
import Main from '@/components/Main'
import M0001 from '@/components/M0001/M0001'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/m0001',
          name: 'M0001',
          component: M0001,
          meta: { requiresAuth: true }
        }
      ]
    }, {
      path: '/loginpage',
      name: 'Login',
      component: Login
    }, {
      path: '/*',
      redirect: '/loginpage'
    }
  ]
});

router.beforeEach((to, from, next) => {
  var user = store.state.user;
  var isLogin = user.isLogin;
  
  //isLogin = true;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin) {
      next(); // 往下繼續執行
    } else {
      next({ path: '/loginpage' });
    }
  } else {//只有登入頁面不用驗證
    if (isLogin) {
      next({ path: '/' });
    } else {
      next();
    }
  }
});

export default router;
