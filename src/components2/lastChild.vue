<script setup>
import { ref } from 'vue'


const emits = defineEmits(['paramsChange'])

function pass(e) {
    console.log(e)
    emits('paramsChange', e)
}


</script>

<template>
    <input @input="$emit('paramsChange', $event)">
</template>


