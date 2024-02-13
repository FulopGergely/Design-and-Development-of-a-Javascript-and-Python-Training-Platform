<script setup>
import store from '@/store/store.js';
import { ref, onMounted, computed, watch, inject } from 'vue';
const py = inject('py');

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

const score = ref(store.getters.getScore)
const checkedLabel = ref('Tesztesetek bekapcsolva')
const checked = ref(store.getters.getIsTest);
const result = ref();
const isDisabled = computed(() => {
    return store.getters.getParamsByCurrentSide.length === 0;
});
const functionName = computed(() => { //js functionName
    if (props.selectLanguage == 'javascript') {
        let code = props.code
        let regex = /^(function|\s+function)\s+/
        code = code.replace(code.match(regex)[0], '');
        regex = /\w+/
        return code.match(regex)[0]
    } else {
        let codeCopy = props.code
        let regex = /^(def|\s+def)\s+/
        codeCopy = codeCopy.replace(codeCopy.match(regex)[0], '');
        regex = /\w+/ //functionName
        return codeCopy.match(regex)[0]
    }

});
const displayCasesOnTable = computed(() => { //átalakítjuk a tests[] táblát, hogy a PrimeVue table jól jelenítse meg
    const transformedData = store.getters.getTestsCases.map(item => {
        return {
            parameters: functionName.value + '(' + item.parameters.map(param => typeof param === 'object' ? JSON.stringify(param) : param) + ')',
            result: item.result
        }
    })
    return transformedData
});

watch(checked, (newValue, oldValue) => {
    console.log(newValue);
    newValue ? checkedLabel.value = 'Tesztesetek bekapcsolva' : checkedLabel.value = 'Tesztesetek kikapcsolva'
    store.commit('isTest', newValue)
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
    //console.log(isDisabled.value)
    const randomParamameters = store.getters.getParamsByCurrentSide.map(obj => {
        if (selectLanguage == 'javascript') {
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
        }
        if (selectLanguage == 'python') {
            if (obj.type.name == 'string') {
                return '"' + generateRandomString(10) + '"'
            }
            if (obj.type.name == 'number') {
                return Math.floor(Math.random() * 100);
            }
            if (obj.type.name == 'boolean') {
                return Math.floor(Math.random() * 2) === 0 ? 'True' : 'False'
            }
            if (obj.type.name == 'JSON') {
                const obj = {
                    string: generateRandomString(10),
                    number: Math.floor(Math.random() * 100),
                    boolean: Math.floor(Math.random() * 2) === 0 ? 'True' : 'False',
                }
                return JSON.stringify(obj)
            }
        }

    });
    if (selectLanguage == 'javascript') {
        try {
            const dynamicFunction = new Function('return ' + props.code)();
            result.value = dynamicFunction(...randomParamameters);
            //console.log(result.value)
        } catch (error) {
            //console.log(error)
        }

    }
    if (selectLanguage == 'python') {
        try {
            const res = await py.run(props.code + '\n' + functionName.value + '(' + randomParamameters + ')');
            //console.log(props.code + addStringToEndOfThePythonCode(randomParamameters))
            if (res.error != null) {
                console.log(res.error)
            } else {
                //console.log(res.results);
                result.value = res.results
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    /*
        const myCase = {
            parameters: functionName.value + '(' + randomParamameters.map(param => JSON.stringify(param)).join(', ') + ')',
            value: result.value
        };
        */
    const myCase = {
        parameters: randomParamameters.map(param => param),
        result: result.value,
        parametersType: store.getters.getParamsByCurrentSide.map(item => item.type.name),
        resultType: typeof result.value
    };
    store.commit('addTest', myCase)
}

function deleteRow(testCase) {
    store.commit('deleteTestCase', testCase.index + 1)
}
function changeScore(score) {
    store.commit('setScore', score)
}


const columns = [
    { field: 'parameters', header: 'bemenő paraméterek' },
    { field: 'result', header: 'kimeneti érték' },
];


</script>

<template>
    {{ store.getters.getTestsCases }}
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
            <DataTable size="small" stripedRows :value="displayCasesOnTable" tableStyle="min-width: 50rem" class="mb-2">
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
        <div class="flex justify-content-end flex-wrap">
            <div class="flex flex-column gap-2">
                <InputText type="number" v-model.number="score" @input="changeScore(score)"
                    v-tooltip.left="'hány pontot érjen a feladat'" />
                <small>pont</small>
            </div>
        </div>

    </div>
</template>