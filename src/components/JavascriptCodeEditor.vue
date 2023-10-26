<script>
import {defineComponent, shallowRef} from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import {oneDark} from "@codemirror/theme-one-dark";

export default defineComponent({
  components: {
    Codemirror
  },
  props: {
    readOnlyProps: Boolean,
    codeProps: String,
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
      resultCode: '',
      asd: '',
    };
  },
  methods: {
    runCode() {
      const originalConsoleLog = console.log;
      const originalAppendChild = Element.prototype.appendChild;
      const originalRemoveChild = Element.prototype.removeChild;
      try { 
      // Felülírjuk a console.log függvényt, hogy az eredményeket begyűjtsük
      let consoleOutput = '';
      console.log = function(output) {
      consoleOutput += output + '\n'; // Új sorban logoljuk az eredményeket
      originalConsoleLog.apply(console, arguments); // Eredeti console.log hívása
      };

      
      Element.prototype.appendChild = function (child) {
        console.log("appendChild:", child);
      };

      Element.prototype.removeChild = function (child) {
        console.log("removeChild:", child);
        
      };
      
      document.write = function(content) {
        console.log(content); // Kiírás a konzolra
      };
      
        const dynamicFunction = new Function(this.code);
        dynamicFunction();
        this.resultCode = consoleOutput;
      } catch (error) {
        this.resultCode = 'Hiba: ' + error;
      } finally {
        // Visszaállítjuk az eredeti console.log függvényt
        console.log = originalConsoleLog;
        Element.prototype.appendChild = originalAppendChild;
        Element.prototype.removeChild = originalRemoveChild;
      }
    },
  },
})
</script>

<template>

  <codemirror
      placeholder="Code goes here..."
      :style="{ borderRadius: '20px;'}"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :disabled="this.readOnly"
      v-model="code"
      @ready="handleReady"
      @change="$store.dispatch('changeCode', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
  />
  <button v-if="readOnly" class="mt-3 mb-3 btn btn-secondary" @click="runCode">Példa futtatása</button>
  <button v-if="!readOnly" class="mt-3 mb-3 btn btn-secondary" @click="runCode">Megoldás futtatása</button>
  <div> {{resultCode}} </div>
  <div v-if="this.error"> {{this.error}} </div>
</template>

<style scoped>


</style>