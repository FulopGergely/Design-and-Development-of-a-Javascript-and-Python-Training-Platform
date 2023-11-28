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
const someReactiveRef = ref(store.getters.task)

const text = computed({
    get() {
        return someReactiveRef.value
    },
    set(val) {
        store.commit('setTask', val)
    }
})
*/







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
                        <Editor v-tooltip.top="'ide írja le a feladathoz tartozó szöveget'" v-model="task.text"
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