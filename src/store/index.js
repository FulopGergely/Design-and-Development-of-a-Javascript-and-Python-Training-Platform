import { createStore } from 'vuex'
import configJs from "@/assets/js_alapok";
import configPy from "@/assets/py_alapok";
configJs.tasks = configJs.tasks.map( (v,i) => v={ id:i+1, ...v } )
configPy.tasks = configPy.tasks.map( (v,i) => v={ id:i+1, ...v } )

// Vuex
const index = createStore({
    state () {
        return {
            tasksJs: [],
            tasksPy: [],
        }
    },
    mutations: {
        initTasksJs(state) {
            state.tasksJs = configJs.tasks
        },
        initTasksPy(state) {
            state.tasksPy = configPy.tasks
        },
    },
    actions: {
        initTasksJs(tasks){
            tasks.commit('initTasksJs')
        },
        initTasksPy(tasks){
            tasks.commit('initTasksPy')
        },
    },

})

export default index