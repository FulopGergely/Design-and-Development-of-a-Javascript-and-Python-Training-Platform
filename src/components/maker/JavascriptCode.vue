<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
//components
import Terminal from '@/components/maker/Terminal.vue'


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

const products = ref([
    {
        myFunction: 'myFunction()',
        result: 'Bamboo Watch',
    },
]);




</script>
<template>
    <div>
        <div class="grid ">
            <div class="col ml-5 mr-5 ">
                <div
                    class="mt-5 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
                    <code-editor :hljs="hljs" :code="codeJavascript" lang="javascript" @edit="emits('codeChange', $event)">
                    </code-editor>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col-7">
                <Button @click="emits('runJavascript')" class="mb-5 ml-5">Futtatás</Button>
                <div class="ml-5 border-round border-1 surface-border surface-ground">


                    <DataTable class="mb-5 ml-5 mr-5" :value="products" tableStyle="min-width: 50rem">
                        <Column field="myFunction" header="paraméter értékek"></Column>
                        <Column field="result" header="megoldás (return)"></Column>
                        <Column>
                            <template #body="slotProps">
                                <Button icon="pi pi-save" v-tooltip.top="'új teszteset felvétele'"
                                    @click="handleButtonClick(slotProps.rowData)"></Button>
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>
            <div class="col mr-5">
                <Terminal :logs-name="logRows" />
            </div>
        </div>








    </div>
</template>
<style></style>