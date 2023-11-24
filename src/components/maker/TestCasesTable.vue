<script setup>
import { ref } from 'vue'


defineEmits({

})
defineProps({

})
const products = ref([
    {
        id: '#',
        testCases: 'teszteset neve',
        results: 'megoldás (kimeneti érték)',
        show: { name: 'mejelenítés', visible: true },
        deleteTestCase: 'teszteset törlése',
    },
])






</script>

<template>
    <div class="flex justify-content-end flex-wrap">
        <div class="flex align-items-center justify-content-center"><i v-tooltip.top="'magyarázó szöveg'"
                class="flex justify-content-end m-2 pi pi-question-circle"></i>
        </div>
    </div>
    <h2 style="text-align: center;">Tesztesetek</h2>
    <DataTable class="mb-5 ml-5" :value="products" tableStyle="min-width: 50rem">
        <Column field="id" header="#"></Column>
        <Column field="testCases" header="teszteset neve"></Column>
        <Column field="results" header="megoldás (return)"></Column>
        <Column field="deleteTestCase" header="láthatóság">
            <template #body="slotProps">
                <Checkbox @click="handleButtonClick(slotProps.rowData)"
                    v-tooltip.right="'Tesztkitöltő látni fogja ezt a teszt esetet'" v-model="checked" :binary="false" />
            </template>
        </Column>
        <Column field="deleteTestCase" header="teszteset törlése">
            <template #body="slotProps">
                <Button icon="pi pi-trash" v-tooltip.right="'törlés'"
                    @click="handleButtonClick(slotProps.rowData)"></Button>
            </template>
        </Column>
    </DataTable>
</template>