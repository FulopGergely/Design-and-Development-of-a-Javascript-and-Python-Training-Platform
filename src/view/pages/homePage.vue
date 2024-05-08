<script setup>

//PrimeVue

//components
import NavBar from '@/components/home/NavBar.vue'

import { defineAsyncComponent } from 'vue';

const Welcome = defineAsyncComponent(() =>
  import('@/components/home/WelcomePage.vue')
);

//const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy




</script>
<template>
    <NavBar/>
    <Welcome/>
</template>