<script>
import { defineComponent, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from "@codemirror/theme-one-dark";

export default defineComponent({
  components: {
    Codemirror
  },
  props: {
    readOnlyProps: Boolean,
    codeProps: String,
    sideProps: Number,
  },
  setup() {
    const extensions = [javascript(), oneDark]

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }
    return {
      extensions,
      handleReady,
      log: console.log
    }
  },
  data() {
    return {
      result: '',
      error: '',
      readOnly: this.readOnlyProps,
      code: this.codeProps,
      variables: this.$store.state.tasks[this.$store.state.side - 1].variables,
      tests: this.$store.state.tasks[this.$store.state.side - 1].tests,
    };
  },
  methods: {
    runCode() { //felülírt console log fut

      if (this.variables && this.variables.length > 0) {
        var param = this.variables[0].value
        const dynamicFunction = new Function(this.variables[0].name, this.code);
        console.log(dynamicFunction(param))
        this.correctAnswer(dynamicFunction(param), this.$store.state.tasks[this.$store.state.side - 1].result)
      } else {
        const dynamicFunction = new Function(this.code);
        dynamicFunction()
      }

    },
    correctAnswer(runAnswer, correctAnswer) {
      if (runAnswer == correctAnswer) {
        console.log('Helyes válasz')
        this.$store.dispatch('correctTask', { correctTask: 1, side: this.sideProps })
      }
    },
    isReturn() {
      //console.log(this.variables[0].value)
    },
    /*
    this.code -ban lévő console.log() függvényt felülírjuk hogy html elemben jelenjen meg.
    html manipulálást is felülírjuk hogy ha sandbox-ba valaki beír ilyet az ne tudjon változtatni az appon.
    */
    secureEnvironment() {

      const originalConsoleLog = console.log;
      const originalAppendChild = Element.prototype.appendChild;
      const originalRemoveChild = Element.prototype.removeChild;
      const originalDocumentWrite = document.write;
      try {
        // Felülírjuk a console.log függvényt, hogy az eredményeket begyűjtsük
        let consoleOutput = '';
        console.log = function (output) {
          consoleOutput += output + '\n'; // Új sorban logoljuk az eredményeket
        };
        Element.prototype.appendChild = function (child) {
          console.log("appendChild:", child);
        };
        Element.prototype.removeChild = function (child) {
          console.log("removeChild:", child);
        };
        document.write = function (content) {
          console.log(content); // Kiírás a konzolra
        };
        this.runCode()
        this.result = consoleOutput;
      } catch (error) {
        this.result = 'Hiba: ' + error;
      } finally {
        // Visszaállítjuk az eredeti függvény működést
        console.log = originalConsoleLog;
        Element.prototype.appendChild = originalAppendChild;
        Element.prototype.removeChild = originalRemoveChild;
        document.write = originalDocumentWrite;
      }
      /* 
      const newDiv = document.createElement('div');
      newDiv.textContent = 'Hello, World!';
      document.body.appendChild(newDiv);
      */
    }
  },
})
</script>

<template>
  <codemirror placeholder="Code goes here..." :style="{ borderRadius: '20px;' }" :autofocus="true" :indent-with-tab="true"
    :tab-size="2" :extensions="extensions" :disabled="this.readOnly" v-model="code" @ready="handleReady"
    @change="$store.dispatch('changeCode', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
  <button v-if="readOnly" class="mt-3 mb-3 btn btn-secondary" @click="secureEnvironment">Példa futtatása</button>
  <button v-if="!readOnly" class="mt-3 mb-3 btn btn-secondary" @click="secureEnvironment">Megoldás futtatása</button>
  <div> output: {{ result }} </div>
  <div v-if="this.error"> {{ this.error }} </div>
</template>

<style scoped></style>