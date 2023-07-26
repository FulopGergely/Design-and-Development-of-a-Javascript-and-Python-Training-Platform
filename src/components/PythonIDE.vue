<template>
  <div class="flex flex-row w-full p-3 primary">
    <div class="text-2xl">Vue Python</div>
    <div class="flex justify-end flex-grow">
      <py-status :py="py"></py-status>
    </div>
  </div>
  <div class="container mx-auto">
    <div class="p-8">
      <py-code-block id="script" :py="py" :code="code"></py-code-block>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import { onBeforeMount } from 'vue';
import { usePython } from "usepython";
import { PyStatus, PyCodeBlock } from "vuepython";
import "vuepython/style.css";
import "highlight.js/styles/stackoverflow-light.css"

const py = usePython()
const code = `print('starting python script')
a = 1
b = 2
print('finished python script')
c = a + b
# return value
c`;


export default defineComponent({
  name: "PythonIDE",
  components: {PyCodeBlock, PyStatus},
  setup() {
    async function init() {
      await py.load();
    }
    onBeforeMount(() => init());
  },
  data() {
    return {
      code: code,
      py: py,
    }
  },
})
</script>

<style scoped>

</style>