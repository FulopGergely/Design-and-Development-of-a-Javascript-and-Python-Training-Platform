//Tesztkitöltésnél a bejelentkezés után itt tároljuk el a firebesa-ről lekért adatot
// hogy ne kelljen mindig lekérni szerverről, vuexben tárolom ami kell. (másolatot)
export default {
    state() {
        return {
            currentTestSide: 0, //segédváltozó, jelenlegi oldalt ahol épp állunk.
            loading: false, //segédváltozó, oldal async betöltése miatt
            testSheet: [], //teszt kérdéssor, lekérjük, másolatot készítünk, és ezt használjuk. a code-ot betöltéskor módosítjuk (initTest-nél testID.vue)
            testDurationMinutes: 99999, //lekért adat
            scoreEarned: [], //megszerzett pontszám (pl 0 ás indexű az első feladat elért pontszáma)
            timer: 0,
            //finishedTest: false, //ha tesztet befejezi valaki akkor állítódik át
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
        setDisplayTest(state, isDisplay) {
            state.testSheet.task[state.currentTestSide - 1].displayTest = isDisplay
        },
        addTestSheet(state, test) {
            state.testSheet = test
        },
        setResults(state, results) {
            state.testSheet.task[state.currentTestSide - 1].output = results
        },
        setScoreEarned(state, score) {
            state.scoreEarned[state.currentTestSide - 1] = score
            state.testSheet.task[state.currentTestSide - 1].icon = "pi pi-check"
            // helyes válasz esetént átírjuk pipára a feladat sorszámát
        },
        setTestDurationMinutes(state, time) {
            console.log('rtx')
            state.testDurationMinutes = time //lekérjük egyszer szerverről honnna induljon az időzítés
        },
        startCountdown(state) {
            //clearInterval(timer)

            console.log('startCountdown:')
            console.log(state.testDurationMinutes)
            clearInterval(state.timer)
            state.timer = setInterval(() => {
                state.testDurationMinutes--;
                console.log(state.testDurationMinutes)
                if (state.testDurationMinutes === 0) {
                    clearInterval(state.timer);
                    // Itt tudsz bármilyen logikát hozzáadni, amit a visszaszámlálás befejezésekor akarsz végrehajtani
                }
            }, 1000);
        },
        /*setTimer(state, time) {
            state.timer = time
        }*/
    },
    getters: {
        getCurrentTestSide(state) {
            return state.currentTestSide < 1 ? 1 : state.currentTestSide;
        },
        getLoading: (state) => state.loading,
        getDisplayTest: state => { //segédváltozó hogy a tesztesetek tábla látszódjon, utólag a test.ID ba tesszük be a testheetbe. Feladatonként változik futtatás után true-ra az érték.
            //console.log(state.testSheet.task[state.currentTestSide - 1])
            if (state.testSheet.task[state.currentTestSide - 1] && state.testSheet.task[state.currentTestSide - 1].isTest && state.testSheet.task[state.currentTestSide - 1].tests.length != 0) {
                //console.log(state.testSheet.task[state.currentTestSide - 1].tests.length)
                return state.testSheet.task[state.currentTestSide - 1].displayTest
            }
        },
        getTestSheet: state => {
            return state.testSheet;
        },
        getTestBySide: state => {
            //console.log(state.testSheet.task[state.currentTestSide - 1].tests)
            return state.testSheet.task[state.currentTestSide - 1].tests
        },
        getScoreBySide: state => {
            if (state.testSheet.task[state.currentTestSide - 1]) {
                return state.testSheet.task[state.currentTestSide - 1].score
            }
        },
        getScoreEarned: state => {
            return state.scoreEarned
        },
        getTimer: state => {
            return state.timer
        },
        getTestDurationMinutes: state => {
            const minutes = Math.floor(state.testDurationMinutes / 60);
            const remainingSeconds = state.testDurationMinutes % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        },
    },
};