import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import user from './user';
import task from './task';
import test from './test';
// Vuex
const store = createStore({
    modules: {
        user: user,
        task: task,
        test: test,
    },
    state() {
        return {
            loading: false, //segédváltozó, oldal async betöltése miatt
            loginLoading: false, //segédváltozó, oldal async betöltése miatt
            theme: 'lara-light-blue', //lara-light-blue vagy arya-blue
        }
    },
    mutations: {
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        setLoginLoading(state, isLoading) {
            state.loginLoading = isLoading;
        },
        setTheme(state, update) {
            state.theme = update
        },
    },

    getters: {
        getLoading: (state) => state.loading,
        getLoginLoading: (state) => state.loginLoading,
        getTheme: state => {
            return state.theme;
        },
    },
    plugins: [ // Vuex Persist
        createPersistedState({
            key: 'my-app',
            paths: ['user', 'test.testDurationMinutes', 'theme', 'task', 'task.currentSide', 'test', 'loginLoading'],
            storage: window.sessionStorage,
        }),
    ],
})

export default store

//hivatkozás:

// import store from '@/store/store.js';

//state     store.state.loading
//getter    store.getters.getLoading
//mutáció   store.commit('myMutation', newValue);

//user

//state     store.state.user.currentUser
//getter    store.getters.getCurrentUser
//mutáció   store.commit('setCurrentUser', 'newValue');