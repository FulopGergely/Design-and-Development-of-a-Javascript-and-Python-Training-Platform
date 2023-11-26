export default {
    state() {
        return {
            name: '', //primary key, ez azonosítja a test (és vele együtt) a task táblát. 1 testhez csak 1 array kérdéssor tartozik
            //de local storage-ban nincsenek táblák, csak így különítettem el, 1 adathalmazként (táblaként) felfoható.
            //mindig csak 1 "táblát" kell betölteni fortend-en.
            userId: '', //auth
            password: '',
            testDurationMinutes: 9999999,
        };
    },
    mutations: {


    },
    getters: {


    },
};