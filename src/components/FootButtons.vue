<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "FootButtons",
  props: {
    sideProps: Number,
  },
  data() {
    return {
    };
  },
  mounted() {

  },
  computed: {
    tests() {
      try {
        return this.$store.state.tasks[this.$store.state.side - 1].tests
      } catch (error) {
        console.log('out of index')
        return error
      }
    },
    disableBackButton() {
      return this.$store.state.side == 1 ? true : false
    },
    getCorrectTask() {
      return this.$store.getters.getCorrectTask
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
        <button :class="{ disabled: disableBackButton }" type="button" class="btn btn-danger"
          @click="prev">Vissza</button>
        <button v-if="tests && this.$store.state.correctTask[this.sideProps] == 0" type="button" class="btn btn-secondary"
          @click="next">Passz</button>
        <button v-if="!tests || this.$store.state.correctTask[this.sideProps] == 1" type="button" class="btn btn-success"
          @click="next">Következő</button>
      </div>
    </div>
    {{ getCorrectTask }}
  </footer>
</template>

<style scoped></style>