import { createStore } from 'vuex'
import configJs from "@/assets/js_alapok";
import configPy from "@/assets/py_alapok";
configJs.tasks = configJs.tasks.map((v, i) => v = { id: i + 1, ...v })
configPy.tasks = configPy.tasks.map((v, i) => v = { id: i + 1, ...v })
import createPersistedState from 'vuex-persistedstate';
// Vuex
const index = createStore({
    state() {
        return {
            tasks: [],
            programmingLanguageName: '',
            side: 0,
            auth: {},
            loading: true,
            countDownTime: 0, // 20 perc másodpercekben
            correctTask: [],
            finishTest: false,
            result: 0, //teszt végeredménye
        }
    },
    mutations: {
        initTasksJs(state) {
            console.log('initTasksJs')
            state.tasks = configJs.tasks
            state.programmingLanguageName = 'javascript'
        },
        initTasksPy(state) {
            console.log('initTasksPy')
            state.tasks = configPy.tasks
            state.programmingLanguageName = 'python'
        },
        changeCode(state, code) {
            console.log('changeCode')
            state.tasks[state.side - 1].code = code
        },
        changeExampleCode(state, exampleCode) {
            console.log('changeExampleCode')
            state.tasks[state.side - 1].exampleCode = exampleCode
        },
        changeSide(state, increment) {
            state.side <= 0 ? state.side = 1 : state.side = state.side + increment
        },
        changeAuth(state, auth) {
            state.auth = auth
        },
        RESET_MODULE_STATE(state) {
            state.tasks = []
            state.programmingLanguageName = ''
            state.side = 0
            state.auth = {}
            state.countDownTime = 99999 // sec
            state.correctTask = []
            state.finishTest = false
            state.result = 0
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        decrementCountdown(state) {
            if (state.countDownTime > 0) {
                state.countDownTime--;
            }
            //console.log(state.countDownTime)
            if (state.countDownTime <= 0 && !state.finishTest) {
                state.side = state.tasks.length + 1
                state.finishTest = true
            }
        },
        changeCountdownTime(state, changeCountdownTime) {
            state.countDownTime = changeCountdownTime;
        },
        correctTask(state) {
            if (state.side < state.correctTask.length) {
                state.correctTask[state.side] = 1;
            } else {
                console.error('Érvénytelen oldal (side) érték');
            }
        },
        //no actions
        appendToAuth(state, data) {
            state.auth = { ...state.auth, ...data };
        },
        InitCorreactArrayLenght(state, length) {
            state.correctTask = Array(length).fill(0);
        },
        changeDisableButton(state) {
            console.log(state.tasks[state.side - 1].options)
            state.tasks[state.side - 1].options.map((button) => {
                button.disableButton = true
            })
        },
        changeFinishTest(state, bool) {
            console.log('vuex:' + bool)
            state.finishTest = bool
        },
        changeResult(state, result) {
            state.result = result
        },
    },
    actions: {
        initTasks(tasks, programmingLanguageName) {
            //console.log(localStorage.getItem('my-app'))
            programmingLanguageName === 'javascript' ? tasks.commit('initTasksJs') : tasks.commit('initTasksPy')
        },
        changeCode(state, code) {
            state.commit('changeCode', code)
        },
        changeExampleCode(state, exampleCode) {
            state.commit('changeExampleCode', exampleCode)
        },
        changeSide(state, increment) {
            state.commit('changeSide', increment)
        },
        changeAuth(state, auth) {
            state.commit('changeAuth', auth)
        },
        resetModuleState({ commit }) {
            commit('RESET_MODULE_STATE');
        },
        setLoading(state, isLoading) {
            state.commit('setLoading', isLoading)
        },
        startCountdown({ commit }) {
            commit('decrementCountdown')
        },
        changeCountdownTime(state, changeCountdownTime) {
            state.commit('changeCountdownTime', changeCountdownTime)
        },
        correctTask(state, correctTask) {
            state.commit('correctTask', correctTask)
        },

    },
    getters: {
        formattedCountdown(state) {
            const minutes = Math.floor(state.countDownTime / 60);
            const remainingSeconds = state.countDownTime % 60;
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');
            return `${formattedMinutes}:${formattedSeconds}`;
        },
        getArrayCorrectTasks(state) {
            return state.correctTask
        },
        getCorrectOptionsValue(state) {
            return state.tasks[state.side - 1].result
        },
        getOptions(state) {
            return state.tasks[state.side - 1].options
        },
        isCode(state) {
            return state.tasks[state.side - 1].code
        },
        getType(state) {
            return state.tasks[state.side - 1].type
        },
        getTasksLength(state) {
            return state.tasks.length
        },
        getCode(state) {
            //console.log('vuex:')
            //console.log(state.tasks[4].code)
            //console.log(state.tasks[state.side - 1].code)
            try {
                return state.tasks[state.side - 1].code
            } catch {
                return ''
            }

        },
        getExampleCode(state) {
            try {
                return state.tasks[state.side - 1].exampleCode
            } catch {
                return ''
            }

        },
        getTask(state) {
            return state.tasks[state.side - 1]
        },
        getfinishTest(state) {
            return state.finishTest
        }
    },
    plugins: [ // Vuex Persist
        createPersistedState({
            key: 'my-app',
            paths: ['tasks', 'programmingLanguageName', 'side', 'auth', 'countDownTime', 'timerIsRunning', 'correctTask', 'finishTest', 'result'],
            storage: window.localStorage,
        }),
    ],
})

export default index