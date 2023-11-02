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
      logs: [],
    };
  },
  computed: {
    isCode() {
      return this.$store.getters.isCode
    },
  },
  methods: {
    runCode() { //felülírt console log fut
      let side = this.$store.state.side - 1
      //console.log(side)
      if (side < 4 || side == 5) {
        const dynamicFunction = new Function(this.code);
        dynamicFunction()
      }
      if (side >= 4 && side < 5) {
        var param = this.variables[0].value
        const dynamicFunction = new Function(this.variables[0].name, this.code);
        this.result = dynamicFunction(param)
        this.correctAnswer(this.result, this.$store.state.tasks[side].result)
      }

      /*
        const code = `
          return function(a, b) {
            var c = a + b; // Itt van a függvény törzse
            return c;
          }
        `;
        var param1 = this.variables[0].value
        var param2 = this.variables[1].value
        const dynamicFunction = new Function(this.variables[0].name, this.variables[1].name, code)();
        this.result = dynamicFunction(param1, param2)
        console.log(this.result)
        //this.correctAnswer(this.result, this.$store.state.tasks[this.$store.state.side - 1].result)
      */


      /*
            const dynamicFunction = new Function(this.code);
            dynamicFunction()
      */








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
      const originalAppendChild = Element.prototype.appendChild;
      const originalRemoveChild = Element.prototype.removeChild;
      const originalDocumentWrite = document.write;
      const originalConsoleLog = console.log;
      const logStorage = {
        logs: [],
        // Felülírt console.log függvény
        log: function (...args) {
          // Az üzeneteket a logs tömbbe mentjük
          this.logs.push(args.join(" "));
          // Eredeti console.log hívása
          originalConsoleLog.apply(console, args);
        }
      };
      try {
        console.log = function (...args) {
          logStorage.log(...args);
        };
        this.logs = logStorage.logs;
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
      } catch (error) {
        this.error = error;
      } finally {
        // Visszaállítjuk az eredeti függvény működést
        Element.prototype.appendChild = originalAppendChild;
        Element.prototype.removeChild = originalRemoveChild;
        document.write = originalDocumentWrite;
      }
      /* 
      const newDiv = document.createElement('div');
      newDiv.textContent = 'Hello, World!';
      document.body.appendChild(newDiv);
      */
    },
  },
})
</script>

<template>
  <codemirror placeholder="Code goes here..." :style="{ borderRadius: '20px;' }" :autofocus="true" :indent-with-tab="true"
    :tab-size="2" :extensions="extensions" :disabled="this.readOnly" v-model="code" @ready="handleReady"
    @change="$store.dispatch('changeCode', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
  <button v-if="!readOnly" class="mt-3 mb-3 btn btn-secondary" @click="secureEnvironment">Megoldás futtatása</button>
  <button v-if="readOnly && !isCode" class="mt-3 mb-3 btn btn-secondary" @click="secureEnvironment">Példa
    futtatása</button>
  <div v-if="this.logs">
    <div v-for="(log, index) in logs" :key="index">
      {{ log }}
    </div>
  </div>
  <div v-if="result">output: {{ result }}</div>
  <div v-else> {{ this.error }} </div>
</template>

<style scoped></style>