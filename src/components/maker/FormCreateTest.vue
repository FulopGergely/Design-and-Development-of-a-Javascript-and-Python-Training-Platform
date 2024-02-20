<script setup>
import store from '@/store/store.js';
import { getAllTest, addTest } from '@/firebase/test.js';
import { auth } from '@/firebase/google.js';
import { ref, onMounted } from 'vue';

const testName = ref('')
const testTime = ref(0)

onMounted(() => {

});

//addTest(uid, tid, available, private, task, testDurationMinutes)
function createTest() {
    addTest(auth.currentUser.uid, testName.value, false, true, store.getters.getTask, testTime.value)
}

</script>
<template>
    <div class="field">
        <label>Teszt neve</label>
        <InputText v-tooltip.top="'teszt egyedi azonosítója'" type="text" v-model="testName" invalid
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
    </div>
    <div class="field">
        <label>Teszt ideje</label>
        <InputText v-tooltip.top="'hány percig tartson a teszt?'" type="number" v-model="testTime"
            :class="{ 'invalid': !testTime }"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
    </div>
    <div class="flex justify-content-end mt-3">
        <Button @click="createTest()">Teszt létrehozása</Button>
    </div>
</template>
