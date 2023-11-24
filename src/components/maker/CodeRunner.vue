<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
//components
import JavascriptCode from './JavascriptCode.vue';
import PythonCode from './PythonCode.vue';



const logs = ref([]);
const codeJS = ref(`function myFunction(p1, p2) {
return p1 * p2;
}`)
const result = ref('')




function codeChange(e) {
    console.log("Code change", e)
    codeJS.value = e
}

function runCodeJs() {
    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }
    let params = [2, 1]
    try {
        const dynamicFunction = new Function('return ' + codeJS.value)();
        result.value = dynamicFunction(...params)
    } catch (error) {
        console.log(error)
    }
    console.log = oldConsoleLog;
    console.log(result.value)
}



</script>
<template>
    <div>
        <JavascriptCode @run-javascript="runCodeJs" @code-change="codeChange" :codeJavascript="codeJS" :log-rows="logs" />
    </div>
</template>
