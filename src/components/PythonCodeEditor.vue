<script>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { usePython } from 'usepython';
import { PyStatus, PyCodeBlock } from 'vuepython';
import 'vuepython/style.css';
import 'highlight.js/styles/atom-one-dark.css';

export default defineComponent({
  name: 'PythonIDE',
  props: {
    codeProps: String,
  },
  components: { PyCodeBlock, PyStatus },
  setup(props) {
    const py = usePython();
    const code = ref(`c = 2\n${props.codeProps}`);

    async function init() {
      await py.load();
    }

    onBeforeMount(() => init());

    function handleResult(result) {
      console.log('Eredmény:', result);
    }

    return {
      py,
      code,
      handleResult,
    };
  },
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-row w-full p-3 primary">
      <div class="flex justify-end flex-grow">
        <py-status :py="py"></py-status>
      </div>
    </div>
    <div class="p-8">
      <py-code-block id="script" :py="py" :code="code" @result="handleResult"></py-code-block>
    </div>
  </div>
</template>

<style scoped></style>