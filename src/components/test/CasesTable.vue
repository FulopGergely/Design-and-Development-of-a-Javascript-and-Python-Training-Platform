<script setup>
import { ref, computed } from 'vue';
import _ from 'lodash';
import store from '@/store/store.js';

const emit = defineEmits(['showToast'])

const columns = [
    { field: 'expectedResult', header: 'várt érték' },
    { field: 'result', header: 'kimeneti érték' },
];
const displayCasesOnTable = computed(() => { //átalakítjuk a tests[] táblát, hogy a PrimeVue table jól jelenítse meg
    let i = 0
    let AllCorrect = 0
    let correct = []
    const transformedData = store.getters.getTestBySide.map(item => {
        const task = store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1]; //eltárolt várt kimeneti értékek
        const output = task.output[i]; //kimeneti értékek
        correct[i] = 0
        if (_.isEqual(item.result, output) || output === item.result) {
            AllCorrect++;
            correct[i] = 1
            if (task.tests.length === AllCorrect) {
                console.log('Összes teszteset sikeres');
                emit('showToast')
                store.commit('setScoreEarned', store.getters.getScoreBySide)
                console.log(store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1])
            }
        }
        //console.log('correct: ' + AllCorrect)
        return {
            result: store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1].output[i],
            expectedResult: store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1].functionName + '(' + item.parameters.map(param => typeof param === 'object' ? JSON.stringify(param) : param) + ') -> ' + (typeof item.result == 'object' ? JSON.stringify(item.result) : item.result),
            correct: correct[i++]
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
                    <div v-if="slotProps.data.correct == 1">
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
