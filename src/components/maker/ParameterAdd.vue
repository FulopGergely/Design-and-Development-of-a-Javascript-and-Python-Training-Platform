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

function addParam() {
    //console.log(store.getters.getParamsByCurrentSide.length)
    const param = {
        id: store.getters.getParamsByCurrentSide.length + 1,
        type: { name: 'string' },
        value: null,
    }
    store.commit('addParam', param)
}
async function deleteParam(param) {
    if (!param.value) {
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
                        <Textarea class="custom-textarea" v-model="param.value" @change="emit('changeParamType')" autofocus
                            :placeholder="param.id + '. paraméter'" />
                    </div>
                    <div>
                        <Dropdown v-model="param.type" @change="emit('changeParamType')" :options="paramsNameList"
                            class="w-full md:w-14rem mr-2 mb-1" optionLabel="name" />
                    </div>
                </template>
                <template #closeicon>
                    <div v-if="!param.value">
                        <i class="pi pi-trash"></i>
                    </div>
                    <div v-if="param.value">
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