<script setup>
import store from '@/store/store.js';
import { getAllTest, addTest } from '@/firebase/test.js';
import { ref, onMounted } from 'vue';


onMounted(() => {
    console.log(getAllTest())
});

//addTest(uid, tid, password, task, testDurationMinutes)
function createTest() {
    addTest(1, 1, 'jelszo', store.getters.getTask, 10)
}

</script>
<template>
    <div class="field">
        <label>Teszt neve</label>
        <InputText v-tooltip.top="'teszt egyedi azonosítója'" type="text" v-model="testName"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
    </div>
    <div class="field">
        <label>Jelszó</label>
        <InputText type="password" v-model="password"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
    </div>
    <div class="field">
        <label>Jelszó újra</label>
        <InputText type="password" v-model="password"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
    </div>
    <div class="field">
        <label>Teszt ideje</label>
        <InputText v-tooltip.top="'hány percig tartson a teszt?'" type="text" v-model="testTime"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
    </div>


    <div class="flex justify-content-end mt-3">
        <Button @click="createTest()">Teszt létrehozása</Button>
    </div>
</template>
