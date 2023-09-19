<script>
import { defineComponent } from 'vue'
import { useFavicon } from '@vueuse/core'
import FootButtons from '@/components/FootButtons.vue'
import JavascriptCodeEditor from '@/components/JavascriptCodeEditor.vue'

export default defineComponent({
  name: 'JavascriptView',
  components: { FootButtons, JavascriptCodeEditor },
  data() {
    return {
      side: 1,
    }
  },
  methods: {
    next() {
      this.side++
    },
    prev() {
      this.side--
      this.side < 0 ? this.$router.push('/') : this.side
    }
  },
  watch: {
    side() {
      this.side < 0 ? (this.side = 0) : this.side
    }
  },
  created() {
    const icon = useFavicon()
    icon.value = '../../public/js_favicon.png'
  },
  unmounted() {
    const icon = useFavicon()
    icon.value = '../../public/favicon.png'
  }
})
</script>

<template>
  <div>
    <div class="container py-4">
      <div class="p-3 mb-4 bg-light border rounded-3">
        <div class="d-flex align-items-start flex-column bd-highlight mb-1">
          <div class="mb-auto p-1 bd-highlight">{{ side }}</div>
        </div>
        <div class="container-fluid py-5">
          <div>
            <div v-for="task in this.$store.state.tasks" :key="task.id">
              <div v-if="side === task.id">
                <div v-html="task.question" class="question"></div>
                <hr />
                <div v-html="task.q2" class="q2"></div>
                <div v-if="task.img" class="img">
                  <img alt="js.png" src="../../public/js.png" />
                </div>
                <div v-if="task.links" class="links">
                  <span v-for="(link, i) in task.links" :key="i + 'link.a'">
                    | <a :href="link.href" :target="i + 'link.a'">{{ link.a }}</a> |
                  </span>
                </div>
                <div v-if="task.links2"></div>
                <div v-if="task.variables" class="katex">
                  <div class="katex" v-html="task.variables.map( v => `${ v.name } = ${ v.value }` ).join('; ')" />
                </div>
                <div v-if="task.ecode" class="p-3 m-4 bg-light border rounded-3">
                  <div class="ecode">Példaprogram</div>
                  <div>
                    <JavascriptCodeEditor :sideProps="side" :readOnlyProps="true"/>
                  </div>
                </div>
                <div v-if="task.code" class="p-3 m-4 bg-light border rounded-3">
                  <div class="ecode">Kérem adja meg a megoldás kódját</div>
                  <div>
                    <JavascriptCodeEditor :sideProps="side" :readOnlyProps="false"/>
                  </div>
                </div>
                <div v-html="task.options" class="options"></div>
                <div v-html="task.goodo" class="goodo"></div>
                <div v-html="task.tex" class="tex"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- {{this.$store.state.tasks[0].code}} -->
      <FootButtons @prev="prev" @next="next" />
    </div>
  </div>
</template>

<style scoped></style>