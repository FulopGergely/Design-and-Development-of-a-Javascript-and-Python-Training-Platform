<script setup>
import store from '@/store/store.js';
import { ref, computed } from "vue";





</script>
<template>
    <!-- -->
    <div>
        <div class="mt-5 ml-5 mr-5" style="margin-right: 60px;">
            <Inplace :closable="true">
                <template #display>
                    {{ text || '1. paraméter' }}
                </template>
                <template #content>
                    <Textarea class="custom-textarea" v-model="text" autofocus />
                </template>
            </Inplace>
        </div>
        <div class="grid mt-5 ml-5 mr-5">
            <Button :style="{ width: '100%' }" class="text-left" label="Paraméter hozzáadása" icon="pi pi-plus" text />
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