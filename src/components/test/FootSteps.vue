<script setup>
import { ref, computed } from 'vue';
import store from '@/store/store.js';
import { getAllScore,addScore } from '@/firebase/score.js';

const props = defineProps({
    scoreAchieved: {
        type: Number,
        default: () => 0
    },
})

const emit = defineEmits(['finish'])

//PrimeVue
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

const isDisabled = computed(() => {
    return store.getters.getCurrentTestSide === 1;
});
const nextButtonLabel = computed(() => {
    if (store.getters.getTestSheet.task.length === store.getters.getCurrentTestSide) {
        return 'Teszt befejezése'
    }
    if (store.getters.getScoreEarned == store.getters.getScoreBySide){
        return 'Következő'
    }
    return 'Passz'
});

//const emit = defineEmits(['finsih'])

function back(){
    let reduction = store.getters.getCurrentTestSide
    reduction--
    store.commit('setCurrentTestSide', reduction)
}
function next(){
    let increase = store.getters.getCurrentTestSide
    if (store.getters.getTestSheet.task.length <= store.getters.getCurrentTestSide) {
        confirm1()
    } else {
        increase++
        store.commit('setCurrentTestSide', increase)
    }
}
const confirm1 = () => {
    confirm.require({
        message: 'Biztos befejezi a tesztet?',
        header: 'Teszt befejezése',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Nem',
        acceptLabel: 'Igen',
        accept: () => {
            submit()
            emit('finish', true)
        },
        reject: () => {
            
        }
    });
};
function submit() {
    const now = new Date();
    console.log(typeof props.scoreAchieved)
   /* const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    console.log(now)*/
  //currentTime.value = `${hours}:${minutes}:${seconds}`;
    console.log(now)
  addScore(store.getters.getTestSheet.uid, store.getters.getTestSheet.tid, props.scoreAchieved, now)
}

</script>
<template>
    <div class="flex justify-content-between flex-wrap">
        <Button :disabled="isDisabled" @click="back()" class="ml-5">Vissza</Button>
        <ConfirmDialog></ConfirmDialog>
        <Button  @click="next()" severity="success" class="mr-5">{{nextButtonLabel}}</Button>
    </div>
</template>
