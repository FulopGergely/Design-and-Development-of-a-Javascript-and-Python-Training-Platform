<script>
import '@/assets/main.css'

//import components
import QuestionsComp from './components/QuestionsComp.vue'
import GoogleLogin from './components/GoogleLogin.vue'
import Admin from './components/Admin.vue'
//import (database) the firestore instance and relevant methods
import db from '@/firebase/index.js'
import { collection, deleteDoc, getDocs, query, onSnapshot} from 'firebase/firestore';




export default {
  name: 'App',
  data() {
    return {
      users: [],
    }
  },
  components: { QuestionsComp , GoogleLogin , Admin },
  created() {
    if(!localStorage.getItem('my-app')){
      this.$store.dispatch('initTasks', this.$store.state.view)
    }
  },
  methods: {
    async getAllDocument(collectionName) {
      // query to get all docs in 'countries' collection
      const querySnap = await getDocs(query(collection(db, collectionName)));
      // add each doc to 'countries' array
      querySnap.forEach((doc) => {
        //this.countries.push(doc.data())
        console.log(doc.id)
      })
    },
    async getUsers() {
      onSnapshot(collection(db, 'users'), (snap) => {
        snap.forEach((doc) => {
          this.users.push(doc.data())
        })
      })
    },
    async dropCollection(collectionName) {
      // query to get all docs in 'countries' collection
      const querySnap = await getDocs(query(collection(db, collectionName)));
      querySnap.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    },
    isAdmin() {
      //this.signInWithGoogle()
      //console.log('jaj')
      //console.log(auth)
    },
    

  },
  mounted(){
    //this.getUsers() //init users ()
    //this.isAdmin()
    //console.log(auth)
  },

}


  

</script>

<template>

<div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-dark p-4">
    <h5 class="text-white h4">{{ this.$store.state.auth }}</h5>
    <span class="text-light">Toggleable via the navbar brand.</span>
  </div>
</div>
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>


  <div v-if="!this.$store.state.auth"> 
    <GoogleLogin/>
  </div>
  
  <div v-if="this.$store.state.auth != 'kvizmester42@gmail.com'">
    <GoogleLogin/>
    <QuestionsComp/>
  </div>

  <div v-if="this.$store.state.auth == 'kvizmester42@gmail.com'">
    <GoogleLogin/>
    <Admin/>
  </div>
  
</template>