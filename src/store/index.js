import { createStore } from 'vuex'
import configJs from "@/assets/js_alapok";
import configPy from "@/assets/py_alapok";
configJs.tasks = configJs.tasks.map( (v,i) => v={ id:i+1, ...v } )
configPy.tasks = configPy.tasks.map( (v,i) => v={ id:i+1, ...v } )

// Vuex
const index = createStore({
    state () {
        return {
            tasks: [],
        }
    },
    mutations: {
        initTasksJs(state) {
            state.tasks = configJs.tasks
        },
        initTasksPy(state) {
            state.tasks = configPy.tasks
        },
    },
    actions: {
        initTasks(tasks, view){
            view === 'javascript' ? tasks.commit('initTasksJs') : tasks.commit('initTasksPy')
        },
    },

})

export default index