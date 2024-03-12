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
    store.commit('setLoading', true) //testMaker komponensbe állítjuk, <toast> üzenet is ott van
    if (!testName.value) {
        toast.add({ severity: 'error', summary: 'Hiba', detail: 'Nincs kitöltve a mező' });
    } else {
        const allTest = await getAllTest() //összes tesztet lekéri
        if (!allTest.some(test => test.tid === testName.value)) {
            const error = await addTest(auth.currentUser.uid, testName.value, false, true, store.getters.getTask, testTime.value)
            if (error) {
                toast.add({ severity: 'error', summary: 'Hiba', detail: 'Teszt mentése sikertelen\n\n' + error });
            } else {
                toast.add({ severity: 'success', summary: 'Teszt mentése sikeres', detail: '' + testName.value + ' teszt mentése sikeres', life: 5000 });
            }
        } else {
            toast.add({ severity: 'error', summary: 'Hiba', detail: 'Teszt mentése sikertelen\n\n' + testName.value + ' teszt már létezik' });
        }
    }
    store.commit('setLoading', false)
}
const isInvalid = false
</script>
<template>
    <div>
        <div class="field">
            <label>Teszt neve</label>
            <InputText v-tooltip.top="'teszt egyedi azonosítója'" type="text" v-model="testName"
                :class="{ 'invalid': isInvalid }" invalid required
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
        </div>
        <div class="field">
            <label>Teszt ideje</label>
            <InputText v-tooltip.top="'hány percig tartson a teszt?\n(0 percnél korlátlan)'" type="number"
                v-model="testTime" :class="{ 'invalid': !testTime }"
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
        </div>
        <div class="flex justify-content-end mt-3">
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
