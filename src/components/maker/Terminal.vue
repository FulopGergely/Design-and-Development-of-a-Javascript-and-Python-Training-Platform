<script setup>
import { ref } from 'vue';


defineProps({
    logsName: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(['clearTerminal'])

function refresh() {
    emit('clearTerminal')
}


</script>
<template>
    <div>

        <div class="terminal">
            <div class="flex justify-content-between " style="height: 20px">
                <div style="height: 20px">
                    <span class="m-0 p-0">console log</span>
                </div>
                <div style="height: 20px">
                    <i v-tooltip.top="'console ürítése'" class="pi pi-refresh" @click="refresh"></i>
                </div>
            </div>
            <Button v-tooltip.bottom="'console ürítése'" v-if="false" @click="refresh" icon="pi pi-trash" style="top: 0"
                text rounded aria-label="refresh" />
            <div v-for="(log, index) in logsName" :key="index">
                > {{ log }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.terminal {
    overflow: auto;
    height: 240px;
    background-color: #374151;
    color: white;
}
</style>