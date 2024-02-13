<script>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';

//components

const userId = ref('');
onMounted(() => {

    console.log('Test ID:', this.$route.params);
});
</script>
<template>
    {{ this.$route.params.testID }}
</template>