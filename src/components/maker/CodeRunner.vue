<script setup>
import store from '@/store/store.js';
import { ref, onMounted, computed, watch, inject } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
//components
import Terminal from '@/components/maker/Terminal.vue'
import ResultTable from '@/components/maker/ResultTable.vue'
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

function asd() {
    console.log('update')
}

const initPyCode = `def my_function(x):\n return 5 * x`
const initJsCode = `function myFunction( p1 ) { \nconsole.log(typeof p1)\nconsole.log(p1)\nreturn p1\n}`
const logs = ref([]);
const result = ref(null)
const params = ref(store.getters.getParamsByCurrentSide)
const multipleCases = ref([]);
const code = ref(props.taskCode || (props.selectLanguage === 'javascript' ? initJsCode : initPyCode));


onMounted(() => {
    console.log(myObject2)
});

//watch
const selectLanguage = ref(props.selectLanguage);
watch(() => props.selectLanguage, (newValue, oldValue) => {
    selectLanguage.value = newValue;
});


function codeChange(e) {
    emit('update:taskCode', e)
    code.value = e
}

const myObject = ref(
    {
        "string": "Hello, World!",
        "number": 42,
        "boolean": true,
        "nullValue": null,
        "array": [1, 2, 3],
        "object": {
            "key1": "value1",
            "key2": "value2"
        }
    }
);
const myObject2 = ref(
    {
        string: "Hello, World!",
        number: 42,
        boolean: true,
        nullValue: null,
        array: [1, 2, 3],
        object: {
            key1: "value1",
            key2: "value2"
        }
    }
);


function changeParamType() {
    store.getters.getParamsByCurrentSide.map(param => {
        if (param.type.name == 'number') {
            param.value = parseInt(param.value)
        }
        if (param.type.name == 'string') {
            param.value = param.value.toString()
        }
        if (param.type.name == 'boolean') {
            param.value == "true" ? param.value = true : param.value = false
        }
        /*if (param.type.name == 'JSON') {
            param.value == JSON.parse(param.value)
        }*/
        //console.log(typeof param.value)
    })
}



async function runcode(params) {
    //console.log(py)
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }
    if (selectLanguage.value == 'javascript') {
        //console.log(params.value)
        //console.log(store.getters.getParamsByCurrentSide)
        try {
            params.map(param => { //hogy a textarea jól jelenítse meg, futtatás előtt parsolás, futtatás után stringify
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
            //console.log(store.getters.getParamsByCurrentSide.map(param => param.type.name))
            //console.log(store.getters.getParamsByCurrentSide.map(param => param.value))
            //store.getters.getParamsByCurrentSide.map(param => param.value = JSON.stringify(param.value))
        } catch (error) {
            console.log(error)
        }
        //console.log(store.getters.getParamsByCurrentSide[0].value)
        console.log = oldConsoleLog;

    }
    if (selectLanguage.value == 'python') {
        try {
            const res = await py.run(code.value + addStringToEndOfThePythonCode());
            //console.log(code.value + addStringToEndOfThePythonCode())
            for (const output of py.log.value.stdOut) {
                console.log(output);
            }
            //console.log(res.results);
            if (res.results != null) {
                console.log(res.results);
            } else if (res.error) {
                console.log(res.error.split('\n').slice(8).join('\n').substring(16)); // delete the beginning of an error message
            }
        } catch (error) {
            console.error('Error:', error);
        }



        console.log = oldConsoleLog;

    }
    console.log = oldConsoleLog;
    //console.log(result)
}
function clearTerminal() {
    logs.value = []
}
function addStringToEndOfThePythonCode() {
    //console.log(code.value)
    const regex = code.value.match(/^\s*def\s+/) // def -el kezdődik a kód 
    if (code.value.match(regex) != null) {
        console.log(regex)
    }
    //var s = code.value.replace(/def\s+/, '')
    //var functionName = s.match(/\w+/)
    //console.log(functionName)
    //var functionName = functionString.substring(3, functionString.indexOf('(')).trim();


    return '\nmy_function(2)'
}
function saveTestCase() {
    runcode(store.getters.getParamsByCurrentSide)
    //console.log(params.value[0].value)
    //const values = [...data.map(item => item.value)];
    //console.log(params.value.map(item => item.value))
    const myCase = {
        parameters: '' + params.value.map(item => item.value),
        value: result.value
    };


    //case.push({ parameters: cases, result: result.value })

    //multipleCases.value = Object.assign(multipleCases.value, { parameters: cases, result: 'asd3' });
    store.commit('addTest', myCase)
}


</script>
<template>
    <div>
        <ParameterAdd @changeParamType="changeParamType" />
        <div class="grid ">
            <div class="col ml-5 mr-5 ">
                <div
                    class="mt-2 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
                    <code-editor
                        v-tooltip.top="'Függvénytörzs tartalma nem lesz látható a tesztkitöltőnek, csak a függvény neve és paraméter(ek) nevei. \n Ajánlott olyan neveket választani, amelyek illeszkednek a feladathoz.'"
                        :hljs="hljs" :code="code" :lang="selectLanguage" @edit="codeChange($event)">
                    </code-editor>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-7">
                <Button @click="runcode(store.getters.getParamsByCurrentSide)" class="mb-2 mt-2 ml-5">Futtatás</Button>
                <!--  <ResultTable :js-result="result" @params-change="paramsChange" />   -->
                <Button label="" @click="saveTestCase"
                    v-tooltip.right="'Teszteset hozzáadása (jelenlegi paraméterek értékét/értékeit és futtás eredményét hozzáadja a teszteset listához)'"
                    severity="success" class="mb-2 mt-2 ml-5" icon="pi pi-plus" />
            </div>


        </div>
        <div class="grid">
            <div class="col mr-5 ml-5 mt-0">
                <Terminal :logs-name="logs" @clearTerminal="clearTerminal" />
            </div>
        </div>
    </div>
</template>
