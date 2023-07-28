<script>
import {defineComponent} from 'vue'
import FootButtons from "@/components/FootButtons.vue";

export default defineComponent({
  name: "JavascriptView",
  components: {FootButtons},
})
</script>

<template>
  <div>

    <div class="container py-4">
      <div class="p-5 mb-4 bg-light border rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Custom jumbotron</h1>
          <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
        </div>
      </div>
      <FootButtons/>
    </div>


  </div>
</template>

<style scoped>

</style>