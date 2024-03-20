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
    const oldConsoleLog = console.log;
    console.log = function (message) {
        logs.value.push(message);
    };
    try {
        let params = props.tests[store.getters.getCurrentTestSide - 1]?.parameters || [];
        
        if (selectLanguage.value === 'javascript') {
            executeJavaScriptCode();
        } else if (selectLanguage.value === 'python') {
            await executePythonCode();
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        console.log = oldConsoleLog;
    }
}

async function executeJavaScriptCode() {
    try {
        let results = props.tests.map(test => {
            const dynamicFunction = new Function('return ' + code.value)();
            return dynamicFunction(...test.parameters);
        });
        store.commit('setResults', results);
        store.commit('setDisplayTest', true); //teszteset tábla megjelenik
        console.log(results);
    } catch (error) {
        console.log(error);
    }
}

async function executePythonCode() {
    let results = [];
    let asd = [];
    let res;
    if(props.tests.length == 0){
        res = await py.run(code.value + addStringToEndOfThePythonCode());
        results.push(res);
    } else {
        for (const test of props.tests) {
        //console.log(code.value + addStringToEndOfThePythonCode(test))
        res = await py.run(code.value + addStringToEndOfThePythonCode(test));
        asd.push(res.results)
        results.push(res);
        console.log(results)
        }
    }
        results.forEach(result => {
           
            if (result.error != null) {
                console.log(result.error);
            } else {
                result.value = result.results;
                console.log(result.value);
                if(props.tests.length != 0){
                    store.commit('setResults', asd);
                    store.commit('setDisplayTest', true); //teszteset tábla megjelenik
                }
                
            }
        });
    }

function addStringToEndOfThePythonCode(test) {
    let arr = []
    const functionName = code.value.replace(/^(def|\s+def)\s+/, '').match(/\w+/)[0];
    //console.log(props.tests[store.getters.getCurrentTestSide - 1])
    if (test) {
        const params = test.parameters
        const parametersType = test.parametersType
        //console.log(test.parameters)
        //console.log(test.parametersType)
        for (let i = 0; i < params.length; i++) {
            if (parametersType[i] == 'string') {
                arr.push( params[i] )
                
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
        //console.log(arr)
        return '\n' + functionName + '(' + arr + ')'
    } else {
        return '\n' + functionName + '()'
    }

}

</script>
<template>
    <div>
        
        <div class="ml-5 mr-5 mt-2">
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