<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FootButtons",
  props: {
    sideProps: Number,
  },
  data() {
    return {
    };
  },
  computed: {
    tests() {
      return this.$store.state.tasks[this.sideProps-1].tests
    }
  },
  methods: {
    next() {
      this.$emit('next')
    },
    prev() {
      this.$emit('prev')
    },
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
        <button v-if="tests" type="button"
                class="btn btn-secondary"
                @click="pass"
        >Passz</button>
        <button v-if="tests" type="button"
                class="btn btn-secondary"
                @click="reset"
        >Reset</button>
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