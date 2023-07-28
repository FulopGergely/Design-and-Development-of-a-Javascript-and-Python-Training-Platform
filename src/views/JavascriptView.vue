<script>
import {defineComponent} from 'vue'
import FootButtons from "@/components/FootButtons.vue";
import JavascriptCodeEditor from "@/components/JavascriptCodeEditor.vue";
import content from "../assets/content.js";

export default defineComponent({
  name: "JavascriptView",
  components: {FootButtons, JavascriptCodeEditor},
    data() {
  return {
    asd: content,
  }
},
})
</script>

<template>
  <div>

    <div class="container py-4">
      <div class="p-5 mb-4 bg-light border rounded-3">
        <div class="container-fluid py-5">
          <div>
            <div v-for="item in asd" :key="item.id">
              <h2>{{ item.title }}</h2>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <JavascriptCodeEditor/>
      <FootButtons/>
    </div>


  </div>
</template>

<style scoped>

</style>