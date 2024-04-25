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

        }
    },
    mutations: {

    },

    getters: {

    },
    plugins: [ // Vuex Persist
        createPersistedState({
            key: 'my-app',
            paths: ['user', 'test.testDurationMinutes'],
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