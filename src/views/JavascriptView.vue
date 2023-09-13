<script>
import {defineComponent} from 'vue'
import FootButtons from "@/components/FootButtons.vue";
import JavascriptCodeEditor from "@/components/JavascriptCodeEditor.vue";

export default defineComponent({
  name: "JavascriptView",
  components: {FootButtons, JavascriptCodeEditor},
    data() {
      return {
        side: 1,
      }
  },
  methods: {
    next() {
      this.side++;
    },
    prev() {
      this.side--;
    },
  },
  watch: {
    side() {
      this.side < 1 ? this.side = 1 : this.side
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
            <div v-for="item in this.$store.state.tasks" :key="item.id">
              <div v-if="side===item.id">
                <p >{{ item.question }}</p>
                <h2 >{{ item.q2 }}</h2>
                <div v-if="item.code">
                  <JavascriptCodeEditor/>
                </div>
                <p>oldal: {{item.id}}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- {{this.$store.state.tasks[0].code}} -->
      <FootButtons
          @prev="prev"
          @next="next"
      />

    </div>


  </div>
</template>

<style scoped>

</style>