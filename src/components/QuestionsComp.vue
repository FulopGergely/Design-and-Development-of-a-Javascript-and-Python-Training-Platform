<script>
import '@/assets/main.css'
import { useFavicon } from '@vueuse/core'
import { defineComponent } from 'vue'
const icon = useFavicon()
//import js and python run
import JavascriptCodeEditor from '@/components/JavascriptCodeEditor.vue'
import PythonIDE from '@/components/PythonCodeEditor.vue'
//import components
import SelectAnswer from '@/components/SelectAnswer.vue'
import FootButtons from '@/components/FootButtons.vue'
//import firabase
import firebaseObjects from '@/firebase/index.js'
const db = firebaseObjects.db;
import { collection, getDocs, query, updateDoc, doc } from 'firebase/firestore';
var refreshIntervalId;



export default defineComponent({
  name: "titlesComp",
  data() {
    return {
      tests: [],
      test_id: null,
      isValid: true,
    }
  },
  mounted() {
    this.$store.dispatch('initTasks', 'javascript');
    clearInterval(refreshIntervalId);
    this.$store.dispatch('changeCountdownTime', this.$store.state.countDownTime - 1)
    refreshIntervalId = setInterval(() => {
      this.$store.dispatch('startCountdown');
    }, 1000);
    //this.$store.commit('InitCorreactArrayLenght', this.$store.state.tasks.length)
    //console.log(this.$store.state.correctTask)
  },
  components: { SelectAnswer, PythonIDE, FootButtons, JavascriptCodeEditor },
  created() {
    this.getAllDocument('tests')
    icon.value = '../../public/favicon.png'
    if (!localStorage.getItem('my-app')) {
      this.$store.dispatch('initTasks', 'js')
    }
  },
  methods: {
    async getAllDocument(collectionName) {
      const querySnap = await getDocs(query(collection(db, collectionName)));
      querySnap.forEach((doc) => {
        this.tests.push(doc.data())
        //console.log(doc.data())
      })
    },
    //adatbázishoz hozzáadjuk a kiválasztott test_id értéket, refId segítségével, amit GoogleLoginnál mentettünk el. 
    async updateSelectedTesdId() {
      //this.$store.state.auth.docRef
      await updateDoc(doc(db, 'users', this.$store.state.auth.docRef), {
        test_id: this.test_id
      })
    },
    /*changeProgrammingLanguageName(programmingLanguageName) {
      this.$store.dispatch('initTasks', programmingLanguageName)
      //console.log(this.$store.state.programmingLanguageName)
      this.next()
      icon.value = '../../public/' + programmingLanguageName + 'Favicon.png'
    },*/
    next() {
      this.$store.dispatch('changeSide', 1)
    },
    prev() {
      this.$store.dispatch('changeSide', -1)
    },
    submit() {
      const found = this.tests.find(test => test.test_id === this.test_id)
      if (found) {
        this.$store.dispatch('changeCountdownTime', found.testDurationMinutes * 60)
        this.$store.dispatch('initTasks', found.programmingLanguageName)
        //this.ChangeUser(found.test_id)//console.log(this.tests)
        this.updateSelectedTesdId()
        this.next()
        this.isValid = true
        console.log(this.$store.state.tasks.length)
        this.$store.commit('InitCorreactArrayLenght', this.$store.state.tasks.length)

      } else {
        this.isValid = false
      }
    },

  },
  computed: {
    side() {
      return this.$store.state.side
    },
    formattedCountdown() {
      if (this.$store.state.countDownTime == 0) {
        //pontszám Comp Betöltése
      }
      return this.$store.getters.formattedCountdown;
    },
  },
})
</script>

<template>
  <div>
    <div class="container py-4">
      <div v-if="this.side != 0" class="p-3 mb-4 bg-light border rounded-3 ">
        <div class="d-flex justify-content-between bd-highlight mb-1">
          <div class="mb-auto p-1 bd-highlight">{{ side }}. oldal</div>
          <div v-if="this.$store.state.correctTask[this.side] == 1" class="mb-auto p-1 bd-highlight">
            <img alt="correct.img" src="/public/correct.png" />
          </div>
          <div class="mb-auto p-1 bd-highlight">{{ formattedCountdown }}</div>
        </div>
        <div class="container-fluid py-5">
          <div>
            <div v-for="task in this.$store.state.tasks" :key="task.id">
              <div v-if="side === task.id">
                <div v-html="task.title" class="title"></div>
                <hr />
                <div v-html="task.text" class="text"></div>
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
                  <div class="katex" v-html="task.variables.map((v) => `${v.name} = ${v.value}`).join('; ')" />
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
                    <JavascriptCodeEditor v-if="this.$store.state.programmingLanguageName === 'javascript'"
                      :readOnlyProps="false" :codeProps="task.code" :sideProps="side" />
                    <PythonIDE v-if="this.$store.state.programmingLanguageName === 'python'" />
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
        <form @submit.prevent="submit" class="needs-validation">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">teszt ID</span>
            <input v-model="test_id" :class="{ 'form-control': true, 'is-invalid': !isValid }" type="number"
              class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              required>
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
      <FootButtons v-if="this.side != 0" @prev="prev" @next="next" :sideProps="side" />
    </div>

  </div>
</template>