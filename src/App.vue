<script setup>
import store from '@/store/store.js';
import { computed } from "vue";
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy
</script>


<template>
 
  <div v-if="hasCurrentUser">
    <router-view />
  </div>
  <div v-else>
    <router-view />
  </div>
    
</template>





<style scoped>

</style>

