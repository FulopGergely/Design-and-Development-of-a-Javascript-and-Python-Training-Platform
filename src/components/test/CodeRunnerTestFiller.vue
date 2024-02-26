<script setup>
import store from '@/store/store.js';
import { ref, onMounted, computed, watch, inject, watchEffect } from 'vue';
//hljs
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
//Codemirror
import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/display/placeholder.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/theme/dracula.css";
//components
import Terminal from '@/components/maker/Terminal.vue'

const py = inject('py');

const props = defineProps({
    taskCode: {
        type: String,
        default: () => ''
    },
    selectLanguage: {
        type: String,
        default: () => ''
    }
})
const code = ref(props.taskCode)
const selectLanguage = ref(props.selectLanguage);

watch(() => props.selectLanguage, (newValue, oldValue) => {
    selectLanguage.value = newValue;
    cmOptions.value.mode = selectLanguage.value == 'javascript' ? "text/javascript" : "text/x-python"
});

const cmOptions = ref({
    mode: selectLanguage.value == 'javascript' ? "text/javascript" : "text/x-python", // Language mode
    theme: "dracula", // Theme
});

</script>
<template>
    <div>
        <div class="ml-5 mr-5 mt-2" v-tooltip.top="'Írja le a megodlás kódját'">
            <Codemirror class="CodeMirror" v-model:value="code" :options="cmOptions" border :height="200"
                @change="codeChange($event)" />
        </div>
        <div class="grid">
            <div class="col-7">
                <Button @click="runcode(store.getters.getParamsByCurrentSide)" class="mb-2 mt-2 ml-5">Futtatás</Button>
                <!--  <ResultTable :js-result="result" @params-change="paramsChange" />   -->

            </div>


        </div>
        <div class="ml-5 mr-5">
            <Terminal :logs-name="logs" @clearTerminal="clearTerminal" />
        </div>


    </div>
</template>
<style scoped>
.custom-area {}

.CodeMirror {
    font-family: Arial, monospace;
    font-size: 20px;
}
</style>