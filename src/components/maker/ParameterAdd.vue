<script setup>
import store from '@/store/store.js';
import { ref, computed } from "vue";





</script>
<template>
    <!-- -->
    <div>
        <div class="grid">
            <div class="col">
                <div
                    class="mt-2 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="col">
                <Button :style="{ width: '100%' }" class="text-left" label="Paraméter hozzáadása" icon="pi pi-plus" text />
            </div>
        </div>
    </div>
</template>

<style scoped></style>