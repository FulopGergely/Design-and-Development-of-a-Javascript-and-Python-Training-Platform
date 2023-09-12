import { createStore } from 'vuex'

// Vuex
const index = createStore({
    state () {
        return {
            count: 0,
            input: ''
        }
    },
    mutations: {
        increment (state) {
            console.log(state)
            state.count++
        },
        change (state) {
            this.input = state
        },
    }
})

export default index