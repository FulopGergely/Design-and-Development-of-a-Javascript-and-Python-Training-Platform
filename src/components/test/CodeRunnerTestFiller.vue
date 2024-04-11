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
const logs = ref([]);
const code = ref(props.taskCode)
//const params = ()
const selectLanguage = ref(props.selectLanguage);

onMounted(() => {
    console.log(props.tests)
});
const isDisabled = computed(() => { //ha eltaláljuk a választ futtatás gomb szürke lesz
    return store.getters.getScoreEarned[store.getters.getScoreBySide-1] == store.getters.getScoreBySide && store.getters.getScoreBySide != 0
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
        let results
        //console.log(props.tests)
        if (props.tests.length == 0) {
            let arr = []
            store.getters.getTestSheet.task[0].params.map(param => {
                param.type.name == 'JSON' ? arr.push(JSON.parse(param.value)) : arr.push(param.value)
            })
            const dynamicFunction = new Function('return ' + code.value)();
            return dynamicFunction(...arr);
        } else {
            results = props.tests.map(test => {
                const dynamicFunction = new Function('return ' + code.value)();
                return dynamicFunction(...test.parameters);
            });
        }



        store.commit('setResults', results);
        store.commit('setDisplayTest', true); //teszteset tábla megjelenik
        //console.log(results);
    } catch (error) {
        console.log(error);
    }
}

async function executePythonCode() {
    let resultsObj = [];
    let results = [];
    let res;
    if (props.tests.length == 0) {
        //console.log(code.value + addStringToEndOfThePythonCode())
        res = await py.run(code.value + addStringToEndOfThePythonCode());
        resultsObj.push(res);
    } else {
        for (const test of props.tests) {
            console.log(code.value + addStringToEndOfThePythonCode(test))
            res = await py.run(code.value + addStringToEndOfThePythonCode(test));

            if (typeof res.results == 'object') { //firebase-től Map-et kapunk vissza ha teszt obj, itt alakítottam át, mert így nem nyúl bele a frontend-es futtatásba ami map-el működik jól
                const mapToObject = map => Object.fromEntries(map.entries());
                results.push(mapToObject(new Map(res.results)));
                resultsObj.push(res);
            } else {
                results.push(res.results)
                resultsObj.push(res);
            }

        }
    }
    resultsObj.forEach(result => {
        for (const output of py.log.value.stdOut) {
            console.log(output);
        }
        if (result.error != null) {
            console.log('Hiba:' + result.error);
        } else {
            result.value = result.resultsObj;
            //console.log('result.value');
            if (props.tests.length != 0) {
                store.commit('setResults', results);
                store.commit('setDisplayTest', true); //teszteset tábla megjelenik
            }

        }
    });
}

function addStringToEndOfThePythonCode(test) {
    let arr = []
    const functionName = code.value.replace(/^(def|\s+def)\s+/, '').match(/\w+/)[0];
    let params
    let parametersType
    if (test) {
        params = test.parameters
        parametersType = test.parametersType
    } else { //nincs teszteset, és hogy tudjuk használni a printet frontend kódnál, a params[]-ból olvasom ki a paramétereket
        params = store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1].params.map(x => {
            return x.value
        })
        parametersType = store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1].params.map(x => {
            return x.type.name
        })
    }

    for (let i = 0; i < params.length; i++) {
        if (parametersType[i] == 'string') {
            if (params[i][0] == '"') { //generált teszteset
                arr.push(params[i])
            } else { //saját teszteset
                arr.push('"' + params[i] + '"')
            }

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
        if (parametersType[i] == 'dictionary') {
            arr.push(params[i])
        }
    }
    //console.log(arr)
    return '\n' + functionName + '(' + arr + ')'


}

</script>
<template>
    <div>
        <div class="ml-5 mr-5 mt-2">
            <Codemirror class="CodeMirror" v-model:value="code" :options="cmOptions" border :height="400"
                @change="codeChange($event)" />
        </div>
        <div class="grid">
            <div class="col-7">
                <div>
                    <Button :disabled="isDisabled" @click="runcode()" class="mb-2 mt-2 ml-5">Futtatás</Button>
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