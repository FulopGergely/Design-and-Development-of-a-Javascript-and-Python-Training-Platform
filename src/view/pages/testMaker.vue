<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import store from '@/store/store.js';
//PrimeVue
//components
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';
import SelectProgramLanguage from '../../components/maker/SelectProgramLanguage.vue';
import StepMenu from '../../components/maker/StepMenu.vue';
import ButtonGroup from '../../components/maker/ButtonGroup.vue';




/*function setTask() {
    // Feladat mentése vagy további logika
    store.commit('setTask', text.value);
}*/
/*
const getCode = computed(() => {
        return store.getters.getCode
});
const currentCode = ref(getCode.value);*/

//const text = ref(store.getters.task[0].text); //html szöveg tartalma a feladathoz

const setTask = (value) => {
    store.commit('setTask', { text: value });
};







function asd() {
    console.log('load')
}



</script>
<template>
    {{ store.getters.getTask }}
    <StepMenu />
    <div v-for="task in store.getters.getTask" :key="task.side">
        <div v-if="task.side == store.getters.getCurrentSide" class="flex justify-content-center flex-wrap ">
            <div class="fadeinright animation-duration-500 border-round border-1 surface-border mt-5 mb-3 p-4"
                style="width: 1700px">
                <div>
                    <div class="flex justify-content-between flex-wrap">
                        <h2>{{ task.side }}. Oldal</h2>
                        <ButtonGroup />
                    </div>
                    <div class="border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                        <Editor v-tooltip.top="'ide írja le a feladathoz tartozó szöveget'" v-model="text"
                            editorStyle="height: 400px;" class="m-5" />
                    </div>
                    <div class="border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                        <SelectProgramLanguage />
                        <CodeRunner />
                    </div>
                    <div class="border-round border-1 surface-border surface-ground mt-8 mb-3 p-4 ">
                        <TestCasesTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>