<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
//components
import Terminal from '@/components/maker/Terminal.vue'
import ResultTable from '@/components/maker/ResultTable.vue'


defineProps(
    {
        codeJavascript: {
            type: String,
            default: () => ''
        },
        logRows: {
            type: Array,
            default: () => []
        },
        runResult: {
        },
        selectLanguage: {
            type: String,
            default: () => ''
        }
    });

const emits = defineEmits([
    'runJavascript', 'codeChange', 'paramsChange'
])
function asd(e) {
    console.log('js')
    emits('paramsChange', e)
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
                        :hljs="hljs" :code="codeJavascript" :lang="selectLanguage" @edit="emits('codeChange', $event)">
                    </code-editor>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-7">
                <Button @click="emits('runJavascript')" class="mb-5 ml-5">Futtatás</Button>
                <ResultTable :js-result="runResult" @params-change="asd" />
            </div>
            <div class="col mr-5">
                <Terminal :logs-name="logRows" />
            </div>
        </div>
    </div>
</template>
<style></style>