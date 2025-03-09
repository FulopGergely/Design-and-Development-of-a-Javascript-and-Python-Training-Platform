<script setup>
import { ref, computed  } from 'vue';
import store from '@/store/store.js';
import { setReview } from '@/firebase/test.js';
import router from '@/router/index.js';

const props = defineProps({
    scoreAchieved: {
        type: Number,
        default: () => 0
    },
    totalScore: {
      type: Number,
      default: () => 0
    }
})


//initialization
console.log(store.getters.getTestSheet.rating);

const ratingMap = store.getters.getTestSheet.rating ? new Map(Object.entries(store.getters.getTestSheet.rating)) : new Map();
console.log(ratingMap.get(store.getters.getCurrentUser.uid));  
const review = ref('');
const rating = ref(ratingMap.get(store.getters.getCurrentUser.uid) ? ratingMap.get(store.getters.getCurrentUser.uid) : 0);
console.log(ratingMap);

ratingMap.set(store.getters.getCurrentUser.uid, rating.value);

const iconClasses = computed(() => {
  if (rating.value === 1) {
    return {
      likeIcon: 'pi pi-thumbs-up-fill',
      likeClass: 'p-button-success',
      disLikeIcon: 'pi pi-thumbs-down',
      disLikeClass: 'p-button-secondary'
    };
  } else if (rating.value === -1) {
    return {
      likeIcon: 'pi pi-thumbs-up',
      likeClass: 'p-button-secondary',
      disLikeIcon: 'pi pi-thumbs-down-fill',
      disLikeClass: 'p-button-danger'
    };
  } else {
    return {
      likeIcon: 'pi pi-thumbs-up',
      likeClass: 'p-button-secondary',
      disLikeIcon: 'pi pi-thumbs-down',
      disLikeClass: 'p-button-secondary'
    };
  }
  
});


function submit(){
    setReview(store.getters.getTestSheet.tid, ratingMap, review)
    //resetStates
    store.commit('resetStates')
    store.commit('setTimer', 0) //resetStatesnel az időzítőt nem tudtam 0-ra állítani csak így
    router.push('/')
}
function toggleLike() {
    rating.value = rating.value === 1 ? 0 : 1;
    ratingMap.set(store.getters.getCurrentUser.uid, rating.value);
    store.commit('setRating', Object.fromEntries(ratingMap));
}

function toggleDisLike() {
    rating.value === -1 ? rating.value = 0 : rating.value = -1
    ratingMap.set(store.getters.getCurrentUser.uid, rating.value);
    store.commit('setRating', Object.fromEntries(ratingMap));
}

//kéne egy függvény amiben adj össze 2 db integert

</script>
<template>
    <div >
        <div class="flex justify-content-center fadein animation-duration-500">
            <div class="flex flex-column align-items-center justify-content-center border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                <div class="h-2rem"></div>
                <div class="text-2xl font-bold">Teszt eredménye</div>
                <div class="h-2rem"></div>
                <div class="text-4xl font-bold">{{ props.scoreAchieved }} / {{ props.totalScore }} pont</div>
                <div class="h-4rem"></div>
                <div>Teszt értékelése</div>
                <div class="h-1rem"></div>
                <div class="flex gap-2">
                    <Button :icon="iconClasses.likeIcon"  rounded :class="iconClasses.likeClass" @click="toggleLike()" />
                    <Button :icon="iconClasses.disLikeIcon"  rounded :class="iconClasses.disLikeClass" @click="toggleDisLike()" />  
                </div>
                <div class="h-5rem"></div>
                <div>Ossza meg véleményét (anonime)</div>
                    <Textarea class="m-3" v-model="review" variant="filled" rows="5" cols="50" />
                    <Button @click="submit" class="mb-2 mt-2 ml-5">Küldés</Button>
            </div>
        </div>
    </div>
    
</template>
