<script setup>
import store from '@/store/store.js';
import { ref, onUpdated } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();


const props = defineProps(['jsResult']);
const emits = defineEmits([
    'paramsChange'
])
const result = ref(props.jsResult);

onUpdated(() => {
    result.value = props.jsResult;
});

const products = ref([
    {
        myFunction: 'myFunction()',
        result: result,
    },
]);



const SaveTestCase = () => {
    toast.add({ severity: 'info', summary: 'Teszteset hozzáadva a listához', life: 3000 });
};
</script>
<!--
    
<template>
    
    <div class="ml-5 border-round border-1 surface-border surface-ground">

        <DataTable class="mb-5 ml-5 mr-5" :value="products" tableStyle="min-width: 50rem">
            <Column field="myFunction" header="paraméter értékek">
                <template #body="">
                    <Textarea style="height: 45px; width: 300px" @input="emits('paramsChange', $event.target.value)"
                        v-tooltip.right="'1. Vesszővel elválasztva adja meg a paraméterek értékeit.\n\n pl.: 25, \'szöveg\', [tömb], {obj} \n\n 2. Futtassa a kódot. \n\n 3. Mentse el a teszesetet. '" />
                </template>
            </Column>
            <Column field="result" header="megoldás (return)"></Column>
            <Column>
                <template #body="slotProps">
                    <Toast />
                    <Button icon="pi pi-save" v-tooltip.top="'teszteset felvétele a listába'"
                        @click="SaveTestCase()"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
    
</template>

-->