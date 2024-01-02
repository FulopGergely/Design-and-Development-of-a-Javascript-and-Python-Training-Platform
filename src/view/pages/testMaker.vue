<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
//PrimeVue

//hljs
import hljs from 'highlight.js';

//components
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';
import SelectProgramLanguage from '../../components/maker/SelectProgramLanguage.vue';
import StepMenu from '../../components/maker/StepMenu.vue';
import ButtonGroup from '../../components/maker/ButtonGroup.vue';
import SelectCheckBoxTask from '../../components/maker/SelectCheckBoxTask.vue';


/*
const highlightedCode = hljs.highlight('javascript', `console.log('starting script');
const a = 1;
const b = 2;
console.log(a+b);`).value;*/

onMounted(() => {

});

const myQuillEditor = ref('')

const options = ref({
    modules: {
        syntax: {
            highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            [{ 'align': [] }],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],


            ['code-block'],
            ['image'],
            ['link'],

        ]

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
                        <QuillEditor ref="myQuillEditor" theme="snow" :options="options" contentType="html"
                            v-model:content="task.text" />
                    </div>
                    <!--  <div class="ql-editor" v-html="task.text"></div>   -->
                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                        <SelectProgramLanguage v-model="task.programmingLanguageName" />

                        <div v-if="task.programmingLanguageName">
                            <CodeRunner
                                v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                v-model:taskCode="task.code" :selectLanguage="task.programmingLanguageName.value" />

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