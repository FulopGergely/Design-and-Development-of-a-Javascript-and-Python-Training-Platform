<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();

const myRef = ref([]); // példa ref

const products = ref([
    {
        myFunction: 'myFunction()',
        result: 'Bamboo Watch',
    },
]);


const SaveTestCase = () => {
    toast.add({ severity: 'info', summary: 'Teszteset hozzáadva a listához', life: 3000 });
};
</script>

<template>
    <div class="ml-5 border-round border-1 surface-border surface-ground">

        <DataTable class="mb-5 ml-5 mr-5" :value="products" tableStyle="min-width: 50rem">
            <Column field="myFunction" header="paraméter értékek">
                <template #body="">
                    <Textarea style="height: 45px; width: 300px"
                        v-tooltip.right="'vesszővel elválasztva adja meg a paraméterek értékét. \n\n 2 paraméter esetén pl.: 25, \'szöveg\' '"
                        v-model="value" />
                </template>

            </Column>
            <Column field="result" header="megoldás (return)"></Column>
            <Column>
                <template #body="slotProps">
                    <Toast />
                    <Button icon="pi pi-save" v-tooltip.top="'új teszteset felvétele'" @click="SaveTestCase()"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>