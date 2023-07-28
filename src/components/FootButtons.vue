<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FootButtons"
})
</script>

<template>
  <footer>
    <div class="p-2 bg-light border rounded-3">
      <div class="d-flex justify-content-evenly">
        <button type="button" class="btn btn-danger">Vissza</button>
        <button type="button" class="btn btn-success">Következő</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>