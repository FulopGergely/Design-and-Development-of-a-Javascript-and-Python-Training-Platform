<script setup>
import store from '@/store/store.js';
import { getAllTest, addTest, updateTest } from '@/firebase/test.js';
import { auth } from '@/firebase/google.js';
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();


const difficultyList = ref([
    { name: '1 - könnyű' },
    { name: '2 - közepes' },
    { name: '3 - nehéz' },
    { name: '4 - profi' },
]);




const testName =    ref(store.getters.getTest?.[0]?.tid ?? '')
const testTime =    ref(store.getters.getTest?.[0]?.testDurationMinutes ?? 10)
const difficulty =  ref(store.getters.getTest?.[0]?.difficulty ?? { name: '2 - közepes' })
const details =     ref(store.getters.getTest?.[0]?.details ?? '')




onMounted(() => {

});
async function createTest() {
    store.commit('setLoading', false) //testMaker komponensbe állítjuk, <toast> üzenet is ott van
    if (!testName.value) {
        toast.add({ severity: 'error', summary: 'Hiba', detail: 'Kérem adjon nevet a tesztnek' });
    } else {
        const allTest = await getAllTest() //összes tesztet lekéri
        if (!allTest.some(test => test.tid === testName.value)) {
            testTime.value <= 0 && testTime.value >= 28800 ? testTime.value : testTime.value = 30
            !difficulty.value ? difficulty.value = '2 - közepes' : difficulty.value
            const error = await addTest(auth.currentUser.uid, testName.value, true, store.getters.getTask, testTime.value, details.value, difficulty.value)
            if (error) {
                toast.add({ severity: 'error', summary: 'Hiba', detail: 'Teszt mentése sikertelen\n\n' + error });
                console.log(error);
            } else {
                toast.add({ severity: 'success', summary: 'Teszt mentése sikeres', detail: '' + testName.value + ' teszt mentése sikeres', life: 5000 });
            }
        } else if(allTest.some(test => test.tid === testName.value) && allTest.some(test => test.uid === store.getters.getCurrentUser.uid)) { //módosítás
            const error = await updateTest(testName.value, true, store.getters.getTask, testTime.value, details.value, difficulty.value)
            if (error) {
                console.log(error);
                toast.add({ severity: 'error', summary: 'Módosítás sikertelen', detail: '' + testName.value + ' teszt módosítása sikertelen:' + error , life: 5000 });
            }else{
                toast.add({ severity: 'success', summary: 'Módosítás sikeres', detail: '' + testName.value + ' teszt módosítása sikeres', life: 5000 });
                store.commit('resetTasks')
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
                <InputText v-tooltip.top="'Hány percig tartson a teszt?\n'" type="number"
                    v-model="testTime" required min="1" />
            </InputGroup>
        </div>


        <div class="field">

        <InputGroup class="mt-5">
            <InputGroupAddon>Nehézségi szint</InputGroupAddon>
            <Dropdown v-model="difficulty" placeholder="válasszon nehézségi szintet" 
                            :options="difficultyList"
                             optionLabel="name" required/>

        </InputGroup>

        </div>

        <div class="field">

        <InputGroup class="mt-5">
            <InputGroupAddon>Leírás</InputGroupAddon>
            <Textarea v-model="details" variant="filled" rows="5" cols="30" />

        </InputGroup>

        </div>

        <div>
            <Message style="height: 50%;">A teszt "Saját tesztek" menüpontban módosítható, és inaktiválható (akkor másoknak nem listázza a "tesztek" menüpontban)</Message>
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
