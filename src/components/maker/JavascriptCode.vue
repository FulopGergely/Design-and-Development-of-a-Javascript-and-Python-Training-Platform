<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
//components
import Terminal from '@/components/maker/Terminal.vue'
import ResultTable from '@/components/maker/ResultTable.vue'


defineProps({
    codeJavascript: {
        type: String,
        default: () => ''
    },
    logRows: {
        type: Array,
        default: () => []
    }
});
const emits = defineEmits([
    'runJavascript', 'codeChange'
])






</script>
<template>
    
    <div>
        <div class="grid ">
            <div class="col ml-5 mr-5 ">
                <div
                    class="mt-5 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
                    <code-editor
                        v-tooltip.top="'Írja meg a megoldás kódját a függvénytörzsben, törzs tartalma nem lesz látható a tesztkitöltőnek, csak a függvény neve és paraméterei. \n Ajánlott olyan neveket választani, amelyek illeszkednek a feladathoz.'"
                        :hljs="hljs" :code="codeJavascript" lang="javascript" @edit="emits('codeChange', $event)">
                    </code-editor>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-7">
                <Button @click="emits('runJavascript')" class="mb-5 ml-5">Futtatás</Button>
                <ResultTable />
            </div>
            <div class="col mr-5">
                <Terminal :logs-name="logRows" />
            </div>
        </div>








    </div>
</template>
<style></style>