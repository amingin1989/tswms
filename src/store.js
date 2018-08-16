import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userName: '',
            role: '',
            isLogin: false,
            functions: [],
            groups: []
        }
    },
    mutations: {
        setUserData(state, {userData}) {
            state.user.userName = userData.userName;
            state.user.role = userData.role;
            state.user.isLogin = userData.isLogin;
            state.user.functions = userData.functions;
            state.user.groups = userData.groups;
        }
    }
});