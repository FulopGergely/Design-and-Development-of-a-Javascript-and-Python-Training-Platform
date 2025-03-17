<script setup>
import store from '@/store/store.js';
import { ref, nextTick, computed } from "vue";

const emit = defineEmits(['changeParamType'])



const paramsNameList = ref([
    { name: 'string' },
    { name: 'number' },
    { name: 'boolean' },
    { name: 'JSON' },
]);
const paramsNameList2 = ref([
    { name: 'string' },
    { name: 'number' },
    { name: 'boolean' },
    { name: 'dictionary' },
]);

function addParam() {
    const param = {
        id: store.getters.getParamsByCurrentSide.length + 1,
        type: { name: 'string' },
        value: null,
    }
    store.commit('addParam', param)
}
async function deleteParam(param) {
    if (param.value === '' || param.value === null || (isNaN(param.value) && param.type.name == 'number')) {
        setTimeout(() => { //Utolsó elem törlésénél hibát dobott, PrimeVUe-ban erre nincs hivatalos támogatás vagy javítás, a hiba elkerülésére setTimeout-ot használtam
            store.commit('deleteParam', param.id);
        }, 1);
    }
}

</script>
<template>
    <!-- -->
   
    <div>
        <div v-for="param in store.getters.getParamsByCurrentSide" :key="param.id" class="mt-5 ml-5 mr-5"
            style="margin-right: 60px;">
            <Inplace @close="deleteParam(param)" :closable="true" :pt="{
            display: (options) => ({
                class: [
                    'border-primary',
                    'text-primary',
                ],
            }),
        }">
                <template #display>
                    {{ param.id + '. paraméter' }}
                </template>
                <template #content>
                    <div>

                        <Textarea class="custom-textarea" v-model="param.value" @change="emit('changeParamType', param)"
                            autofocus :placeholder="param.id + '. paraméter értéke'" />
                        <div class="m-1"
                            v-if="param.type.name == 'JSON' && store.getters.getLanguage.value == 'javascript'">pl:
                            {
                            "str": "Hello, World!",
                            "num": 42,
                            "obj": {
                            "key1": "value1",
                            "key2": "value2"
                            },
                            "arr": [1, 2, 3],
                            "bool" : true
                            }
                        </div>
                        <div class="m-1"
                            v-if="param.type.name == 'dictionary' && store.getters.getLanguage.value == 'python'">pl:
                            {
                            "str": "Hello, World!",
                            "int": 42,
                            "list": [1, 2, 3],
                            "bool": True
                            } <br> (4 típus támogatott)
                        </div>
                    </div>

                    <div>
                        <Dropdown v-model="param.type" @change="emit('changeParamType', param)"
                            :options="store.getters.getLanguage.value == 'javascript' ? paramsNameList : paramsNameList2"
                            class="w-full md:w-14rem mr-2 mb-1" optionLabel="name" />
                    </div>
                </template>

                <template #closeicon>
                    <div
                        v-if="param.value === '' || param.value === null || (isNaN(param.value) && param.type.name == 'number')">
                        <i class="pi pi-trash"></i>
                    </div>
                    <div v-else>
                        <i class="pi pi-check"></i>
                    </div>

                </template>
            </Inplace>
        </div>
        <div class="grid mt-5 ml-5 mr-5">
            <Button :style="{ width: '100%' }" @click="addParam" class="text-left" label="Paraméter hozzáadása"
                icon="pi pi-plus" text />
        </div>
    </div>
</template>

<style scoped>
.custom-textarea {
    width: 100%;
    height: 77px;
    max-width: 100%;
}
</style>