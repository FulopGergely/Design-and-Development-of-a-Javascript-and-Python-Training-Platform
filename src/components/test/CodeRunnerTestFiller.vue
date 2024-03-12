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

const props = defineProps({
    taskCode: {
        type: String,
        default: () => ''
    },
    selectLanguage: {
        type: String,
        default: () => ''
    },
    tests: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['update:taskCode'])

const py = inject('py');
const result = ref()
const logs = ref([]);
const code = ref(props.taskCode)
//const params = ()
const selectLanguage = ref(props.selectLanguage);

onMounted(() => {

    console.log(props.tests)
});

watch(() => props.selectLanguage, (newValue, oldValue) => {
    selectLanguage.value = newValue;
    cmOptions.value.mode = selectLanguage.value == 'javascript' ? "text/javascript" : "text/x-python"
});

const cmOptions = ref({
    mode: selectLanguage.value == 'javascript' ? "text/javascript" : "text/x-python", // Language mode
    theme: "dracula", // Theme
});
function codeChange(e) {
    emit('update:taskCode', e)
    code.value = e
}
function clearTerminal() {
    logs.value = []
}
async function runcode() {
    let params = []
    try {
        params = props.tests[store.getters.getCurrentTestSide - 1].parameters
    } catch (error) {
        console.log(error)
    }
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }
    if (selectLanguage.value == 'javascript') {
        try {
            let results = props.tests.map(test => {
                const dynamicFunction = new Function('return ' + code.value)();
                //console.log(dynamicFunction);
                return dynamicFunction(...test.parameters);
            });
            store.commit('setResults', results)
            console.log(results);
        } catch (error) {
            console.log(error);
        }
        console.log = oldConsoleLog;
    }
    if (selectLanguage.value == 'python') {
        try {
            props.tests.map(test => {
                console.log(test.parameters)
            });
            const res = await py.run(code.value + addStringToEndOfThePythonCode());
            //console.log(res)
            for (const output of py.log.value.stdOut) {
                console.log(output);
            }
            if (res.error != null) {
                //console.log(res.error.split('\n').slice(8).join('\n').substring(16)); // delete the beginning of an error message
                console.log(res.error)
            } else {
                result.value = res.results
                console.log(result.value);
            }
        } catch (error) {
            console.error('Error:', error);
        }


        console.log = oldConsoleLog;

    }
    console.log = oldConsoleLog;
    //console.log(result)
}
function addStringToEndOfThePythonCode() {
    let arr = []
    const functionName = code.value.replace(/^(def|\s+def)\s+/, '').match(/\w+/)[0];
    //console.log(props.tests[store.getters.getCurrentTestSide - 1])
    if (props.tests[store.getters.getCurrentTestSide - 1]) {
        const params = props.tests[store.getters.getCurrentTestSide - 1].parameters
        const parametersType = props.tests[store.getters.getCurrentTestSide - 1].parametersType
        for (let i = 0; i < params.length; i++) {
            if (parametersType[i] == 'string') {
                arr.push(params[i])
            }
            if (parametersType[i] == 'number') {
                arr.push(parseInt(params[i]))
            }
            if (parametersType[i] == 'boolean') {
                if (params[i]) {
                    arr.push('True')
                } else {
                    arr.push('False')
                }
            }
            if (parametersType[i] == 'JSON') {
                arr.push(params[i])
            }
        }
        return '\n' + functionName + '(' + arr + ')'
    } else {
        return '\n' + functionName + '()'
    }

}

</script>
<template>
    <div>
        {{ store.state.test.codeUser }}
        <div class="ml-5 mr-5 mt-2" v-tooltip.top="'Írja le a megodlás kódját'">
            <Codemirror class="CodeMirror" v-model:value="code" :options="cmOptions" border :height="200"
                @change="codeChange($event)" />
        </div>
        <div class="grid">
            <div class="col-7">

                <div>
                    <Button @click="runcode()" class="mb-2 mt-2 ml-5">Futtatás</Button>
                    <!--  <ResultTable :js-result="result" @params-change="paramsChange" />   -->

                </div>

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