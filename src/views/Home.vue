<script>
import {defineComponent} from 'vue'
import {RouterLink} from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {RouterLink}
})
</script>

<template>
<div>
  <RouterLink to="/python">python</RouterLink>
  <RouterLink to="/javascript">javascript</RouterLink>
</div>
</template>

<style scoped>

</style>