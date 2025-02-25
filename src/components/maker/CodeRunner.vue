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
import ParameterAdd from './ParameterAdd.vue';
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

const emit = defineEmits(['update:taskCode'])

const initPyCode = `def my_function(x):\n return x`
const initJsCode = `function myFunction( p1 ) { \nconsole.log(typeof p1)\nconsole.log(p1)\nreturn p1\n}`
const logs = ref([]);
const result = ref(null)
const params = ref(store.getters.getParamsByCurrentSide)
const code = ref(props.taskCode || (props.selectLanguage === 'javascript' ? initJsCode : initPyCode));
if (!props.taskCode) {
    emit('update:taskCode', code.value);
}

const functionName = computed(() => { //py functionName
    let codeCopy = code.value
    let regex = /^(def|\s+def)\s+/
    codeCopy = codeCopy.replace(codeCopy.match(regex)[0], '');
    regex = /\w+/ //functionName
    return codeCopy.match(regex)[0]
});

const isDisabled = computed(() => {
    return store.getters.getParamsByCurrentSide.length === 0;
});

onMounted(() => {
});

//watch
const selectLanguage = ref(props.selectLanguage);

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


function changeParamType(choosedParam) { //paraméter kiválasztásnál(kattintásnál) fut le, és akkor amikor beírunk a textarea mezőbe.
    store.getters.getParamsByCurrentSide.forEach(param => {
        if (param.id === choosedParam.id) {
            switch (param.type.name) {
                case 'number':
                    param.value = parseInt(param.value);
                    break;
                case 'string':
                    param.value = param.value != null ? param.value.toString() : '';
                    break;
                case 'boolean':
                    if (param.value === 'true' || param.value === 'True') {
                        param.value = true;
                    } else if (param.value === 'false' || param.value === 'False') {
                        param.value = false;
                    } else {
                        param.value = '';
                    }
                    break;
                /*case 'JSON':
                    param.value = JSON.parse(param.value);
                    break;*/
            }
        }
    });
}



async function runcode(params) {
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }

    if (selectLanguage.value == 'javascript') {
        try {
            params.map(param => { 
                if (param.type.name == 'JSON') {
                    param.value = JSON.parse(param.value)
                }
            })
            const dynamicFunction = new Function('return ' + code.value)();
            result.value = dynamicFunction(...params.map(param => param.value));
            params.map(param => {
                if (param.type.name == 'JSON') {
                    param.value = JSON.stringify(param.value, undefined, 4);
                }
            })
            console.log(result.value)
        } catch (error) {
            params.map(param => {
                if (param.type.name == 'JSON') {
                    param.value = JSON.stringify(param.value, undefined, 4);
                }
            })
            console.log(error)
        }
        console.log = oldConsoleLog;
    }
    if (selectLanguage.value == 'python') {
        try {
            const res = await py.run(code.value + addStringToEndOfThePythonCode());
            for (const output of py.log.value.stdOut) {
                console.log(output);
            }
            if (res.error != null) {
                console.log(res.error)
            } else {
                result.value = res.results
                console.log(result.value);
            }
        } catch (error) {
            console.error('Error:', error);
        }
 //console.log(res.error.split('\n').slice(8).join('\n').substring(16)); // delete the beginning of an error message            
        console.log = oldConsoleLog;
    }
    console.log = oldConsoleLog;
}
function clearTerminal() {
    logs.value = []
}
function addStringToEndOfThePythonCode() {
    const a = params.value.map(param => {
        if (param.type.name == 'string') {
            return '"' + param.value + '"'
        }
        if (param.type.name == 'number') {
            return parseInt(param.value)
        }
        if (param.type.name == 'boolean') {
            if (param.value) {
                return 'True'
            } else {
                return 'False'
            }
        }
        if (param.type.name == 'dictionary') {
            return param.value
        }
    });
    const s = '\n' + functionName.value + '(' + a + ')'
    return s
}
async function saveTestCase() {
    await runcode(store.getters.getParamsByCurrentSide)
    const myCase = {
        parameters: params.value.map(item => {
            if (item.type.name == 'JSON') {
                return JSON.parse(item.value)
            } else {
                return item.value
            }

        }),
        result: result.value,
        parametersType: params.value.map(item => item.type.name),
        resultType: typeof result.value
    };
    //egyéni
    //pythonnál Map-et nem lehet firebase-en tárolni, ezért itt átalakítottam, és így tároljuk el a tesztesetet
    if (typeof myCase.result === 'object' && selectLanguage.value === 'python') {
        const mapToObject = map => Object.fromEntries(map.entries());
        myCase.result = mapToObject(myCase.result);
    }
    store.commit('addTest', myCase)
}


</script>
<template>
    <div>

        <ParameterAdd @changeParamType="changeParamType" :cmOptions="cmOptions" />
        <div class="ml-5 mr-5 mt-2">
            <Codemirror class="CodeMirror" v-model:value="code" :options="cmOptions" border :height="400"
                @change="codeChange($event)" />
        </div>
        
        <div class="grid">
            <div class="col-7">
                <Button @click="runcode(store.getters.getParamsByCurrentSide)" class="mb-2 mt-2 ml-5">Futtatás</Button>
                <!--  <ResultTable :js-result="result" @params-change="paramsChange" />   -->
                <Button label="" @click="saveTestCase" :disabled="isDisabled"
                    v-tooltip.right="'Teszteset hozzáadása (jelenlegi paraméterek értékét/értékeit és futtás eredményét hozzáadja a teszteset listához)'"
                    severity="success" class="mb-2 mt-2 ml-5" icon="pi pi-plus" />
            </div>


        </div>
        <div class="ml-5 mr-5 mt-2">
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