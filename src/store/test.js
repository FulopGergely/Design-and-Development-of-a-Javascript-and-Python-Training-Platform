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
            rating: {}, //jelenglegi uid, és rating érték párokat tárol, rating értéke lehet -1,0,1. 
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
            state.testDurationMinutes = time //lekérjük egyszer szerverről honnna induljon az időzítés
        },
        setTimer(state, time) { //hány perces a teszt (2 helyen fut le)
            if (time > state.testDurationMinutes) {
                state.timer = state.testDurationMinutes
            } else {
                state.timer = time
            }
        },
        startCountdown(state) {
            // frissítéskor ne fusson párhuzamosan több időzítő
            if (state.timeIntervalId) {
                clearInterval(state.timeIntervalId);
            }
            if (state.timer <= state.testDurationMinutes) {
                //state.timer++; // frissítékor "büntetés" idő növelését nem itt, hanem testID.vue ban csináljuk, mert itt valamiért 2 másodpercet von le
                state.timeIntervalId = setInterval(() => {
                    if (state.timer >= state.testDurationMinutes) {
                        state.timer = state.testDurationMinutes
                        clearInterval(state.timeIntervalId);
                    } else {
                        state.timer++;
                    }
                }, 1000);

            }
        },
        resetStates(state) {
            state.testSheet = []; //töröljük ha testSheet array-t
            state.scoreEarned = []
            state.testDurationMinutes = 99999

        },
        setRating(state, ratingMap) {
            console.log(JSON.stringify(ratingMap, null, 2));
            
            state.rating = ratingMap
        }
    },
    getters: {
        getCurrentTestSide(state) {
            return state.currentTestSide < 1 ? 1 : state.currentTestSide;
        },
        getLoading: (state) => state.loading,
        getDisplayTest: state => { //segédváltozó hogy a tesztesetek tábla látszódjon, utólag a test.ID ba tesszük be a testheetbe. Feladatonként változik futtatás után true-ra az érték.
            if (state.testSheet.task[state.currentTestSide - 1] && state.testSheet.task[state.currentTestSide - 1].isTest && state.testSheet.task[state.currentTestSide - 1].tests.length != 0) {
                return state.testSheet.task[state.currentTestSide - 1].displayTest
            }
        },
        getTestSheet: state => {
            return state.testSheet;
        },
        getTestBySide: state => {
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
            return state.testDurationMinutes
        },
        getRating: state => {
            return state.rating
        }
    },
};