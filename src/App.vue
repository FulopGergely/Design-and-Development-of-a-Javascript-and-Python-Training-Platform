<script>
import '@/assets/main.css'

//import components
import Questions from './components/Questions.vue'
//import (database) the firestore instance and relevant methods
import db from '@/firebase/index.js'
import { collection, addDoc, deleteDoc, doc, getDocs, query, getDoc, onSnapshot} from 'firebase/firestore';
//import googleLogin
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

const auth = getAuth();
const provider = new GoogleAuthProvider();




export default {
  name: 'App',
  data() {
    return {
      users: [],
    }
  },
  components: { Questions },
  created() {
    this.getUsers()
    this.asd()
  },
  methods: {
    signInWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)
        }).catch((error) => {
          console.log(error)
        });
    },
    /** 
     * @param {string} collectionName - collection name in Firestore (admin, tests, users)
     * @param {number} test_id - unique ID
     * @param {string} programmingLanguageName - 'js' or 'py'
     * @param {number} testDurationMinutes - test duration in minutes
     */
    async addDocument(collectionName, test_id, programmingLanguageName, testDurationMinutes) {
      await addDoc(collection(db, collectionName), {
        programmingLanguageName: programmingLanguageName,
        test_id: test_id,
        testDurationMinutes: testDurationMinutes,
      })
    },
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
    async getAdminDoc(){
      const userDocRef = doc(db, "users", 'IVfcekSm484ctmzX7ZlD'); // A felhasználó egyedi azonosítója alapján keresünk a "users" kollekcióban
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc.id)
      if (userDoc.exists() && userDoc.data().isAdmin) {
        // Az adott felhasználó admin jogosultságokkal rendelkezik
        // További műveletek végrehajtása
      } else {
        // Az adott felhasználó nem rendelkezik admin jogosultságokkal
        // További műveletek végrehajtása vagy hibaüzenet megjelenítése
      }
    },
    isAdmin() {
      console.log(this.getAllDocument('users'))
    },
    asd() {
      console.log((this.users))
    },
    

    

  },

}


  

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
  <div>
    <Questions/>
  </div>
  
</template>