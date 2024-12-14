export default {
    state() {
        return {
            currentSide: 0, //jelenlegi oldal ahol éppen állunk tesztlétrehozásakor, localstorage. Segédváltozó, ez mutatja azt hogy melyik oldal aktív.
            tasks: [//ezt fogjuk tárolni firebase-en (kivéve icon), tasks[0] - 1 lap értékeit tárolja
                {
                    side: 1, //oldal szám, 1 től indul
                    programmingLanguageName: null,
                    text: '', //feladat szövege html formátumban
                    code: ``,
                    //result: {}, //kivettem, mert tests[]-ben tárolom firebase-en a végeredeményt típussal együtt. itt tároljuk a végeredeményt a typussal együtt, firebase-en: {result: asd, type: string}
                    tests: [], //itt tárolunk mindent ami a tesztesethez kelleni fog, firebase. { "parameters": [ "asd", 12 ], "result": "asd", "parametersType": [ "string", "number" ], "resultType": "string" } ], {}, stb (ezt minden komponensnél kicist átalakítva jelenítsük meg, de "nyersen" így tároljuk)
                    icon: '', //StepMenu componens gondoskodik arról h ahány obj annyi oldal jöjjön létre. 
                    //Ha teszünk ide icont akkor az oldalszám helyett icont tesz be
                    score: 0, //hány pontot ér ez a "lap" feladat (0-ra inic).
                    params: [], //primeVue megjelenítése miatt kellett(kiválasztani a paramétert), tests[] ben tárolunk mindent firebase-en, típust érétkeket is. params[]-ban minden egyes paraméter 1 object kell hogy legyen, hogy jól jelenítse meg a paraméter hozzáadását a PrimeVue.
                    isTest: false, //tesztesetek ki/be kapcsolása, ha ki van kapcsolva nem jár pont a feladatért.
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
        addTest(state, obj) {
            state.tasks[state.currentSide - 1].tests.push(obj)
        },
        setTask(state, updatedTask) {
            if (state.currentSide - 1 >= 0 && state.currentSide - 1 < state.tasks.length) {
                state.tasks[state.currentSide - 1] = updatedTask;
            } else {
                console.error('Invalid index for setTask mutation');
            }
        },
        setTasks(state, updatedTasks) {
            state.tasks = updatedTasks
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
        deleteTestCase(state, id) {
            state.tasks[state.currentSide - 1].tests.splice(id - 1, 1);
            let i = 1
            for (const test of state.tasks[state.currentSide - 1].tests) {
                test.id = i
                i++
            }
        },
        isTest(state, bool) {
            state.tasks[state.currentSide - 1].isTest = bool
        },
        setScore(state, score) {
            state.tasks[state.currentSide - 1].score = score
        },
    },
    getters: {
        getCurrentSide(state) {
            return state.currentSide < 1 ? 1 : state.currentSide;
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
        getTestsCases: state => {
            return state.tasks[state.currentSide - 1].tests;
        },
        getIsTest: state => {
            return state.tasks[state.currentSide - 1].isTest;
        },
        getScore: state => {
            return state.tasks[state.currentSide - 1].score;
        },
        getLanguage: state => {
            return state.tasks[state.currentSide - 1].programmingLanguageName;
        },
    },
};