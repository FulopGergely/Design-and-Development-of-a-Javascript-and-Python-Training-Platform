<script setup>
import { ref, computed } from 'vue';
import store from '@/store/store.js';
import { getAllScore, addScore } from '@/firebase/score.js';
import { setReview } from '@/firebase/test.js';

const props = defineProps({
    scoreAchieved: {
        type: Number,
        default: () => 0
    },
})
const rating = ref(null);
const review = ref('');
const bool = ref(false);

function submit(){
    setReview(store.getters.getTestSheet.tid, rating, review)
    bool.value = true
}

</script>
<template>
    <div v-if="bool">
        átirányítás
    </div>
    <div v-else>
        <div class="flex justify-content-center fadein animation-duration-500">
            <div class="flex flex-column align-items-center justify-content-center border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                <div class="h-2rem"></div>
                <div class="text-2xl font-bold">Teszt eredménye</div>
                <div class="h-2rem"></div>
                <div class="text-4xl font-bold">{{ props.scoreAchieved }} pont</div>
                <div class="h-4rem"></div>
                <div>Milyen nehéznek érezte a tesztet? Ahol 1 csillag a könnyű, míg 5 csillag a nagyon nehéz:</div>
                <div class="h-1rem"></div>
                <Rating v-model="rating" :cancel="false"  />
                <div class="h-5rem"></div>
                <div>Kérjük, ossza meg velünk a véleményét vagy észrevételét a teszttel kapcsolatban, a kitöltés névtelen:</div>
                    <Textarea class="m-3" v-model="review" variant="filled" rows="5" cols="50" />
                    <Button @click="submit" class="mb-2 mt-2 ml-5">Küldés</Button>
            </div>
        </div>
    </div>
    
</template>
