<script setup>
import { ref, computed } from 'vue';
import store from '@/store/store.js';
//PrimeVue
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
//components
import FormCreateTest from '../../components/maker/FormCreateTest.vue';



const confirm = useConfirm();
const toast = useToast();

const items = [
    {
        label: 'Előnézet',
        icon: 'pi pi-eye',
    },
    {
        label: 'Feladat törlése',
        icon: 'pi pi-trash',
        command: () => {
            confirmDelete()
        }
    },
    {
        label: 'Teszt mentése',
        icon: 'pi pi-save',
        command: () => {
            visible.value = true
        }
    },

]



const visible = ref(false);
const confirmDelete = () => {
    confirm.require({
        message: 'Biztos törli ezt az oldalt?',
        header: 'Törlés',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
            if (store.getters.getTask.length <= 1) {
                toast.add({ severity: 'error', summary: 'Sikertelen törlés', detail: 'Legalább egy feladatnak kell lennie', group: 'tl', life: 3000 });
                visible.value = false;
            } else {
                store.commit('deleteTask', store.getters.getCurrentSide - 1);
                toast.add({ severity: 'success', summary: 'Sikeres', detail: 'törlés', group: 'tl', life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Sikertelen', detail: 'törlés', group: 'tl', life: 3000 });
        }
    });
};
const addTask = () => {
    store.commit('addTask', {
        // nem kell id mező, firebase-ben doc.id fogja azonosítani a tesztet, amit hozzákötünk a személyhez. 
        side: store.getters.getTask.length + 1, //oldal szám, 1 től indul
        programmingLanguageName: '',
        task: '', //feladat szövege html formátumban
        code: ``,
        result: '',
        testResult: '',
        score: 0,
    });
    toast.add({ severity: 'info', summary: 'Új oldal lett hozzáadva', group: 'tl', life: 3000 });
};

</script>
<template>
    <div>
        <ConfirmDialog></ConfirmDialog>
        <Toast position="top-left" group="tl" />
        <SplitButton @click="addTask" label="Új oldal" :model="items" severity="success" class="m-1" icon="pi pi-plus">
        </SplitButton>
        <Dialog v-model:visible="visible" modal header="Teszt Mentése" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <FormCreateTest />
        </Dialog>


    </div>
</template>