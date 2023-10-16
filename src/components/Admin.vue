<script>
//import (database) the firestore instance and relevant methods
import db from '@/firebase/index.js'
import { collection, deleteDoc, getDocs, query, addDoc} from 'firebase/firestore';

export default {
  name: 'AdminComp',
  data() {
    return {
      tests: [],
      users: [],
    }
  },
  components: { },
  watch: {
    
  },
  created() {
  },
  mounted() {
    this.getAllDocument('tests')

    this.getAllDocument('users')

  },
  methods: {
    async getAllDocument(collectionName) {
      // query to get all docs in 'countries' collection
      const querySnap = await getDocs(query(collection(db, collectionName)));
      if (collectionName == 'tests') {
        querySnap.forEach((doc) => {
          this.tests.push(doc.data())
          //console.log(doc.data())
        })
      }
      if (collectionName == 'users') {
        querySnap.forEach((doc) => {
          this.users.push(doc.data())
        })
        this.$store.dispatch('setLoading', false)
      }
    },
    
    /*async getUsers() {
      onSnapshot(collection(db, 'users'), (snap) => {
        snap.forEach((doc) => {
          this.users.push(doc.data())
        })
        console.log(snap)
      })
    },*/
    async dropCollection(collectionName) {
      // query to get all docs in 'countries' collection
      const querySnap = await getDocs(query(collection(db, collectionName)));
      querySnap.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    },
    /** 
     * @param {string} collectionName - collection name in Firestore (tests, users)
     * @param {object} document - create document pl.: {programmingLanguageName: 'js', test_id: 123}
     */
    async createDocument(collectionName, dataObj) {
      // create document and return reference to it (rekord)
      const docRef = await addDoc(collection(db, collectionName), dataObj)
      // acces auto-generated ID with 'id'
      console.log('létrehozva egy Doc ezzel az id-vel: ', docRef.id)
    },
    asd2() {
      
      console.log(this.getAllDocument('tests'))
    },
    asdasdasd() {
      this.createDocument('tests', {
        programmingLanguageName: "js",
        testDurationMinutes: 10,
        test_id: 3
      })
      
    }
    

  },
}

</script>

<template>
  <div v-if="!$store.state.loading">
    <div class="container py-5">
    <div class="p-3 mb-4 bg-light border rounded-3">
      <div class="h4 m-4 d-flex justify-content-center">Tesztek</div> 
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">teszt ID</th>
            <th scope="col">programozási nyelv</th>
            <th scope="col">időtartam (perc)</th>
            <th scope="col">törlés</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="test in this.tests" :key="test.id">
            <!-- <td v-for="test in this.asd2 :key="test.id"></td>-->
            <td>{{ test.test_id }}</td>
            <td>{{ test.programmingLanguageName }}</td>
            <td>{{ test.testDurationMinutes }}</td>
            <td><button type="button" class="btn btn-danger">Törlés</button></td>
          </tr>
        </tbody>
          <button type="button"
                  class="btn btn-success m-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  @click="next"
          >Új teszt</button>
      </table>
    </div>
  </div>
  
 

  <div class="container py-4">
    <div class="p-3 mb-4 bg-light border rounded-3">
      <div class="h4 m-4 d-flex justify-content-center">Felhasználók</div> 
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">teszt ID</th>
            <th scope="col">név</th>
            <th scope="col">email</th>
            <th scope="col">pontszám</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in this.users" :key="user.id">
            <!-- <td v-for="test in this.asd2 :key="test.id"></td>-->
            <td>{{ user.test_id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  <div v-else>
    <p>Loading...</p>
  </div>

 <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Új teszt</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">teszt ID</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01">programozási nyelv</label>
            <select class="form-select" id="inputGroupSelect01">
              <option value="1">javascript</option>
              <option value="2">python</option>
            </select>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">időtartam (perc)</span>
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bezárás</button>
        <button type="button" class="btn btn-primary">Mentés</button>
      </div>
    </div>
  </div>
</div>

</template>