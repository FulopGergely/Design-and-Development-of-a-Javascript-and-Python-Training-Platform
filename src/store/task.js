export default {
    state() {
        return {
            currentSide: 0, //jelenlegi oldal ahol éppen állunk, localstorage
            tasks: [//ezt fogjuk tárolni firebase-en (kivéve icon)
                {
                    side: 1, //oldal szám, 1 től indul
                    programmingLanguageName: 'javascript',
                    text: '', //feladat szövege html formátumban
                    code: `function myFunction( p1 ) { \nreturn p1\n}`,
                    result: '',
                    testResult: '',
                    icon: '', //StepMenu componens gondoskodik arról h ahány obj annyi oldal jöjjön létre. 
                    //Ha teszünk ide icont akkor az oldalszám helyett icont tesz be, score-al együtt kéne tárolni, icont nem szükséges szerveren tárolni.
                    score: [], //hány pontot ér ez a feladat
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
    },
    getters: {
        getCurrentSide(state) {
            return state.currentSide;
        },
        getTask: state => {
            return state.tasks;
        },
        getTaskById: (state) => (taskId) => {
            return state.tasks.find(task => task.id === taskId);
        },
    },
};