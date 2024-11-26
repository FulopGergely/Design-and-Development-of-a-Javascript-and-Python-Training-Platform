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
            theme: 'lara-light-blue', //lara-light-blue vagy arya-blue
        }
    },
    mutations: {
        setTheme(state, update) {
            state.theme = update
        },
    },

    getters: {
        getTheme: state => {
            return state.theme;
        },
    },
    plugins: [ // Vuex Persist
        createPersistedState({
            key: 'my-app',
            paths: ['user', 'test.testDurationMinutes', 'theme', 'task', 'task.currentSide', 'test', 'test.testSheet', 'testSheet'],
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