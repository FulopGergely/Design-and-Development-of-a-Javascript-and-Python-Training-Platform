<script setup>
import { ref, onMounted, computed } from 'vue';
//components

const visible = ref(false);
const accordion = ref('asd');

const toggle = () => {
    visible.value = !visible.value;
};

const LanguageName = ref('Javascript');
const options = ref(['Javascript', 'Python']);


</script>
<template>
    {{ accordion }}
    <div>

        <!-- 
            <div class="mt-5 mb-3 flex flex-wrap justify-content-center gap-3">
                <div
                    class="border-round border-1 surface-border w-12rem h-6rem surface-ground font-bold flex align-items-center justify-content-center">
                    1
                </div>
            </div>
        -->


        <div class="border-round border-1 surface-border surface-ground mt-5 mb-3 p-4">

            <div class="field grid mb-5 mt-3">
                <label for="firstname3" class="col-fixed" style="width:180px">Teszt neve</label>
                <div class="col">
                    <InputText type="text" v-model="testName" />
                </div>
            </div>
            <div class="field grid mb-5">
                <label for="lastname3" class="col-fixed" style="width:180px">Teszt ideje (perc)</label>
                <div class="col">
                    <InputText type="text" v-model="testTime" />
                </div>
            </div>
            <div class="field grid">
                <label for="lastname3" class="col-fixed" style="width:180px">Programozási nyelv</label>
                <div class="col">
                    <SelectButton v-model="LanguageName" :options="options" aria-labelledby="basic" />
                </div>
            </div>

        </div>


        <Accordion :multiple="true" :activeIndex="[0]">
            <AccordionTab header="Feladat 1">
                <Editor v-model="accordion" editorStyle="height: 400px;" />
                <InputText type="text" v-model="testName" />
            </AccordionTab>
            <AccordionTab header="Feladat 2">
                <p class="m-0">

                </p>
            </AccordionTab>
            <AccordionTab header="Feladat 3">

            </AccordionTab>
        </Accordion>


        



        <Button label="Show" icon="pi pi-external-link" @click="toggle" />

        <Dialog v-model:visible="visible" maximizable modal header="Header" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <p class="m-0">
                asd
            </p>
        </Dialog>
    </div>
</template>