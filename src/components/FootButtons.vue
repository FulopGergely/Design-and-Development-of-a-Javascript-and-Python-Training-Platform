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
      return this.handleErrors(() => this.$store.state.tasks[this.$store.state.side - 1].tests)
    },
    disableBackButton() {
      return this.$store.state.side == 1 ? true : false
    },
    getArrayCorrectTasks() {
      return this.$store.getters.getArrayCorrectTasks;
    },
    getType() {
      try {
        return this.$store.getters.getType
      } catch {
        return 0
      }
    },
    getTasksLength() {
      return this.$store.getters.getTasksLength
    },
    lastQuestion() {
      return this.getTasksLength === this.$store.state.side;
    },
  },
  methods: {
    handleErrors(callback) {
      try {
        return callback();
      } catch (error) {
        console.log('Hiba történt:', error);
        return error;
      }
    },
    next() {
      this.$emit('next')
    },
    prev() {
      this.$emit('prev')
    },
    async finish() {
      if (this.$store.state.finishTest == false) {
        this.$emit('submitTestResult')
        this.$store.commit('changeFinishTest', true)
      }
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
        <button v-if="getType != 'info' && this.$store.state.correctTask[this.sideProps] == 0" type="button"
          class="btn btn-secondary" @click="next">Passz</button>
        <button
          v-if="(getType == 'info' || this.$store.state.correctTask[this.sideProps] == 1) && (getTasksLength >= this.$store.state.side)"
          type="button" class="btn btn-success" @click="next">
          <div v-if="lastQuestion" @click="finish">Befejezés</div>
          <div v-else>Következő</div>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>