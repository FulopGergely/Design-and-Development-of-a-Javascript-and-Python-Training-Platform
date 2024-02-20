<script setup>
import store from '@/store/store.js';
import { ref, computed } from "vue";
//components
import NavBar from '@/components/home/NavBar.vue'

const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy



</script>

<template>
  <div v-if="hasCurrentUser">
    <router-view />
  </div>
  <div v-else>
    <NavBar />
  </div>
</template>


