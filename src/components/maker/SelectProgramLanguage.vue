<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue);

onMounted(() => {
});

const options = ref([
    { icon: '/public/javascript.svg', value: 'javascript' },
    { icon: '/public/python.svg', value: 'python' },
]);
function select(select) {
    emit('update:modelValue', select)
}


</script>
<template>
    <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center  border-round ">
            <div v-tooltip.top="'programozási nyelv választása'" style="width: 140px">
                <SelectButton v-model="value" :options="options" dataKey="value" aria-labelledby="custom"
                    @update:modelValue="select">
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