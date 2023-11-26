<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
//PrimeVue
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
//components
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';
import SelectProgramLanguage from '../../components/maker/SelectProgramLanguage.vue';
import StepMenu from '../../components/maker/StepMenu.vue';
import FormCreateTest from '../../components/maker/FormCreateTest.vue';


const confirm = useConfirm();
const toast = useToast();

const visible = ref(false);
const accordion = ref('asd');

const toggle = () => {
    visible.value = !visible.value;
};

const LanguageName = ref('Javascript');

const value = ref(null);
const options = ref([
    { icon: 'src/assets/x.svg', value: 'Left' },
    { icon: 'src/assets/javascript.svg', value: 'Right' },
    { icon: 'src/assets/python.svg', value: 'Center' },
]);
// <img src="@/assets/javascript.svg" alt="javascript" />

const confirmDeleteToast = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Biztos törli ezt a feladatot?',
        icon: 'pi pi-trash',
        acceptClass: 'p-button-danger p-button-sm',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
            toast.add({ severity: 'success', summary: 'Sikeres', detail: 'törlés', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Sikertelen', detail: 'törlés', life: 3000 });
        }
    });
};
const newTaskToast = () => {
    toast.add({ severity: 'info', summary: 'Új feladat hozzáadva', life: 3000 });
};





</script>
<template>
    <div>

        <StepMenu />
        <div v-if="false" class="flex justify-content-center flex-wrap">
            <div class="border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 " style="width: 1700px">
                <FormCreateTest />
            </div>
        </div>
        <div class="flex justify-content-center flex-wrap">
            <div class="border-round border-1 surface-border mt-5 mb-3 p-4" style="width: 1700px">
                <div>


                    <div class="flex justify-content-between flex-wrap">

                        <h2>1. Oldal</h2>
                        <div>
                            <ConfirmPopup></ConfirmPopup>
                            <Toast />
                            <Button v-tooltip.top="'előnézet'" severity="info" class="m-1" icon="pi pi-eye" />
                            <Button v-tooltip.top="'Feladat törlése'" severity="danger" @click="confirmDeleteToast($event)"
                                class="m-1" icon="pi pi-trash" />
                            <Button @click="newTaskToast" label="Új feladat" severity="success" class="m-1"
                                icon="pi pi-plus" />
                            <Toast />
                        </div>
                    </div>






                    <div class="border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                        <Editor v-tooltip.top="'ide írja le a feladathoz tartozó szöveget'" v-model="accordion"
                            editorStyle="height: 400px;" class="m-5" />
                    </div>
                    <div class="border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                        <SelectProgramLanguage />
                        <CodeRunner />
                    </div>
                    <div class="border-round border-1 surface-border surface-ground mt-8 mb-3 p-4 ">
                        <TestCasesTable />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>