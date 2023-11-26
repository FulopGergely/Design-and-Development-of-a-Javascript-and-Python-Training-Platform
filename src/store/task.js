export default {
    state() {
        return {
            tasks: [],

        };
    },
    mutations: {
        AddTask(state, obj) {
            state.tasks.push(obj);
        },
        DeleteTask(state, index) {
            state.tasks.splice(index, 1);
        },
        UpdateTask(state, { index, updatedTask }) {
            state.tasks.splice(index, 1, updatedTask);
        },
    },
    getters: {
        getTaskData: state => {
            return state.tasks;
        },
        getTaskById: (state) => (taskId) => {
            return state.tasks.find(task => task.id === taskId);
        },
    },
};