//Tesztkitöltésnél a bejelentkezés után itt tároljuk el a firebesa-ről lekért adatot
// hogy ne kelljen mindig lekérni szerverről, vuexben tárolom ami kell. (másolatot)
import { addScore } from '@/firebase/score.js';
export default {
    state() {
        return {
            currentTestSide: 0, //segédváltozó, jelenlegi oldalt ahol épp állunk.
            testSheet: [], //teszt kérdéssor, lekérjük, másolatot készítünk, és ezt használjuk. a code-ot betöltéskor módosítjuk (initTest-nél testID.vue)
            testDurationMinutes: 99999, //lekért adat
            scoreEarned: [], //megszerzett pontszám (pl 0 ás indexű az első feladat elért pontszáma)
            timer: 0, //felfele mérjük az időt, kivonjuk a testDurationMinutes-ból, az adja meg a jelenlegi időt.
            finishedTest: false, //ha tesztet befejezi valaki akkor állítódik át
            //ezeket csak vuex-ben tároljuk, amit a tesztkiktöltő beír adatok ezek:
            // legyenek egy tömbben?
            //testSheet-hez adjunk hozzá egy expectedResult-ot, és egy resultot
        };
    },
    mutations: {
        setCurrentTestSide(state, currentTestSide) {
            state.currentTestSide = currentTestSide;
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
            state.testDurationMinutes = time //hány perces a teszt, azt állítjuk be. (teszt indításnál fut le 2 helyen (tesztek fülön lévő kattintásnál, és bejelentkezésnél ha nincs bejelnetkezve és úgy próbálja elindítani linket keresztül a tesztet))
        },
        setTimer(state, time) {
            state.timer = time //hány perces a teszt, azt állítjuk be. (teszt indításnál fut le 2 helyen (tesztek fülön lévő kattintásnál, és bejelentkezésnél ha nincs bejelnetkezve és úgy próbálja elindítani linket keresztül a tesztet))
        },
        startCountdown(state) {
            console.log('startCountdown:')
            //clearInterval(state.timer)
            console.log(state.timer)
            console.log(state.testDurationMinutes)
            if (state.timer < state.testDurationMinutes) {
                state.timer++; //frissítéskor csökkentjük a számlálót
                let time = setInterval(() => { //let time azért kell hogy le tudjuk állítani a clearInterval-el az időzítőt.
                    state.timer++;
                    if (state.timer >= state.testDurationMinutes) {
                        console.log('lejárt az időőő')
                        clearInterval(time);
                    }
                }, 1000);
            } else { //ha lejárt az időzítő 1 szer fog belemenni else-be, 0:00 ál
                console.log('lejárt az idő...')
                //state.timer = 0
                /*state.finishedTest = true
                const now = new Date();
                addScore(this.getTestSheet.uid, this.getTestSheet.tid, props.scoreAchieved, now)*/
            }

        },
    },
    getters: {
        getCurrentTestSide(state) {
            return state.currentTestSide < 1 ? 1 : state.currentTestSide;
        },
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
            const totalSeconds = state.testDurationMinutes - state.timer;
            const minutes = Math.floor(totalSeconds / 60);
            const remainingSeconds = totalSeconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        },
        getFinishedTest: state => {
            return state.finishedTest
        },
    },
};