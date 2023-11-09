<script>
import '@/assets/main.css'
import { useFavicon } from '@vueuse/core'
import { defineComponent } from 'vue'
const icon = useFavicon()
//import js and python run
import JavascriptCodeEditor from '@/components/JavascriptCodeEditor.vue'
//import components
import SelectAnswer from '@/components/SelectAnswer.vue'
import FootButtons from '@/components/FootButtons.vue'
import FinalResults from '@/components/FinalResults.vue'
//import firabase
import firebaseObjects from '@/firebase/index.js'
const db = firebaseObjects.db;
import { collection, getDocs, query, updateDoc, doc } from 'firebase/firestore';
var refreshIntervalId;

//python
import { ref, onBeforeMount, shallowRef } from 'vue';
import { usePython } from 'usepython';
import { PyCodeBlock } from 'vuepython';
import 'vuepython/style.css';
import 'highlight.js/styles/atom-one-dark.css';
//codemirror
import { Codemirror } from 'vue-codemirror'
//setup
import { useStore } from 'vuex';
import { computed } from 'vue';
import { watch } from 'vue';
import { onMounted } from 'vue';



export default defineComponent({
  name: "titlesComp",
  data() {

    return {
      tests: [],
      test_id: null,
      isValid: true,
      testResult: null,
      code: '',

    }
  },
  setup() {
    const store = useStore();
    let firstLineValid = ref(false);
    let lastLineValid = ref(false);
    onMounted(() => {
      console.log('A komponens mounted hook-ja futott le');
      //currentCode mindig az aktuális code-ot vegye fel, lap váltáskor ha egyből futtatunk, és ha változtatjuk a kódot. Külön kezelni kell hogy van mikor csak a sima examplecode jelenik meg az oldalon, akkor azt kell felvennie, amikor mindkettő akkor pedig a code-ot
      //oldal frissítésnél
      if (!getCode.value) { //ha csak a példakód van a taskban
        currentCode.value = getExampleCode.value
      } else {
        currentCode.value = getCode.value
      }
    });
    const getCode = computed(() => {
      if (store.getters.getCode == undefined) {
        return ''
      } else {
        return store.getters.getCode
      }
    });
    const getExampleCode = computed(() => {
      if (store.getters.getExampleCode == undefined) {
        return ''
      } else {
        return store.getters.getExampleCode
      }
    });
    const showDivFirstLine = computed(() => {
      return firstLineValid.value
    })
    const showDivLastLine = computed(() => { return lastLineValid.value })
    const getTask = computed(() => { return store.getters.getTask })
    //const correctTask = computed(() => { return store.getters.correctTask })
    //const showDivCorrectAnswer = computed(() => { return store.getters.})

    watch(getExampleCode, () => {
      console.log('watch')
      if (!getCode.value) { //ha csak a példakód van a taskban
        currentCode.value = getExampleCode.value
      } else {
        currentCode.value = getCode.value
      }
    });


    //codemirror
    const extensions = []
    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }
    const py = usePython();
    async function init() {
      await py.load();
    }
    onBeforeMount(() => init());

    //execute gomb hívja meg
    function handleResult(result) {
      RunTestCode(result)
    }
    //tesztelés futtatása
    function RunTestCode(result) {

      if (!getCode.value) {
        //ha csak a példakód van a taskban
      } else {
        let replacedFirstLine = getCode.value.replace(/^[^\n]+/, getTask.value.testLine)
        py.run(replacedFirstLine).then(testResult => {
          console.log('teszt kód ereménye: ' + testResult.results + ' = ' + getTask.value.testResult)
          console.log('eredeti kód ereménye: ' + result + ' = ' + getTask.value.result)
          //LineValidok az első és utolsó sor igaz hamis értékei, result az eredeti kód futattot visszatérési értéke, a testResult.results pedig a háttérben futtatot test kódnak a visszatérési értéke
          if (!firstLineValid.value && !lastLineValid.value && getTask.value.result == result && getTask.value.testResult == testResult.results) { //+1 pont
            // + 1 pont
            console.log('1pont')
            console.log(store.getters.getfinishTest)
            if (!store.getters.getfinishTest) { //ha a teszt véget ér ne adjon hozzá több pontot
              store.dispatch('correctTask')
            }


          }
        }).catch(error => {
          console.error('Hiba történt:', error.error)
        });
      }

    }
    //input esemény (kód írása)
    function onInput(input) {
      if (!getCode.value) { //ha csak a példakód van a taskban
        store.dispatch('changeExampleCode', input.target.value)
      } else {
        store.dispatch('changeCode', input.target.value)

        let lines = getCode.value
        lines = getCode.value.split('\n');
        const firstRow = lines[0];
        const lastRow = lines[lines.length - 1];

        //console.log('Első sor:', firstRow);
        //console.log('Utolsó sor:', lastRow);

        //console.log(getExampleCode.value.startsWith(firstRow + '\n'))
        //console.log(getExampleCode.value.endsWith('\n' + lastRow))

        getExampleCode.value.startsWith(firstRow + '\n') ? firstLineValid.value = false : firstLineValid.value = true
        getExampleCode.value.endsWith('\n' + lastRow) ? lastLineValid.value = false : lastLineValid.value = true



        //this.$store.commit('changeCode', 'a')
        //console.log(this.$store.getters.getCode)

      }

    }
    const currentCode = ref(getCode.value);
    return {
      py,
      handleResult,
      extensions,
      handleReady,
      log: console.log,
      onInput,
      getCode,
      getExampleCode,
      RunTestCode,
      currentCode,
      firstLineValid,
      lastLineValid,
      showDivFirstLine,
      showDivLastLine,
      //correctTask,
    };
  },
  mounted() {
    // Tesztelés alatt az oldal frissítésnél újból meghívom az initTaskot, ezt a sort majd törlni kell:
    //this.$store.dispatch('initTasks', 'python');
    clearInterval(refreshIntervalId);
    if (this.$store.state.countDownTime > 0) {
      this.$store.dispatch('changeCountdownTime', this.$store.state.countDownTime - 1)
    }
    console.log(this.$store.state.countDownTime)
    refreshIntervalId = setInterval(() => {
      this.$store.dispatch('startCountdown');
      if (this.$store.state.countDownTime <= 0) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);

    //this.$store.commit('InitCorreactArrayLenght', this.$store.state.tasks.length)
    //console.log(this.$store.state.correctTask)
    //this.$store.commit('changeFinishTest', false)
    //console.log(this.$store.state.finishTest)
  },
  components: { SelectAnswer, FootButtons, JavascriptCodeEditor, FinalResults, PyCodeBlock, Codemirror },
  created() {
    this.getAllDocument('tests')
    icon.value = '../../public/favicon.png'
    //console.log(localStorage.getItem('my-app'))
    /*if (!localStorage.getItem('my-app')) {
      console.log('az initTasks lefutott')
      this.$store.dispatch('initTasks', 'javascript')
    }*/
  },
  methods: {
    runPythonCode() {
      // Kód futtatása
      this.code = '1+3'
      console.log(this.code)
      //console.log(this.py.run(this.code))
      this.py.run(this.code).then(result => {
        console.log('Futtatott kód eredménye:', result);
        // Itt kezeld az eredményt
      }).catch(error => {
        console.error('Hiba történt:', error);
        // Itt kezeld a hibát, ha szükséges
      });
    },
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
    async updateScore(sum) {
      console.log('updateScore' + sum)
      //this.$store.state.auth.docRef
      await updateDoc(doc(db, 'users', this.$store.state.auth.docRef), {
        score: sum
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
    submitTestResult() {//teszt végeredménye (csak egyszer hívódik meg)
      let sum = this.getArrayCorrectTasks.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      this.$store.commit('changeResult', sum)
      this.updateScore(sum)
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
    getOptions() {
      return this.$store.getters.getOptions
    },
    getTasksLength() {
      return this.$store.getters.getTasksLength
    },
    getArrayCorrectTasks() {
      return this.$store.getters.getArrayCorrectTasks
    },

  }

});
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
                <div v-if="this.$store.state.programmingLanguageName === 'javascript'">
                  <div v-if="task.exampleCode" class="p-3 m-4 bg-light border rounded-3">
                    <div class="exampleCode">Példakód</div>
                    <div>
                      <JavascriptCodeEditor v-if="this.$store.state.programmingLanguageName === 'javascript'"
                        :readOnlyProps="true" :codeProps="task.exampleCode" />
                    </div>
                  </div>
                  <div v-if="task.code" class="p-3 m-4 bg-light border rounded-3">
                    <div v-if="!getOptions" class="exampleCode">Kérem adja meg a megoldás kódját</div>
                    <div v-else class="exampleCode">Kérem tippelje meg a megoldást (csak egyszer tippelhet)</div>
                    <div>
                      <JavascriptCodeEditor :readOnlyProps="false" :codeProps="task.code" :sideProps="side" />
                      <SelectAnswer v-if="task.options" :answerButtons="task.options" :sideProps="side" />
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-if="task.exampleCode && !task.code" class="p-3 m-4 bg-light border rounded-3">
                    <div class="exampleCode">Példakód</div>
                    <div class="container mx-auto">
                      <div class="p-8">
                        <py-code-block id="script" @input="onInput" :py="py" :code="getExampleCode"
                          @result="handleResult"></py-code-block>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="task.code" class="p-3 m-4 bg-light border rounded-3">
                    <div class="exampleCode">Példakód</div>
                    <div class="container mx-auto">
                      <div class="p-3 m-4 bg-light border rounded-3">
                        <codemirror v-model="getExampleCode" :disabled="true"> </codemirror>
                      </div>
                    </div>
                    <div class="exampleCode">Kérem adja meg a megoldás kódját</div>
                    <div class="container mx-auto">
                      <div class="p-3 m-4 bg-light border rounded-3">
                        <py-code-block id="script" @input="onInput" :py="py" :code="getCode"
                          @result="handleResult"></py-code-block>
                      </div>
                      <div v-if="showDivFirstLine" style="color: red">Az első sor változott</div>
                      <div v-if="showDivLastLine" style="color: red">Az utolsó sor változott</div>
                      <div v-if="this.$store.state.correctTask[this.side] == 1" style="color: green">Helyes válasz</div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
            <FinalResults v-if="side > getTasksLength" />
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
      <FootButtons v-if="this.side != 0" @prev="prev" @next="next" :sideProps="side"
        @submitTestResult="submitTestResult" />
    </div>

  </div>
</template>