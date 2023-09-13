import { createStore } from 'vuex'
import config from "@/assets/js_alapok";
config.tasks = config.tasks.map( (v,i) => v={ id:i+1, ...v } )

// Vuex
const index = createStore({
    state () {
        return {
            tasks: [],
        }
    },
    mutations: {
        initTasks(state) {
            state.tasks = config.tasks
        },
        changeCode() {

        }
    },
    actions: {
        initTasks(tasks){
            tasks.commit('initTasks')
        },
        changeCode() {

        },
    },

})

export default index