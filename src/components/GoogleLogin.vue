<script>
import {defineComponent} from 'vue'
import db from '@/firebase/index.js'
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
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
      console.log('bejelnetkezés:')
      console.log(auth)
      await signInWithPopup(auth, provider)
        .then((result) => {
          this.$store.dispatch('changeAuth', result.user)
          result.user.email == 'kvizmester42@gmail.com' ? console.log('admin bejelentkezés') : this.addDocument( 'users' , result.user.displayName , result.user.email , 0 , 0)
        }).catch((error) => {
          console.log(error)
        });

    },
    signOutWithGoogle(){
       signOut(auth).then(() => {
        this.$store.dispatch('resetModuleState')
      }).catch((error) => {
        console.error(error);
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
<div class="bg-dark p-4">
  <div v-if="!this.$store.state.auth.displayName">
    <button @click="signInWithGoogle" class="button-36" type="button">
      <li class="list-inline-item">
        <img src="public/user.png" alt="Avatar" class="rounded-circle" width="40" height="40"> 
      </li>
      <li class="list-inline-item">
        <div class="m-2"> bejelentkezés </div>
      </li>
    </button>
  </div>
  <div v-else class="dropdown">
    <button class="button-36" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <li v-if="this.$store.state.auth.photoURL" class="list-inline-item">
        <img :src="this.$store.state.auth.photoURL" alt="Avatar" class="text-start rounded-circle" width="40" height="40">
      </li>
      <li class="list-inline-item">
        <div class="m-2">{{ this.$store.state.auth.displayName }}</div> 
      </li>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li v-if="this.$store.state.auth.displayName"><a class="dropdown-item" href="#" @click="signOutWithGoogle">kijelentkezés</a></li>
    </ul>
  </div>
</div>
</template>

<style scoped>




/* CSS */
.button-36 {
  background-image: linear-gradient(0deg, #414141 9.16%, #414141 43.89%, #414141 64.72%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  font-size: 16px;
  font-weight: 500;
  height: 4rem;
  text-shadow: rgba(255, 255, 255, 0.25) 0 3px 8px;
  transition: all .5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-36:hover {
  box-shadow: rgba(255, 255, 255, 0.5) 0 1px 20px;
  transition-duration: .1s;
}

@media (min-width: 768px) {
  .button-36 {
    padding: 0 2.6rem;
  }
}

</style>