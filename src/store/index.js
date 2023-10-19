import { createStore } from 'vuex'
import configJs from "@/assets/js_alapok";
import configPy from "@/assets/py_alapok";
configJs.tasks = configJs.tasks.map( (v,i) => v={ id:i+1, ...v } )
configPy.tasks = configPy.tasks.map( (v,i) => v={ id:i+1, ...v } )
import createPersistedState from 'vuex-persistedstate';
// Vuex
const index = createStore({
    state () {
        return {
            tasks: [],
            view: '',
            side: 1,
            auth: {},
            loading: true,
            countdown: 1200, // 20 perc másodpercekben
        }
    },
    mutations: {
        initTasksJs(state) {
            state.tasks = configJs.tasks
            state.view = 'javascript'
        },
        initTasksPy(state) {
            state.tasks = configPy.tasks
            state.view = 'python'
        },
        changeCode(state, code){
            state.tasks[state.side-1].code = code
        },
        changeSide(state, increment){
            state.side < 0 ? state.side = 0 : state.side = state.side + increment
        },
        changeAuth(state, auth){
            state.auth = auth
        },
        RESET_MODULE_STATE(state) {
            state.tasks = [];
            state.view = '';
            state.side = 0;
            state.auth = {};
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        decrementCountdown(state) {
            state.countdown--;
            if (state.countdown < 0) {
              state.countdown = 0;
            }
          },
    },
    actions: {
        initTasks(tasks, view){
            //console.log(localStorage.getItem('my-app'))
            view === 'javascript' ? tasks.commit('initTasksJs') : tasks.commit('initTasksPy')
        },
        changeCode(state, code){
            state.commit('changeCode', code)
        },
        changeSide(state, increment){
            state.commit('changeSide', increment)
        },
        changeAuth(state, auth){
            state.commit('changeAuth', auth)
        },
        resetModuleState({ commit }) {
            commit('RESET_MODULE_STATE');
        },
        setLoading(state, isLoading) {
            state.commit('setLoading', isLoading)
        },
        startCountdown({ commit }) {
            setInterval(() => {
              commit('decrementCountdown');
            }, 1000);
          },
    },
    getters: {
        formattedCountdown(state) {
          const minutes = Math.floor(state.countdown / 60);
          const remainingSeconds = state.countdown % 60;
          const formattedMinutes = String(minutes).padStart(2, '0');
          const formattedSeconds = String(remainingSeconds).padStart(2, '0');
          return `${formattedMinutes}:${formattedSeconds}`;
        },
      },
    plugins: [ // Vuex Persist
        createPersistedState({
            key: 'my-app',
            paths: ['tasks','view','side','auth','countdown'],
            storage: window.localStorage,
        }),
    ],
})

export default index