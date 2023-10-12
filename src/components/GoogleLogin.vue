<script>
import {defineComponent} from 'vue'
import db from '@/firebase/index.js'
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default defineComponent({
  name: "GoogleLogin",
  data() {
    return {
    }
  },
  components: { },
  methods: {
    async signInWithGoogle() {
      this.$store.dispatch('initTasks', this.$store.state.view) //emptying the local storage
      await signInWithPopup(auth, provider)
        .then((result) => {
          this.$store.dispatch('changeAuth', result.user.email)
          result.user.email == 'kvizmester42@gmail.com' ? this.adminLogin() : this.addDocument( 'users' , result.user.displayName , result.user.email , 0 , 0)
        }).catch((error) => {
          console.log(error)
        });
    },
    /** 
     * @param {string} collectionName - collection name in Firestore (tests, users)
     * @param {string} username
     * @param {string} email
     * @param {number} test_id
     * @param {number} score
     */
     async addDocument(collectionName, name, email, test_id, score) {
      await addDoc(collection(db, collectionName), {
        name: name,
        email: email,
        test_id: test_id,
        score: score,
      })
    },
  },
})
</script>


<template>
    <div class="container py-4">
        <div class="p-3 mb-4 bg-light border rounded-3">
            <div class="d-flex align-items-start flex-column bd-highlight mb-1">
                <button type="button"
                class="btn btn-danger"
                @click="signInWithGoogle"
                >signInWithGoogle</button>
            </div>
        </div>
    </div>
</template>
