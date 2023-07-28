<script>
import {defineComponent} from 'vue'
import PythonIDE from "../components/PythonIDE.vue";

export default defineComponent({
  name: "PythonView",
  components: {PythonIDE}
})
</script>

<template>
  <div>
   <PythonIDE/>
  </div>
</template>