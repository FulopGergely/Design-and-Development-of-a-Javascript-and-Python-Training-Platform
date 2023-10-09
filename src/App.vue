<script>
import '@/assets/main.css'
import { useFavicon } from '@vueuse/core'
const icon = useFavicon()
//import js and python run
import JavascriptCodeEditor from '@/components/JavascriptCodeEditor.vue'
import PythonIDE from '@/components/PythonCodeEditor.vue'
//import components
import SelectAnswer from '@/components/SelectAnswer.vue'
import FootButtons from '@/components/FootButtons.vue'
//import (database) the firestore instance and relevant methods
import db from '@/firebase/index.js'
import {collection, addDoc} from 'firebase/firestore'
//import googleLogin
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
const auth = getAuth();
const provider = new GoogleAuthProvider();




export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {SelectAnswer, PythonIDE, FootButtons, JavascriptCodeEditor },
  created() {
    if(!localStorage.getItem('my-app')){
      this.$store.dispatch('initTasks', this.$store.state.view)
    }
    icon.value = '../../public/favicon.png'
  },
  unload() {
    console.log('unmount')
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
    async createUser() {
      // 'user' collection reference
      const colRef = collection(db, 'kvizmester')
      // data to send
      const dataObj = {
        firstName: 'Jhon',
        lastName: 'Doe',
        dob: '1990'
      }

      // create document and return reference to it
      const docRef = await addDoc(colRef, dataObj)

      // acces auto-generated ID with 'id'
      console.log('létrehozva egy Doc ezzel az id-vel: ', docRef.id)
    },
    created(){
      this.createUser()
    },
    signInWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)
        }).catch((error) => {
          console.log(error)
        });
    },


  },
  computed: {
    side() {
      return this.$store.state.side
    }
  }
}
</script>

<template>
  <div>
    <div class="container py-4">
      <div class="p-3 mb-4 bg-light border rounded-3">
        <div class="d-flex align-items-start flex-column bd-highlight mb-1">
          <div v-if="side !== 0" class="mb-auto p-1 bd-highlight">{{ side }}</div>
        </div>
        <div class="container-fluid py-5">
          <div v-if="side !== 0">
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
          <div v-else>
            <div class="container">
              <button type="button"
                class="btn btn-danger"
                @click="signInWithGoogle"
              >signInWithGoogle</button>
              <div class="d-flex justify-content-center align-items-center" style="height: 300px">
                <a
                  style="cursor: pointer"
                  class="p-2 fs-3 text-decoration-none"
                  @click="changeView('python')"
                  >python</a
                >
                <a
                  style="cursor: pointer"
                  class="p-2 fs-3 text-decoration-none"
                  @click="changeView('javascript')"
                  >javascript</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{this.$store.state.tasks[0].code}} -->
      <FootButtons v-if="side !== 0" @prev="prev" @next="next" />
    </div>
  </div>
</template>