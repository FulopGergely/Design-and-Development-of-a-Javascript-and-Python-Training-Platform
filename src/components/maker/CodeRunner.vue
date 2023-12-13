<script setup>
import store from '@/store/store.js';
import { ref, onMounted, watch, inject } from 'vue';
//components
import JavascriptCode from './JavascriptCode.vue';
import PythonCode from './PythonCode.vue';
const py = inject('py');

const props = defineProps({
    code: {
        type: String,
        default: () => ''
    },
    selectLanguage: {
        type: String,
        default: () => ''
    }
})
const emit = defineEmits(['update:changeCode'])

onMounted(() => {
});

//watch
const selectLanguage = ref(props.selectLanguage);
watch(() => props.selectLanguage, (newValue, oldValue) => {
    selectLanguage.value = newValue;
});

//const programLanguage = ref(store.getters)
const logs = ref([]);
const code = ref(props.code)
const result = ref('')
const params = ref(42)


function codeChange(e) {
    //store.commit('setCode', e)
    emit('update:changeCode', e)
    code.value = e
}
function paramsChange(e) {
    //console.log("Params change", e)
    params.value = e
}

function runcode() {
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }
    if (selectLanguage.value == 'javascript') {
        try {
            const dynamicFunction = new Function('return ' + code.value)();
            result.value = dynamicFunction(params.value)
            console.log('asd')
        } catch (error) {
            console.log(error)
        }
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



</script>
<template>
    <div>
        <JavascriptCode @run-javascript="runcode" @code-change="codeChange" @params-change="paramsChange"
            :codeJavascript="code" :run-result="result" :log-rows="logs" :run-params="params"
            :selectLanguage="selectLanguage" />
    </div>
    
</template>
