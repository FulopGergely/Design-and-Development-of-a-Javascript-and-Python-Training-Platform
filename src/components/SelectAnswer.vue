<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "SelectAnswer",
  props: {
    answerButtons: Array,
    sideProps: Number,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    getCorrectOptionsValue() {
      return this.$store.getters.getCorrectOptionsValue
    },
    getOptions() {
      return this.$store.getters.getOptions
    },
  },
  methods: {
    toggleButtonSelection(button) {
      this.$store.commit('changeDisableButton', true)
      if (button.label == this.$store.getters.getCorrectOptionsValue) {
        button.isSelected = true
        button.isCorrect = true
        this.$store.dispatch('correctTask', { correctTask: 1, side: this.sideProps })
      } else {
        button.isSelected = true
        button.isCorrect = false
      }
    }
  },
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div v-for="(button, index) in getOptions" :key="index" class="col-auto mb-2">
        <button type="button"
          :class="{ 'disabled': button.disableButton, 'btn btn-secondary': !button.isSelected, 'btn btn-success': button.isSelected && button.isCorrect, 'btn btn-danger': button.isSelected && !button.isCorrect }"
          @click="toggleButtonSelection(button)"> {{ button.label }} </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>