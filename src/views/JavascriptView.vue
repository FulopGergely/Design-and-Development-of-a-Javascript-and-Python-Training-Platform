<script>
import {defineComponent} from 'vue'
import FootButtons from "@/components/FootButtons.vue";
import JavascriptCodeEditor from "@/components/JavascriptCodeEditor.vue";
import config from "../assets/js_alapok.js";
config.tasks = config.tasks.map( (v,i) => v={ id:i+1, ...v } )

export default defineComponent({
  name: "JavascriptView",
  components: {FootButtons, JavascriptCodeEditor},
    data() {
      return {
        data: config
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
            <div v-for="item in data.tasks" :key="item.id">
              <div v-if="1===item.id">
                <h2>{{ item.q2 }}</h2>
                <p>{{ item.question }}</p>
              </div>
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