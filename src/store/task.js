export default {
    state() {
        return {
            currentSide: 0, //jelenlegi oldal ahol éppen állunk, localstorage
            tasks: [//ezt fogjuk tárolni firebase-en (kivéve icon)
                {
                    side: 1, //oldal szám, 1 től indul
                    programmingLanguageName: null,
                    text: '', //feladat szövege html formátumban
                    code: ``,
                    result: '',
                    testResult: '',
                    icon: '', //StepMenu componens gondoskodik arról h ahány obj annyi oldal jöjjön létre. 
                    //Ha teszünk ide icont akkor az oldalszám helyett icont tesz be, score-al együtt kéne tárolni, icont nem szükséges szerveren tárolni.
                    score: [], //hány pontot ér ez a feladat
                    params: [{ id: 1, value: null }, { id: 2, value: null }, { id: 3, value: null }], //feladathoz tartozó praméterek, ez is localstorage csak?
                }
            ],
        };
    },
    mutations: {
        setCurrentSide(state, currentSide) {
            state.currentSide = currentSide;
        },
        addTask(state, obj) {
            state.tasks.push(obj);
        },
        addParam(state, obj) {
            state.tasks[state.currentSide - 1].params.push(obj)
        },
        setTask(state, updatedTask) {
            console.log(updatedTask)
            console.log(state.currentSide)
            if (state.currentSide - 1 >= 0 && state.currentSide - 1 < state.tasks.length) {
                state.tasks[state.currentSide - 1] = updatedTask;
            } else {
                console.error('Invalid index for setTask mutation');
            }
        },
        deleteTask(state, index) {
            state.tasks.splice(index, 1);
            let i = 1
            for (const task of state.tasks) {
                task.side = i
                i++
            }
        },
        deleteParam(state, id) {
            state.tasks[state.currentSide - 1].params.splice(id - 1, 1);
            let i = 1
            for (const param of state.tasks[state.currentSide - 1].params) {
                param.id = i
                i++
            }
        },
    },
    getters: {
        getCurrentSide(state) {
            return state.currentSide;
        },
        getTask: state => {
            return state.tasks;
        },
        getParamsByCurrentSide: state => {
            return state.tasks[state.currentSide - 1].params;
        },
        getTaskById: (state) => (taskId) => {
            return state.tasks.find(task => task.id === taskId);
        },
    },
};