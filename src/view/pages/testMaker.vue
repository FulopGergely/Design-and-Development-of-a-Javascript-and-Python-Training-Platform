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

//hljs
import hljs from 'highlight.js';

/*
const highlightedCode = hljs.highlight('javascript', `console.log('starting script');
const a = 1;
const b = 2;
console.log(a+b);`).value;*/

import Quill from 'quill';

const emit = defineEmits(['update:taskCode'])

const quill = ref(null);

onMounted(() => {
    quill.value = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, false] }],
                ['code-block'],
                ['bold', 'italic', 'underline', 'strike'],
            ],
            syntax: {
                highlight: text => hljs.highlightAuto(text).value
            }
        },
    });


});

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

function textChange(a) {
    console.log(a)

    //emit('update:taskCode', e)
}
function customCodeBlock() {
    // Itt kezelheted a saját code-block működését
    console.log('hhhhh')
    //const quill = this.$refs.editor.quill;
    console.log(quill.value.getSelection())
}
const options = ref({
    modules: {
        syntax: {
            highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: [['code-block', 'image']]  // Include button in toolbar
    },
});

</script>
<template>
    <StepMenu />
    {{ store.getters.getTask }}
    haha
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
                        <QuillEditor theme="snow" :options="options" v-model:content="task.text" contentType="html" />
                    </div>
                    <div v-html="task.text"></div>

                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                        <SelectProgramLanguage v-model="task.programmingLanguageName" />
                        <div v-if="task.programmingLanguageName">
                            <CodeRunner
                                v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                v-model:taskCode="task.code" :selectLanguage="task.programmingLanguageName.value" />
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

<style scoped></style>