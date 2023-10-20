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
      try {
        return this.$store.state.tasks[this.$store.state.side-1].tests
      } catch (error) {
        console.log('out of index')
        return error
      }
    },
    disableBackButton() {
      return this.$store.state.side == 1 ? true : false
    },
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
        <button :class="{disabled:disableBackButton}" 
                type="button"
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