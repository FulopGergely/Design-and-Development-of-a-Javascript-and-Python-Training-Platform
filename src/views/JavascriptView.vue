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
      this.side < 0 ? this.side = 0 : this.side
    }
  },
})
</script>

<template>
  <div>

    <div class="container py-4">

      <div class="p-3 mb-4 bg-light border rounded-3">
        <div class="d-flex align-items-start flex-column bd-highlight mb-1">
          <div class="mb-auto p-1 bd-highlight">{{side}}</div>
        </div>
        <div class="container-fluid py-5">
          <div>
            <div v-for="item in this.$store.state.tasks" :key="item.id">
              <div v-if="side===item.id">
                <div v-html="item.question" class="question" ></div><hr>
                <div v-html="item.q2" class="q2"></div>
                <div v-html="item.img" ></div>
                <div v-html="item.img2" ></div>
                <div v-if="item.links" >
                  <span v-for="(link, i) in item.links" :key="i+'link.a'">
                            | <a :href="link.href" :target="i+'link.a'">{{ link.a }}</a> |
                        </span>
                </div>
                <div v-if="item.links2" ></div>
                <div v-if="item.ecode" class="kcim">Példaprogram</div>
                <div v-html="item.ecode" ></div>
                <div v-html="item.variables" ></div>
                <div v-html="item.tests" ></div>
                <div v-html="item.code" ></div>
                <div v-html="item.rans" ></div>
                <div v-html="item.options" ></div>
                <div v-html="item.goodo" ></div>
                <div v-html="item.tex" ></div>
                <div v-if="item.code">
                  <JavascriptCodeEditor :sideValue="side"/>
                </div>
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