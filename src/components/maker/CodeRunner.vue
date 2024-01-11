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

const initPyCode = `def my_function(x):\nreturn 5 * x\nprint(my_function(5))`
const initJsCode = `function myFunction( p1 ) { \nreturn p1\n}`
const logs = ref([]);
const result = ref(null)
const params = ref(['param', 'param'])
const code = ref(props.taskCode || (props.selectLanguage === 'javascript' ? initJsCode : initPyCode));


onMounted(() => {
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
function paramsChange(e) {
    params.value = e
}

function runcode() {
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }
    if (selectLanguage.value == 'javascript') {
        //console.log(params.value)
        //console.log(store.getters.getParamsByCurrentSide)
        try {
            const dynamicFunction = new Function('return ' + code.value)();
            result.value = dynamicFunction(store.getters.getParamsByCurrentSide[0].value)
            console.log(typeof result.value)
        } catch (error) {
            console.log(error)
        }
        //console.log(store.getters.getParamsByCurrentSide[0].value)
        console.log = oldConsoleLog;

    }
    if (selectLanguage.value == 'python') {

        py.run(`1+1`).then(result => {
            console.log(result.results)
            //console.log(result.error)
            console.log = oldConsoleLog;
        }).catch(error => {
            console.error('Hiba történt:', error)
            console.log = oldConsoleLog;
        });
        Promise.reject('Kényszerített hiba').catch(() => { });


    }
    //console.log(result.value)
}
function clearTerminal() {
    logs.value = []
}



</script>
<template>
    <div>
        <ParameterAdd />
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
                <Button @click="runcode" class="mb-2 mt-2 ml-5">Futtatás</Button>
                <!--  <ResultTable :js-result="result" @params-change="paramsChange" />   -->
            </div>
        </div>
        <div class="grid">
            <div class="col mr-5 ml-5 mt-0">
                <Terminal :logs-name="logs" @clearTerminal="clearTerminal" />
            </div>
        </div>
    </div>
</template>
