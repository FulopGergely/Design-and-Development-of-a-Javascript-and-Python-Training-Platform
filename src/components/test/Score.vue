<script setup>
import { ref, computed } from 'vue';
import store from '@/store/store.js';
import { getAllScore, addScore } from '@/firebase/score.js';
import { setReview } from '@/firebase/test.js';
import router from '@/router/index.js';

const props = defineProps({
    scoreAchieved: {
        type: Number,
        default: () => 0
    },
})
const isLiked = ref(null);
const disLiked = ref(null);
const rating = ref(0);
const review = ref('');

const likeIcon = computed(() => isLiked.value ? "pi pi-thumbs-up-fill" : "pi pi-thumbs-up");
const dislikeIcon = computed(() => disLiked.value ? "pi pi-thumbs-down-fill" : "pi pi-thumbs-down");

function submit(){
    setReview(store.getters.getTestSheet.tid, rating, review)
    //resetStates
    store.commit('resetStates')
    store.commit('setTimer', 0) //resetStatesnel az időzítőt nem tudtam 0-ra állítani csak így
    router.push('/')
}
function like() {
    isLiked.value = !isLiked.value;
    rating.value = rating.value === 1 ? 0 : 1;
    if (disLiked.value) disLiked.value = false;
}
function dislike() {
    disLiked.value = !disLiked.value;
    rating.value = rating.value === -1 ? 0 : -1;
    if (isLiked.value) isLiked.value = false;
}

</script>
<template>
    
    <div >
        <div class="flex justify-content-center fadein animation-duration-500">
            <div class="flex flex-column align-items-center justify-content-center border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                <div class="h-2rem"></div>
                <div class="text-2xl font-bold">Teszt eredménye</div>
                <div class="h-2rem"></div>
                <div class="text-4xl font-bold">{{ props.scoreAchieved }} pont</div>
                <div class="h-4rem"></div>
                <div>Teszt értékelése</div>
                <div class="h-1rem"></div>
                <div class="flex gap-2">
                    <Button :icon="likeIcon"  rounded :class="{'p-button-success': isLiked, 'p-button-secondary': !isLiked}" @click="like" class="rounded" />
                    <Button :icon="dislikeIcon"  rounded :class="{'p-button-danger': disLiked, 'p-button-secondary': !disLiked}"  @click="dislike" />
                    {{ rating }}
                </div>
                <div class="h-5rem"></div>
                <div>Ossza meg véleményét a teszttel kapcsolatban (anonime)</div>
                    <Textarea class="m-3" v-model="review" variant="filled" rows="5" cols="50" />
                    <Button @click="submit" class="mb-2 mt-2 ml-5">Küldés</Button>
            </div>
        </div>
    </div>
    
</template>
