<script setup>
import store from '@/store/store.js';
import { getAllTest, addTest } from '@/firebase/test.js';
import { auth } from '@/firebase/google.js';
import { ref, onMounted } from 'vue';

import { useToast } from "primevue/usetoast";
const toast = useToast();

const testName = ref('')
const testTime = ref(0)

onMounted(() => {
    console.log(store.getters.getLoading)
});

//addTest(uid, tid, available, private, task, testDurationMinutes)
async function createTest() {
    store.commit('setLoading', false) //testMaker komponensbe állítjuk, <toast> üzenet is ott van
    if (!testName.value) {
        toast.add({ severity: 'error', summary: 'Hiba', detail: 'Kérem adjon nevet a tesztnek' });
    } else {
        const allTest = await getAllTest() //összes tesztet lekéri
        if (!allTest.some(test => test.tid === testName.value)) {
            const error = await addTest(auth.currentUser.uid, testName.value, false, store.getters.getTask, testTime.value)
            if (error) {
                toast.add({ severity: 'error', summary: 'Hiba', detail: 'Teszt mentése sikertelen\n\n' + error });
            } else {
                toast.add({ severity: 'success', summary: 'Teszt mentése sikeres', detail: '' + testName.value + ' teszt mentése sikeres', life: 5000 });
            }
        } else {
            toast.add({ severity: 'error', summary: 'Hiba', detail: 'Teszt mentése sikertelen\n\n A(z) "' + testName.value + '" teszt már létezik, kérem más nevet adjon meg' });
        }
    }
    store.commit('setLoading', true)
}
const isInvalid = false
</script>
<template>
    <div>
        <div class="field">

            <InputGroup class="mt-5">
                <InputGroupAddon>https://progmester.hu/</InputGroupAddon>
                <InputText placeholder="Teszt neve" v-tooltip.top="'teszt egyedi azonosítója'" type="text"
                    v-model="testName" :class="{ 'invalid': isInvalid }" required />

            </InputGroup>

        </div>
        <div class="field">
            <InputGroup class="mt-5">
                <InputGroupAddon>Teszt ideje</InputGroupAddon>
                <InputText v-tooltip.top="'Hány percig tartson a teszt?\n(0 percnél korlátlan)'" type="number"
                    v-model="testTime" />
            </InputGroup>
        </div>
        <div>
            <Message style="height: 50%;">Tesztet a mentés után a "Tesztjeim" menüpontban lehet elérhetővé
                tenni</Message>
        </div>



        <div class="flex justify-content-end mt-7">
            <Button @click="createTest()">Teszt létrehozása</Button>
        </div>
    </div>
</template>

<style>
.invalid {
    border-color: red;
    /* vagy más érvénytelen stílus */
}
</style>
