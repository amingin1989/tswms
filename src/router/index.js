import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/components/Login'
import Main from '@/components/Main'
import M0001 from '@/components/M0001/M0001'
import M0002 from '@/components/M0002/M0002'
import M0003 from '@/components/M0003/M0003'
import S0001 from '@/components/S0001/S0001'

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
          path: '/m0001',//人員管理
          name: 'M0001',
          component: M0001,
          meta: { requiresAuth: true, adminAuth: true }
        },{
          path: '/m0002',//群組權限管理
          name: 'M0002',
          component: M0002,
          meta: { requiresAuth: true, adminAuth: true }
        }, {
          path: '/m0003',//功能管理
          name: 'M0003',
          component: M0003,
          meta: { requiresAuth: true, adminAuth: true }
        }, {
          path: '/s0001',
          name: 'S0001',
          component: S0001,
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
  const user = store.state.user;
  //const isLogin = user.isLogin;

  const isLogin = true;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin) {
      if (to.meta.adminAuth) {//只有管理員才能進入的頁面
        //const role = user.role;
        const role = 'ROLE_ADMIN';
        if (role == 'ROLE_ADMIN') {
          next(); // 往下繼續執行
        } else {
          next({ path: '/' });
        }
      } else {
        next();
      }
    } else {
      next({ path: '/loginpage' });
    }
  } else {//目前只有登入頁面不用驗證
    if (isLogin) {
      next({ path: '/' });
    } else {
      next();
    }
  }
});

export default router;
