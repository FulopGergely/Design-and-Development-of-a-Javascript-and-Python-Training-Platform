<script setup>
import store from '@/store/store.js';
import { ref, computed } from "vue";
import router from '@/router/index.js';
//components
import NavBar from '@/components/home/NavBar.vue'
//import Welcome from '@/components/home/welcome.vue'

import { defineAsyncComponent } from 'vue';

const Welcome = defineAsyncComponent(() =>
  import('@/components/home/welcome.vue')
);

const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy



</script>



<template>
 
  <div v-if="hasCurrentUser">
    <router-view />
  </div>
  <div v-else>
    <router-view />
    <Welcome/>
  </div>
    
</template>



<!-- 
<template>
  <div>
    <router-view />
    
  </div>
  
  <div v-if="this.$route.params.testID">
    {{ this.$route.params.testID }}
    <router-view />
  </div>
  <div v-else>
    Admin és /
  </div>

  <div v-if="hasCurrentUser">
    <router-view />
  </div>
  <div v-else>
    <NavBar />
  </div>
    

</template>
-->




<style scoped>

</style>

