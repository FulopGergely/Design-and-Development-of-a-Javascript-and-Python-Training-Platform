<script setup>
import store from '@/store/store.js';
import { ref, computed } from "vue";

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



</script>
<template>
    <!-- -->



    <div class="card">

        <Steps :model="tasks" class="mt-8 mb-6" :activeStep="0" :readonly="false">

            <template #item="{ item, active, index }">
                <span
                    :class="['inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-2rem w-2rem z-1 cursor-pointer', { 'bg-primary': active, 'surface-overlay text-primary': !active }]">
                    {{ active ? store.commit(props.currentSide, index + 1) : null }}
                    {{ index + 1 }}
                </span>
            </template>


        </Steps>
    </div>
</template>

<style scoped></style>