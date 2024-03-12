<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
//PrimeVue

//hljs
import hljs from 'highlight.js';

//components
import NavBar from '@/components/home/NavBar.vue'
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';
import SelectProgramLanguage from '../../components/maker/SelectProgramLanguage.vue';
import StepSide from '../../components/maker/StepSide.vue';
import ButtonGroup from '../../components/maker/ButtonGroup.vue';


/*
const highlightedCode = hljs.highlight('javascript', `console.log('starting script');
const a = 1;
const b = 2;
console.log(a+b);`).value;*/
const user = 'testCreator'
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
    <NavBar :user="user" />
    <Toast />
    {{ store.getters.getTask }}
    <div v-if="!store.getters.getLoading">
        <StepSide :tasks="store.getters.getTask" :currentSide="'setCurrentSide'" />
        <div v-for="task in store.getters.getTask" :key="task.side">
            <div v-if="task.side == store.getters.getCurrentSide" class="flex justify-content-center flex-wrap ">
                <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
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
                        <div v-if="task.programmingLanguageName"
                            class="fadein animation-duration-500 border-round border-1 surface-border mt-8 mb-8 p-4 ">
                            <TestCasesTable :code="task.code" :selectLanguage="task.programmingLanguageName.value" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <BlockUI :blocked="!store.getters.getLoading" fullScreen />
        <div class="flex justify-content-center flex-wrap">
            <ProgressSpinner />
        </div>

    </div>
</template>

<style scoped></style>