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
const checked = ref(store.getters.getIsTest);
const checkedLabel = ref(store.getters.getIsTest == false ? 'Tesztesetek kikapcsolva' : 'Tesztesetek bekapcsolva')
const result = ref();
const isDisabled = computed(() => {
    return store.getters.getParamsByCurrentSide.length === 0 || store.getters.getTaskByCurrentSide.code == undefined;
});
const functionName = computed(() => { //js functionName
    if (props.selectLanguage == 'javascript') {
        let code = props.code
        let regex = /^(function|\s+function)\s+/
        code = code.replace(code.match(regex)?.[0], '');
        regex = /\w+/
        return code.match(regex)?.[0]
    } else {
        let codeCopy = props.code
        let regex = /^(def|\s+def)\s+/
        const matchResult = codeCopy.match(regex);
        if (matchResult) {// Ha találtunk egyezést, akkor végezzük el a replace műveletet
        codeCopy = codeCopy.replace(matchResult[0], '');
        } else {
        console.error('Nem találtunk egyezést a regex mintával.');
        }
        regex = /\w+/ //functionName
        return codeCopy.match(regex)?.[0]
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

watch(checked, (newValue) => {
    newValue ? checkedLabel.value = 'Tesztesetek bekapcsolva' : checkedLabel.value = 'Tesztesetek kikapcsolva'
    store.commit('isTest', newValue)
    if ( !newValue ){
        store.commit('setScore', 0)
        score.value = 0
    }
    
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
                    number: Math.floor(Math.random() * 100),
                    boolean: Math.floor(Math.random() * 2) === 0,
                }
            }
        }
        if (selectLanguage == 'python') {
            console.log(obj.type.name)
            if (obj.type.name == 'string') {
                return '"' + generateRandomString(10) + '"'
            }
            if (obj.type.name == 'number') {
                return Math.floor(Math.random() * 100);
            }
            if (obj.type.name == 'boolean') {
                return Math.floor(Math.random() * 2) === 0 ? 'True' : 'False'
            }
            if (obj.type.name == 'dictionary') {
                const obj = {
                    str: generateRandomString(10),
                    int: Math.floor(Math.random() * 100),
                    list: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
                }
                return JSON.stringify(obj)
            }
        }

    });
    if (selectLanguage == 'javascript') {
        try {
            const dynamicFunction = new Function('return ' + props.code)();
            result.value = dynamicFunction(...randomParamameters);
        } catch (error) {
            console.log(error)
        }

    }
    if (selectLanguage == 'python') {
        try {
            const res = await py.run(props.code + '\n' + functionName.value + '(' + randomParamameters + ')');
            if (res.error != null) {
                console.log(res.error)
            } else {
                result.value = res.results
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const myCase = {
        parameters: randomParamameters.map(param => param),
        result: result.value,
        parametersType: store.getters.getParamsByCurrentSide.map(item => item.type.name),
        resultType: typeof result.value
    };
    //ez a generált teszteseteknél fut le
    //pythonnál Map-et nem lehet firebase-en tárolni, ezért itt átalakítottam, és így tároljuk el a tesztesetet
    if (typeof myCase.result === 'object' && selectLanguage === 'python') {
        const mapToObject = map => Object.fromEntries(map.entries());
        myCase.result = mapToObject(myCase.result);
    }
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
    <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center  border-round ">
            <Checkbox v-model="checked" :binary="true" />
            <label for="ingredient1" class="ml-2"> {{ checkedLabel }} </label>
        </div>
        <div class="flex align-items-center justify-content-center  border-round "><i
                v-tooltip.left="'Ha kikapcsolja a tesztesetek részt, akkor ennél az oldalnál a pontszámot figyelmen kívül hagyja'"
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