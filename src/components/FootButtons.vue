<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FootButtons",
  data() {
    return {
    };
  },
  methods: {
    next() {
      this.$emit('next')
    },
    prev() {
      this.$emit('prev')
    }
  },
})
</script>

<template>
  <footer>
    <div class="p-2 bg-light border rounded-3">
      <div class="d-flex justify-content-evenly">
        <button type="button"
                class="btn btn-danger"
                @click="prev"
        >Vissza</button>

        <button type="button"
                class="btn btn-success"
                @click="next"
        >Következő</button>

      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>