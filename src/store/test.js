//Tesztkitöltésnél a bejelentkezés után itt tároljuk el a firebesa-ről lekért adatot
// hogy ne kelljen mindig lekérni szerverről, vuexben tárolom ami kell.
export default {
    state() {
        return {
            currentTestSide: 0,
            loading: false,
            tid: '', //testID azonosítója
            testSheet: [], //teszt kérdéssor
            testDurationMinutes: 9999999,
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

    },
    getters: {
        getCurrentTestSide(state) {
            return state.currentTestSide;
        },
        getLoading: (state) => state.loading,
        getTestSheet: state => {
            return state.testSheet;
        },

    },
};