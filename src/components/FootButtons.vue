<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FootButtons"
})
</script>

<template>
<div>
  <div>
    Foot
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Left</button>
      <button type="button" class="btn btn-warning">Middle</button>
      <button type="button" class="btn btn-success">Right</button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>