<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
//PrimeVue
//components
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';
import SelectProgramLanguage from '../../components/maker/SelectProgramLanguage.vue';
import StepMenu from '../../components/maker/StepMenu.vue';
import ButtonGroup from '../../components/maker/ButtonGroup.vue';
import SelectCheckBoxTask from '../../components/maker/SelectCheckBoxTask.vue';




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

function asd(a) {
    console.log('asd:')
    console.log(a)
}


</script>
<template>
    <StepMenu />
    {{ store.getters.getTask }}
    <div v-for="task in store.getters.getTask" :key="task.side">
        <div v-if="task.side == store.getters.getCurrentSide" class="flex justify-content-center flex-wrap ">
            <div class=" border-round border-1 surface-border mt-5 mb-3 p-4" style="width: 1700px">
                <div>
                    <div class="flex justify-content-between flex-wrap">
                        <h2>{{ task.side }}. Oldal</h2>
                        <ButtonGroup />
                    </div>
                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                        {{ task.text }}
                        <Editor v-tooltip.top="'ide írja le a feladathoz tartozó szöveget'" v-model="task.text"
                            editorStyle="height: 400px;" class="m-5" />
                    </div>
                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                        <SelectProgramLanguage v-model="task.programmingLanguageName" />
                        <div v-if="task.programmingLanguageName">
                            <CodeRunner
                                v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                :code="task.code" v-model:changeCode="task.code"
                                :selectLanguage="task.programmingLanguageName.value" />
                            <SelectCheckBoxTask v-if="task.programmingLanguageName.value == 'checkbox'" />
                        </div>
                    </div>
                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-8 mb-3 p-4 ">
                        <TestCasesTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>