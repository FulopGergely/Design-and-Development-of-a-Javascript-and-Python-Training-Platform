<script>
import { defineComponent, ref, onBeforeMount, shallowRef } from 'vue';
import { usePython } from 'usepython';
import { PyStatus, PyCodeBlock } from 'vuepython';
import 'vuepython/style.css';
import 'highlight.js/styles/atom-one-dark.css';
//codemirror
import { Codemirror } from 'vue-codemirror'




export default defineComponent({
  name: 'PythonIDE',
  props: {
    readOnlyProps: Boolean,
    codeProps: String,
    sideProps: Number,
    display: String,
  },
  data() {
    return {
      code: this.codeProps,
      editorOptions: {
        mode: 'python',
        theme: 'material', // téma
        lineNumbers: true, // Mutassa vagy rejtsük el a sorok számát
        readOnly: true,
      },
    }
  },
  components: { PyCodeBlock, PyStatus, Codemirror },
  setup() {
    //codemirror
    const code = ref(`console.log('Hello, world!')`)
    const extensions = []
    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }
    const py = usePython();
    async function init() {
      await py.load();
    }
    onBeforeMount(() => init());
    function handleResult(result) {
      console.log('Eredmény:', result);
    }
    return {
      py,
      handleResult,
      extensions,
      handleReady,
      log: console.log
    };
  },
  methods: {
    onInput(input) {
      console.log(input.target.value)
      //input.taget.value = 2
    }
  },
  computed: {
    getCodeDisplay() {
      return this.$store.getters.getCodeDisplay
    }
  }
});
</script>

<template>
  <div v-if="display == 'example'" class="container mx-auto">
    <codemirror v-model="this.code" :disabled="true"> </codemirror>
  </div>
  <div class="container mx-auto">
    <div class="flex flex-row w-full p-3 primary">
      <div class="flex justify-end flex-grow">
        <py-status :py="py"></py-status>
      </div>
    </div>
    <div class="p-8">
      <py-code-block id="script" @input="onInput" :py="py" :code="this.code" @result="handleResult"></py-code-block>
    </div>
  </div>
</template>






