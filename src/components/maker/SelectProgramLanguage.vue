<script setup>
import { ref } from 'vue';




const LanguageName = ref('Javascript');

const value = ref(null);
const options = ref([
    { icon: 'src/assets/x.svg', value: 'Left' },
    { icon: 'src/assets/javascript.svg', value: 'Right' },
    { icon: 'src/assets/python.svg', value: 'Center' },
]);



</script>
<template>
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
                        v-tooltip.left="'Írja meg a megoldás kódját a függvénytörzsben, törzs tartalma nem lesz látható a teszkitöltőnek, csak a függvény neve és paraméterei. \n Ajánlott olyan neveket választani, amelyek illeszkednek a feladathoz.'"
                        class="flex justify-content-end m-2 pi pi-question-circle"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>