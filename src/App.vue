<script setup>
import store from '@/store/store.js';
import { computed } from "vue";
//components

//import Welcome from '@/components/home/welcome.vue'



const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy



</script>



<template>
 
 
  <div v-if="!store.getters.getLoginLoading">
      <router-view />
  </div>
  <div v-else>
            <div class="flex justify-content-center flex-wrap">
                <ProgressSpinner />
            </div>
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

