<script>
import { defineComponent, ref, onBeforeMount, shallowRef } from 'vue';
import { usePython } from 'usepython';
import { PyStatus, PyCodeBlock } from 'vuepython';
import { Codemirror } from 'vue-codemirror'
import { oneDark } from "@codemirror/theme-one-dark";
import { watch } from 'vue';
import "vuepython/style.css";
import "highlight.js/styles/stackoverflow-light.css"

export default defineComponent({
  name: 'PythonIDE',
  data() {
    return {
      code2: ''
    }
  },
  props: {
    codeProps: String,
  },
  components: { PyCodeBlock, PyStatus, Codemirror },
  setup() {
    const extensions = [usePython(), oneDark]

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    const py = usePython();
    const code = ref(`c = 2\n`);
    const codeInput = ref(''); // A kódot tartalmazó input mező

    // Figyeljük a codeInput változó változásait
    watch(codeInput, (newValue) => {
      // Frissítjük a code változót az input mező értékével
      code.value = newValue;
    });

    async function init() {
      await py.load();
    }

    onBeforeMount(() => init());

    function handleResult(result) {
      console.log(code)
      console.log(py)
      console.log('Eredmény:', result);
    }

    function updateCode() {
      // Manuálisan frissítjük a code változót
      code.value = `c = 2\nresult`;
    }

    return {
      py,
      code,
      updateCode,
      codeInput,
      handleResult,
      extensions,
      handleReady,
      log: console.log
    };
  },
  methods: {
    asd(a) {
      console.log(a.data)
      //a.data
    }
  }
});
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="flex justify-end flex-grow">
        <py-status :py="py"></py-status>
      </div>
    </div>
    <div class="row">
      <div class="outer">
        <div class="top">
          <codemirror placeholder="Code goes here..." :style="{ borderRadius: '20px;' }" :autofocus="true"
            :indent-with-tab="true" :tab-size="2" :extensions="extensions" v-model="codeInput" @ready="handleReady"
            @focus="log('focus', $event)" @blur="log('blur', $event)" />
        </div>
        <div class="bot">
          <py-code-block style="overflow: hidden;" id="script" :py="py" :code="code" @input="asd"
            @result="handleResult"></py-code-block>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped></style>