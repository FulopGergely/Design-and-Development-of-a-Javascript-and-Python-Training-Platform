<script setup>
import { ref, computed } from 'vue';
import store from '@/store/store.js';

const products = ref();
const columns = [
    { field: 'parameters', header: 'bemenő paraméterek' },
    { field: 'expectedResult', header: 'várt kimeneti érték' },
    { field: 'result', header: 'kimeneti érték' },
];
const displayCasesOnTable = computed(() => { //átalakítjuk a tests[] táblát, hogy a PrimeVue table jól jelenítse meg
    let i = 0
    let correct = 0
    const transformedData = store.getters.getTestBySide.map(item => {
        if(store.getters.getTestSheet.task[store.getters.getCurrentTestSide-1].output[i] === item.result){
            correct++
            if(store.getters.getTestSheet.task[store.getters.getCurrentTestSide-1].tests.length === correct){
                console.log('összes teszteseten átment')
            }
        }
        return {
            parameters: store.getters.getTestSheet.task[store.getters.getCurrentTestSide-1].functionName + '(' + item.parameters.map(param => typeof param === 'object' ? JSON.stringify(param) : param) + ')',
            result: store.getters.getTestSheet.task[store.getters.getCurrentTestSide-1].output[i++],
            expectedResult: item.result
        }
    })
    return transformedData
});
</script>
<template>
    <div class="card">
        <DataTable size="small" stripedRows :value="displayCasesOnTable" tableStyle="min-width: 50rem" class="mb-2">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            <Column>
                <template #body="slotProps">
                    <div v-if="slotProps.data.expectedResult == slotProps.data.result">
                        <i class="pi pi-check"></i>
                    </div>
                    <div v-else>
                        <i class="pi pi-times"></i>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
