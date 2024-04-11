<script setup>
import store from '@/store/store.js';
import { ref, computed,watch } from "vue";



const props = defineProps({
    tasks: {
        type: Array,
        default: () => []
    },
    currentSide: {
        type: String,
        default: () => ''
    },
})

const a = ref(store.getters.getCurrentTestSide)

const currentStep = ref(0);
// Dinamikusan frissíti az "activeStep" értékét a store.getters.getCurrentTestSide alapján
watch(() => store.getters.getCurrentTestSide, (newValue) => {
  currentStep.value = newValue - 1; // Mivel az index 0-tól kezdődik, ezért kivonunk 1-et
});

</script>

<template>
    <!-- -->


    <div class="card">
        <Steps :model="tasks" class="mt-8 mb-6" :activeStep="currentStep" :readonly="false">

            <template #item="{ item, active, index }">
                <span
                    :class="['inline-flex justify-content-center align-items-center border-circle border-primary border-1 h-2rem w-2rem z-1 cursor-pointer', { 'bg-primary': active, 'surface-overlay text-primary': !active }]">
                    {{active ? store.commit(props.currentSide, index + 1) : null}}
                    <div v-if="item.icon">
                        <i :class="[item.icon, 'text-xl']" />
                    </div>
                    <div v-else>
                        {{ index + 1 }}
                    </div>
                </span>
            </template>


        </Steps>
    </div>
</template>

<style scoped></style>