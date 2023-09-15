<script>
import {defineComponent, shallowRef} from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

export default defineComponent({
  components: {
    Codemirror
  },
  props: {
    sideProps: Number,
    readOnlyProps: Boolean,
  },
  setup() {
    //const code = ref(`console.log('Hello, world!'); 2+2;`)
    const extensions = [javascript(), oneDark]

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    // Status is available at all times via Codemirror EditorView
    /*
     const getCodemirrorStates = () => {
      const state = view.value.state
      const ranges = state.selection.ranges
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
      const cursor = ranges[0].anchor
      const length = state.doc.length
      const lines = state.doc.lines
      // more state info ...
      // return ...
    }
    *
    */


    return {
      extensions,
      handleReady,
      log: console.log
    }
  },
  data() {
    return {
      result: '',
      code: this.$store.state.tasksJs[this.sideProps-1].ecode,
      readOnly: this.readOnlyProps,
    };
  },
  methods: {
    runCode() {
      try {
        // JavaScript kód kiértékelése
        this.result = eval(this.code);
      } catch (error) {
        console.error('Hiba a kód futtatása közben:', error);
      }
    },
  },
})
</script>

<template>

  <codemirror
      placeholder="Code goes here..."
      :style="{ borderRadius: '20px;' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :disabled="this.readOnly"
      v-model="code"
      @ready="handleReady"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
  />
  <button v-if="!readOnly" class="mt-3 mb-3 btn btn-secondary" @click="runCode">Futtatás</button>
  <div> output: {{result}} </div>
</template>

<style scoped>


</style>