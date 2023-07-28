<script>
import {defineComponent} from 'vue'
import {RouterLink} from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: { RouterLink}
})
</script>

<template>

  <div class="container">
    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
      <RouterLink to="/python" class="fs-3 text-decoration-none">python&nbsp;&nbsp;</RouterLink>
      <RouterLink to="/javascript" class="fs-3 text-decoration-none"> javascript</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>