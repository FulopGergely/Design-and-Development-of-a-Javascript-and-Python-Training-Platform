<script>
import {defineComponent} from 'vue'
import PythonIDE from "../components/PythonCodeEditor.vue";
import FootButtons from "@/components/FootButtons.vue";
import {useFavicon} from "@vueuse/core";

export default defineComponent({
  name: "PythonView",
  components: {FootButtons, PythonIDE, },
  data() {
    return {
      side: 1
    }
  },
  methods: {
    next() {
      this.side++
    },
    prev() {
      this.side--
      this.side === 0 ? this.$router.push('/') : this.side
    }
  },
  created() {
    const icon = useFavicon()
    icon.value = '../../public/py_favicon.png'
  },
  unmounted() {
    const icon = useFavicon()
    icon.value = '../../public/favicon.png'
  },
})
</script>

<template>
  <div>
    <div class="container py-4">
      <div class="p-5 mb-4 bg-light border rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Custom jumbotron</h1>
          <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
        </div>
      </div>
      <PythonIDE/>
      <FootButtons @prev="prev" @next="next"/>
    </div>


  </div>
</template>