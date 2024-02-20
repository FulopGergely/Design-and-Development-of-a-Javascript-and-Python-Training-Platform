<script setup>
import { ref, onMounted } from 'vue';
import store from '@/store/store.js';

const products = ref();
const columns = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
];
</script>
<template>
    <div class="card">
        <DataTable size="small" stripedRows :value="products" tableStyle="min-width: 50rem" class="mb-2">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
            <Column>
                <template #body="slotProps">
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteRow(slotProps)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
