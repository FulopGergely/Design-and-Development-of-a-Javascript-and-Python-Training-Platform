<script>
import '@/assets/main.css'
import { useFavicon } from '@vueuse/core'
import {defineComponent} from 'vue'
const icon = useFavicon()
//import js and python run
import JavascriptCodeEditor from '@/components/JavascriptCodeEditor.vue'
import PythonIDE from '@/components/PythonCodeEditor.vue'
//import components
import SelectAnswer from '@/components/SelectAnswer.vue'
import FootButtons from '@/components/FootButtons.vue'


export default defineComponent({
  name: "QuestionsComp",
  data() {
    return {
    }
  },
  components: {SelectAnswer, PythonIDE, FootButtons, JavascriptCodeEditor },
  created() {
    icon.value = '../../public/favicon.png'
    console.log('created')
    if(!localStorage.getItem('my-app')){
      this.$store.dispatch('initTasks', 'js')
    }
  },
  methods: {
    changeView(view) {
      this.$store.dispatch('initTasks', view)
      //console.log(this.$store.state.view)
      this.next()
      icon.value = '../../public/' + view + 'Favicon.png'
    },
    next() {
      this.$store.dispatch('changeSide', 1)
    },
    prev() {
      this.$store.dispatch('changeSide', -1)
    },
  },
  computed: {
    side() {
      return this.$store.state.side
    }
  }
})
</script>

<template>
    <div>
      <div class="container py-4">
        <div v-if="this.side != 0" class="p-3 mb-4 bg-light border rounded-3">
          <div class="d-flex align-items-start flex-column bd-highlight mb-1">
            <div class="mb-auto p-1 bd-highlight">{{ side }}. oldal</div>
          </div>
          <div class="container-fluid py-5">
            <div>
              <div v-for="task in this.$store.state.tasks" :key="task.id">
                <div v-if="side === task.id">
                  <div v-html="task.question" class="question"></div>
                  <hr />
                  <div v-html="task.q2" class="q2"></div>
                  <div v-if="task.img" class="img">
                    <img :alt="task.img" :src="task.img" />
                  </div>
                  <div v-if="task.links" class="links">
                    <span v-for="(link, i) in task.links" :key="i + 'link.a'">
                      | <a :href="link.href" :target="i + 'link.a'">{{ link.a }}</a> |
                    </span>
                  </div>
                  <div v-if="task.links2"></div>
                  <div v-if="task.variables" class="katex">
                    <div
                      class="katex"
                      v-html="task.variables.map((v) => `${v.name} = ${v.value}`).join('; ')"
                    />
                  </div>
                  <div v-if="task.ecode" class="p-3 m-4 bg-light border rounded-3">
                    <div class="ecode">Példaprogram</div>
                    <div>
                      <JavascriptCodeEditor :readOnlyProps="true" :codeProps="task.ecode" />
                    </div>
                  </div>
                  <div v-if="task.code" class="p-3 m-4 bg-light border rounded-3">
                    <div class="ecode">Kérem adja meg a megoldás kódját</div>
                    <div>
                      <JavascriptCodeEditor
                        v-if="this.$store.state.view === 'javascript'"
                        :readOnlyProps="false"
                        :codeProps="task.code"
                      />
                      <PythonIDE v-if="this.$store.state.view === 'python'" />
                    </div>
                  </div>
                  <div v-if="task.options" class="options">
                    <SelectAnswer :answerButtons="task.options" />
                  </div>
                  <div v-html="task.goodo" class="goodo"></div>
                  <div v-html="task.tex" class="tex"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-3 mb-4 bg-light border rounded-3">
          <div class="col-md-4">
            <label for="validationServer01" class="form-label">First name</label>
            <input type="text" class="form-control is-valid" id="validationServer01" value="Mark" required>
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
          <div class="col-md-6">
            <label for="validationServer03" class="form-label">City</label>
            <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer03Feedback" required>
            <div id="validationServer03Feedback" class="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
        </div>
        <!-- {{this.$store.state.tasks[0].code}} -->
        <FootButtons v-if="this.side != 0"  @prev="prev" @next="next" />
      </div>
    </div>
  </template>