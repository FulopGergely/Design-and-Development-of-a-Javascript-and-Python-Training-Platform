<script>
import {defineComponent} from 'vue'
import FootButtons from "@/components/FootButtons.vue";
import JavascriptCodeEditor from "@/components/JavascriptCodeEditor.vue";
import config from "../assets/js_alapok.js";
import PagesJS from "@/components/PagesJS.vue";
config.tasks = config.tasks.map( (v,i) => v={ id:i+1, ...v } )

export default defineComponent({
  name: "JavascriptView",
  components: {PagesJS, FootButtons, JavascriptCodeEditor},
    data() {
      return {
        data: config,
        side: 0,
        value: "asd"
      }
  },
  methods: {
    next() {
      this.side++;
    },
    increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    prev() {
      this.side--;
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
              <div v-if="side===item.id">
                <h2>{{ item.q2 }}</h2>
                <p>{{ item.question }}</p>
              </div>
            </div>
          </div>
          <input>
        </div>

      </div>

      {{value}}
      <PagesJS/>
      <JavascriptCodeEditor/>
      <FootButtons
          @prev="prev"
          @next="next"
      />
      <p>{{side}}</p>
      <button type="button"
              class="btn btn-success"
              @click="increment"
      >gomb++</button>
    </div>


  </div>
</template>

<style scoped>

</style>