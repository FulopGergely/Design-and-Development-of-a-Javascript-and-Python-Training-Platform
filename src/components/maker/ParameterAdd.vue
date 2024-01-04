<script setup>
import store from '@/store/store.js';
import { ref, nextTick, computed } from "vue";




function addParam() {
    //console.log(store.getters.getParamsByCurrentSide.length)
    const obj = {
        id: store.getters.getParamsByCurrentSide.length + 1,
        value: null,
    }
    store.commit('addParam', obj)
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
                        'text-primary'
                    ],
                }),
            }">
                <template #display>
                    {{ param.id + '. paraméter' }}
                </template>
                <template #content>
                    <Textarea class="custom-textarea" v-model="param.value" autofocus />
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