<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
//components
import NavBar from '@/components/home/NavBar.vue'
import Question from '@/components/test/Question.vue'

const userId = ref('');
onMounted(() => {
    //const route = useRoute();
    //console.log('Test ID:', route.params.testID);
});
</script>
<template>
    <NavBar />
    <Question />
    {{ this.$route.params.testID }}
</template>