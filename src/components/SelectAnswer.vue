<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SelectAnswer",
  props: {
    answerButtons: Array,
  },
  data() {
    return {
      a: this.answerButtons,
    }
  },
  methods: {
    CorrectChoiceButton(index) {
      console.log(index)
    }
  },
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div v-for="(button, index) in answerButtons" :key="index"  class="col-auto mb-2">
        <button v-if="button === null" type="button"
                class="btn btn-secondary"
                @click="CorrectChoiceButton(button)"
        > NaN </button>
        <button v-else type="button"
                class="btn btn-secondary"
                @click="CorrectChoiceButton(button)"
        > {{button}} </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>