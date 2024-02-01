<script setup>
import store from '@/store/store.js';
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
    code: {
        type: String,
        default: () => ''
    },
    selectLanguage: {
        type: String,
        default: () => ''
    }
})

defineEmits({

})


const checkedLabel = ref('Tesztesetek bekapcsolva')
const checked = ref(true);
const result = ref();
const isDisabled = computed(() => {
    return store.getters.getParamsByCurrentSide.length === 0;
});

watch(checked, (newValue, oldValue) => {
    console.log(newValue);
    newValue ? checkedLabel.value = 'Tesztesetek bekapcsolva' : checkedLabel.value = 'Tesztesetek kikapcsolva'
});


onMounted(() => {
});




function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

async function runcode(selectLanguage) {
    console.log(isDisabled.value)
    const randomParamameters = store.getters.getParamsByCurrentSide.map(obj => {
        if (obj.type.name == 'string') {
            return generateRandomString(10)
        }
        if (obj.type.name == 'number') {
            return Math.floor(Math.random() * 100);
        }
        if (obj.type.name == 'boolean') {
            return Math.floor(Math.random() * 2) === 0;
        }
        if (obj.type.name == 'JSON') {
            return {
                string: generateRandomString(10),
                number: Math.floor(Math.random() * 2) === 0,
                boolean: Math.floor(Math.random() * 2) === 0,
            }
        }
    });
    if (selectLanguage == 'javascript') {
        try {
            const dynamicFunction = new Function('return ' + props.code)();
            result.value = dynamicFunction(...randomParamameters);
            console.log(result.value)
        } catch (error) {
            console.log(error)
        }

    }



    const myCase = {
        parameters: JSON.stringify(randomParamameters),
        value: result.value
    };
    store.commit('addTest', myCase)
}

function deleteRow(testCase) {
    store.commit('deleteTestCase', testCase.index + 1)
}


const columns = [
    { field: 'parameters', header: 'bemenő paraméterek' },
    { field: 'value', header: 'kimeneti érték' },
];




</script>

<template>
    <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center  border-round ">
            <Checkbox v-model="checked" :binary="true" v-tooltip.top="'Tesztesetek futtatásának ki/be kapcsolása.'" />
            <label for="ingredient1" class="ml-2"> {{ checkedLabel }} </label>
        </div>
        <div class="flex align-items-center justify-content-center  border-round "><i
                v-tooltip.top="'Milyen bementeti értékekre, milyen kimenetet várunk? Ajánlott legalább 2 tesztesetet felvenni, ami nem látható a tesztkitöltő számára'"
                class="flex justify-content-end m-2 pi pi-question-circle"></i>
        </div>
    </div>

    <div v-if="checked">
        <h2 style="text-align: center;">Tesztesetek</h2>





        <div class="card">
            <DataTable size="small" stripedRows :value="store.getters.getTestsCases" tableStyle="min-width: 50rem"
                class="mb-2">
                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
                <Column>
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteRow(slotProps)" />
                    </template>
                </Column>
            </DataTable>


            <Button label="Automatikus teszteset generálása" v-tooltip.bottom="'véletlenszerű éréket generál'"
                @click="runcode(props.selectLanguage)" class="mb-8" :disabled="isDisabled" icon="pi pi-plus" />

        </div>
    </div>
</template>