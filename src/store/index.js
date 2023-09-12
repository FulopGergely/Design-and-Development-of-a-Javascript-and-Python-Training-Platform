import { createStore } from 'vuex'

// Vuex
const index = createStore({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

export default index