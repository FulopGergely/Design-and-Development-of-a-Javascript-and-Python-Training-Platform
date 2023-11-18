import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import user from './user';
// Vuex
const store = createStore({
    modules: {
        user: user,
    },
    state() {
        return {
            loading: false,
        }
    },
    mutations: {
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
    },

    getters: {
        getLoading: (state) => state.loading,
    },
    plugins: [ // Vuex Persist
        createPersistedState({
            key: 'my-app',
            paths: ['user'],
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