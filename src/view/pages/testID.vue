<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
//components
import Login from '@/components/test/Login.vue'
import Question from '@/components/test/Question.vue'

const userId = ref('');
onMounted(() => {
    //const route = useRoute();
    //console.log('Test ID:', route.params.testID);
});
</script>
<template>
    <Login />
    <Question />
    {{ this.$route.params.testID }}
</template>