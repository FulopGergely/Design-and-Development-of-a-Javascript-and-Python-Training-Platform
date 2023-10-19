<script>
import '@/assets/main.css'
import { useFavicon } from '@vueuse/core'
import {defineComponent} from 'vue'
const icon = useFavicon()
//import vuex
import { mapGetters } from 'vuex';
//import js and python run
import JavascriptCodeEditor from '@/components/JavascriptCodeEditor.vue'
import PythonIDE from '@/components/PythonCodeEditor.vue'
//import components
import SelectAnswer from '@/components/SelectAnswer.vue'
import FootButtons from '@/components/FootButtons.vue'
//import firabase
import db from '@/firebase/index.js'
import { collection, getDocs, query } from 'firebase/firestore';


export default defineComponent({
  name: "QuestionsComp",
  data() {
    return {
      tests: [],
      test_id: null,
      isValid: true,
    }
  },
  mounted() {
    this.$store.dispatch('startCountdown');
  },
  components: {SelectAnswer, PythonIDE, FootButtons, JavascriptCodeEditor },
  created() {
    this.getAllDocument('tests')
    icon.value = '../../public/favicon.png'
    console.log('created')
    if(!localStorage.getItem('my-app')){
      this.$store.dispatch('initTasks', 'js')
    }
  },
  methods: {
    async getAllDocument(collectionName) {
      console.log('getAllDocument')
      const querySnap = await getDocs(query(collection(db, collectionName)));
      querySnap.forEach((doc) => {
        this.tests.push(doc.data())
        //console.log(doc.data())
      })
    },
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
    submit(){
      if (this.tests.map(test => test.test_id).includes(this.test_id)) {
        this.next()
        this.isValid = true
      } else {
        this.isValid = false
      }
    },
    handleCountdownEnd() {
      // Kezelni a lejárt visszaszámlálót
      console.log('A visszaszámláló lejárt!');
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    },
      
  },
  computed: {
    side() {
      return this.$store.state.side
    },
    ...mapGetters(['formattedCountdown']),
  },
})
</script>

<template>
    <div >
      <div class="container py-4">
        <div v-if="this.side != 0" class="p-3 mb-4 bg-light border rounded-3 ">
          <div class="d-flex justify-content-between bd-highlight mb-1">
            <div class="mb-auto p-1 bd-highlight">{{ side }}. oldal</div>
            <div class="mb-auto p-1 bd-highlight">{{ formattedCountdown  }}</div>
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
        <div v-else class="p-3 mb-4 bg-light border rounded-3 mx-auto " style="max-width: 450px;">
          <form @submit.prevent="submit" class="needs-validation" >
              <div class="input-group mb-3">
                  <span  class="input-group-text" id="inputGroup-sizing-default">teszt ID</span>
                  <input  v-model="test_id" :class="{'form-control':true, 'is-invalid' : !isValid}" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
                    <div v-if="!isValid" class="invalid-feedback">
                      Nem létezik ilyen id!
                    </div>
              </div>
            <div class="p-2 bd-highlight">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
            
       
        </div>
        <!-- {{this.$store.state.tasks[0].code}} -->
        <FootButtons v-if="this.side != 0"  @prev="prev" @next="next"  />
      </div>
      
    </div>
  </template>