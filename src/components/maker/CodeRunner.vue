<script setup>
import store from '@/store/store.js';
import { ref, onMounted, watchEffect, watch, inject } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
//components
import Terminal from '@/components/maker/Terminal.vue'
import ResultTable from '@/components/maker/ResultTable.vue'
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
const result = ref('')
const params = ref(42)

const code = ref(props.code);


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
        <div class="grid ">
            <div class="col ml-5 mr-5 ">
                <div
                    class="mt-5 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
                    <code-editor
                        v-tooltip.top="'Ide írja meg a függvényt, a függvénytörzs tartalma nem lesz látható a tesztkitöltőnek, csak a függvény neve és paraméter(ek) nevei. \n Ajánlott olyan neveket választani, amelyek illeszkednek a feladathoz.'"
                        :hljs="hljs" :code="code" :lang="selectLanguage" @edit="codeChange($event)">
                    </code-editor>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-7">
                <Button @click="runcode" class="mb-5 ml-5">Futtatás</Button>
                <ResultTable :js-result="result" @params-change="paramsChange" />
            </div>
            <div class="col mr-5">
                <Terminal :logs-name="logs" />
            </div>
        </div>
    </div>
</template>
