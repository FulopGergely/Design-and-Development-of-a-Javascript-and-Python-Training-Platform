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
    console.log('created')
    if(!localStorage.getItem('my-app')){
      this.$store.dispatch('initTasks', 'js')
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
    asd() {
      console.log('bejelentkezés...')
      
    }
    

  },
  mounted(){
    //this.getUsers() //init users ()
    //this.isAdmin()
    //console.log(auth)
  },

}


  

</script>

<template>




  <div v-if="!this.$store.state.auth"> 
    <GoogleLogin/>
  </div>
  
  <div v-if="this.$store.state.auth.email != 'kvizmester42@gmail.com'">
    <GoogleLogin/>
    <QuestionsComp/>
  </div>

  <div v-if="this.$store.state.auth.email == 'kvizmester42@gmail.com'">
    <GoogleLogin/>
    <Admin/>
  </div>
  
</template>


