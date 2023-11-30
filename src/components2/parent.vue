<script setup>
import { ref } from 'vue'
import MiddleChild from './middleChild.vue';



const val = ref('')
function main(e) {
    console.log(e)
    val.value = e.target.value
}

</script>

<template>
    <MiddleChild @params-change="main" />
    {{ val }}
</template>


