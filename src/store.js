import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userName: '',
            authoritys: [],
            isLogin: false,
            functions: []
        }
    },
    mutations: {
        setUserData(state, {userData}) {
            state.user.userName = userData.userName;
            state.user.authoritys = userData.authoritys;
            state.user.isLogin = userData.isLogin;
            state.user.functions = userData.functions;
        }
    }
});