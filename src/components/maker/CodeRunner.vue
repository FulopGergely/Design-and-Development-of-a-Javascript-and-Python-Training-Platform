<script setup>
import store from '@/store/store.js';
import { ref, onMounted, onUpdated } from 'vue';
//components
import JavascriptCode from './JavascriptCode.vue';
import PythonCode from './PythonCode.vue';

const props = defineProps({
    codeJs: {
        type: String,
        default: () => ''
    }
})

onMounted(() => {
    console.log('mounted')
    console.log(codeJS.value)

});

const logs = ref([]);
const codeJS = ref(props.codeJs)
const result = ref('')
const params = ref(42)


function codeChange(e) {
    console.log("Code change", e)
    //store.commit('setCode', e)

    codeJS.value = e
}
function paramsChange(e) {
    console.log("Params change", e)
    params.value = e
}

function runCodeJs() {
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }
    try {
        const dynamicFunction = new Function('return ' + codeJS.value)();
        result.value = dynamicFunction(params.value)
    } catch (error) {
        console.log(error)
    }
    console.log = oldConsoleLog;
    console.log(result.value)
}



</script>
<template>
    <div>
        <JavascriptCode @run-javascript="runCodeJs" @code-change="codeChange" @params-change="paramsChange"
            :codeJavascript="codeJS" :run-result="result" :log-rows="logs" :run-params="params" />
    </div>
</template>
