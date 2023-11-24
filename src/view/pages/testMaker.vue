<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
//components
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';

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








</script>
<template>
    <div>

        <!-- 
            <div class="mt-5 mb-3 flex flex-wrap justify-content-center gap-3">
                <div
                    class="border-round border-1 surface-border w-12rem h-6rem surface-ground font-bold flex align-items-center justify-content-center">
                    1
                </div>
            </div>
        -->

        <div class="flex justify-content-center flex-wrap">
            <div class="border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 " style="width: 1700px">

                <div class=" field grid mb-5 mt-3">
                    <label for="firstname3" class="col-fixed" style="width:180px">Teszt neve</label>
                    <div class="col">
                        <InputText v-tooltip="'teszt egyedi azonosítója'" type="text" v-model="testName" />
                    </div>
                </div>
                <div class="field grid mb-5">
                    <label for="lastname3" class="col-fixed" style="width:180px">Teszt ideje (perc)</label>
                    <div class="col">
                        <InputText v-tooltip="'pl.: 10, az tíz perces teszt idő'" type="text" v-model="testTime" />
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-content-center flex-wrap">
            <Accordion :multiple="false" lazy="false" :activeIndex="[0]" style="width: 1700px">
                <!-- bug: nem frissíti a textarea méretét. lazy="false" megoldotta  -->
                <AccordionTab header="Feladat 1">

                    <div class="border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                        <Editor v-tooltip.top="'ide írja le a feladathoz tartozó szöveget'" v-model="accordion"
                            editorStyle="height: 400px;" class="m-5" />
                    </div>



                    <div class="border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                        <div class="flex justify-content-between flex-wrap">
                            <div class="flex align-items-center justify-content-center  border-round ">
                                <div v-tooltip.right="'feladathoz tartozó programozási környezet'" style="width: 190px">
                                    <SelectButton v-model="value" :options="options" optionLabel="value" dataKey="value"
                                        aria-labelledby="custom">
                                        <template #option="slotProps">
                                            <img v-if="slotProps.option.icon" :src="slotProps.option.icon" alt="Custom Icon"
                                                :style="{ height: '20px' }" />
                                        </template>
                                    </SelectButton>
                                </div>
                            </div>
                            <div class="flex align-items-center justify-content-center border-round">
                                <div class="flex justify-content-end flex-wrap">
                                    <div class="flex align-items-center justify-content-center"><i
                                            v-tooltip.left="'A függvény paraméterei konkrét értékek legyenek. A bemenő paraméterek számát és függvény nevét lehet módosítani.'"
                                            class="flex justify-content-end m-2 pi pi-question-circle"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CodeRunner />
                    </div>

                    <div class="border-round border-1 surface-border surface-ground mt-8 mb-3 p-4 ">
                        <TestCasesTable />
                    </div>





                </AccordionTab>
                <AccordionTab header="Feladat 2">
                    <p class="m-0">

                    </p>
                </AccordionTab>
                <AccordionTab header="Feladat 3">

                </AccordionTab>
            </Accordion>
        </div>





    </div>
</template>

<style></style>