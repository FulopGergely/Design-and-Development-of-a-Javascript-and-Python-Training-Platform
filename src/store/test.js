//Tesztkitöltésnél a bejelentkezés után itt tároljuk el a firebesa-ről lekért adatot
// hogy ne kelljen mindig lekérni szerverről, vuexben tárolom ami kell. (másolatot)
export default {
    state() {
        return {
            currentTestSide: 0, //segédváltozó, jelenlegi oldalt ahol épp állunk.
            loading: false, //segédváltozó, oldal async betöltése miatt
            testSheet: [], //teszt kérdéssor, lekérjük, másolatot készítünk, és ezt használjuk. a code-ot betöltéskor módosítjuk (initTest-nél testID.vue)
            testDurationMinutes: 9999999, //lekért adat
            //ezeket csak vuex-ben tároljuk, amit a tesztkiktöltő beír adatok ezek:
            // legyenek egy tömbben?
            //testSheet-hez adjunk hozzá egy expectedResult-ot, és egy resultot
        };
    },
    mutations: {
        setCurrentTestSide(state, currentTestSide) {
            state.currentTestSide = currentTestSide;
        },
        setLoading(state, isLoading) {
            state.loading = isLoading;
        },
        addTestSheet(state, test) {
            state.testSheet = test
        },
        setResults(state, results) {
            state.testSheet.task[state.currentTestSide - 1].output = results
        },
    },
    getters: {
        getCurrentTestSide(state) {
            return state.currentTestSide;
        },
        getLoading: (state) => state.loading,
        getTestSheet: state => {
            return state.testSheet;
        },
        getTestBySide: state => {
            //console.log(state.testSheet.task[state.currentTestSide - 1].tests)
            return state.testSheet.task[state.currentTestSide - 1].tests
        },
    },
};