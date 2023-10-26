<script>
//import (database) the firestore instance and relevant methods
import firebaseObjects from '@/firebase/index.js'
import { collection, doc, deleteDoc, addDoc, getDocs, query } from 'firebase/firestore';
import { Modal } from 'bootstrap'
const db = firebaseObjects.db;
let newTest;
let confirmDelete;

export default {
  name: "AdminComp",
  data() {
    return {
      tests: [],
      users: [],
      programmingLanguageName: '', 
      testDurationMinutes: null, 
      test_id: null,
      deleteId: 0,
      modal: '',
      modalTitle: '',
      modalBody: '',
    }
  },
  components: { },
  computed: {
    isValid() {
      return !this.tests.map(test => test.test_id).includes(this.test_id)
    }
  },
  created() {
  },
  mounted() {
    this.$store.dispatch('setLoading', true)
    newTest = new Modal(document.getElementById('newTest'));
    confirmDelete = new Modal(document.getElementById('confirmDelete'));
    this.getAllDocument('tests')
    this.getAllDocument('users')
    console.log(this.tests)
  },
  methods: {
    async getAllDocument(collectionName) {
      console.log('getAllDocument')
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
    async deleteDocument(test_id) {
      this.$store.dispatch('setLoading', true)
      console.log('deleteDocument')
      const querySnap = await getDocs(query(collection(db, 'tests')));
      querySnap.docs.forEach(element => {
        if (element.data().test_id == test_id) {
          this.deleteId = element.id
        }
      });
      await deleteDoc(doc(db, 'tests', this.deleteId))
      this.tests = this.tests.filter(item => item.test_id !== test_id);
      this.$store.dispatch('setLoading', false)
    },
    async dropCollection(collectionName) {
      console.log('dropCollection')
      this.$store.dispatch('setLoading', true)
      // query to get all docs in 'countries' collection
      if(collectionName == 'users'){
        const querySnap = await getDocs(query(collection(db, collectionName)));
        querySnap.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        this.users = []
      }
      if(collectionName == 'tests'){
        const querySnap = await getDocs(query(collection(db, collectionName)));
        querySnap.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        this.tests = []
      }
      this.$store.dispatch('setLoading', false)
    },
    /** 
     * @param {string} collectionName - collection name in Firestore (tests, users)
     * @param {object} document - create document pl.: {programmingLanguageName: 'js', testDurationMinutes: 10, test_id: 123, }
     */
    async createDocument(collectionName, dataObj) {
      console.log('createDocument')
      this.$store.dispatch('setLoading', true)
      // create document and return reference to it (rekord)
      const docRef = await addDoc(collection(db, collectionName), dataObj)
      // dataObj['docID'] = docRef.id
      // acces auto-generated ID with 'id'
      this.tests.push((dataObj))
      console.log('létrehozva egy Doc ezzel az id-vel: ', docRef.id)
      console.log('létrehozva egy Doc ezzel az object-el: ', dataObj)
      this.$store.dispatch('setLoading', false)
    },
    submitSaveTest() {
        if (this.isValid) {
          this.createDocument('tests', {
          programmingLanguageName: this.programmingLanguageName, 
          testDurationMinutes: parseInt(this.testDurationMinutes), 
          test_id: parseInt(this.test_id) })
          newTest.hide();
        }
    },
    confirmDelete() {
      if (this.modal == 'deleteTestRecord') {
        this.deleteDocument(this.deleteId)
        confirmDelete.hide()
      }
      if (this.modal == 'deleteAllTests') {
        this.dropCollection('tests')
        confirmDelete.hide()
      }
      if (this.modal == 'deleteAllUsers') {
        this.dropCollection('users')
        confirmDelete.hide()
      }
    },
    openModal(modal, id){
      if(modal == 'saveTest'){
        newTest.show()
      }
      if (modal == 'deleteTestRecord') {
        confirmDelete.show()
        this.deleteId = id
        this.modal = 'deleteTestRecord'
        this.modalTitle = 'teszt ID törlése'
        this.modalBody = 'Biztos törli ezt a tesztet? (TesztID: ' + id + ')'
      }
      if (modal == 'deleteAllTests') {
        confirmDelete.show()
        this.modal = 'deleteAllTests'
        this.modalTitle = 'Összes teszt törlése'
        this.modalBody = 'Biztos törli az összes tesztet?'
      }
      if (modal ==  'deleteAllUsers'){
        confirmDelete.show()
        this.modal = 'deleteAllUsers'
        this.modalTitle = 'Összes felhasználó törlése'
        this.modalBody = 'Biztos törli az összes felhasználót?'
      }
    },


  },
}

</script>

<template>
  <div v-if="!$store.state.loading">
    <div class="container py-5">
      <div class="p-4 mb-5 bg-light border rounded-3">
        <div class="h4 m-4 d-flex justify-content-center">Felhasználók</div> 
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">teszt ID</th>
              <th scope="col">név</th>
              <th scope="col">email</th>
              <th scope="col">Idő</th>
              <th scope="col">pontszám</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in this.users" :key="user.test_id">
              <!-- <td v-for="test in this.asd2 :key="test.id"></td>-->
              <td>{{ user.test_id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.time }}</td>
              <td>{{ user.score }} 
                <button type="button"
                  class="btn btn-secondary"
                  @click="openModal('deleteAllUsers')"
                  > > </button>

                 

                
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button type="button"
                  class="btn btn-danger"
                  @click="openModal('deleteAllUsers')"
                  >Összes felhasználó törlése</button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        </div>

        
      <div class="p-4 mb-4 bg-light border rounded-3">
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
            <tr v-for="test in this.tests" :key="test.test_id">
              <!-- <td v-for="test in this.asd2 :key="test.id"></td>-->
              <td>{{ test.test_id }}</td>
              <td>{{ test.programmingLanguageName }}</td>
              <td>{{ test.testDurationMinutes }} </td>
              <td><button @click="openModal('deleteTestRecord',test.test_id)" type="button" class="btn btn-secondary">Törlés</button></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button type="button"
                    class="btn btn-success"
                    @click="openModal('saveTest')"
                >Új teszt</button>
              </td>
              <td></td>
              <td></td>
              <td>
                <button type="button"
                        class="btn btn-danger"
                        @click="openModal('deleteAllTests')"
                >Összes teszt törlése</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  
 

    <div class="container py-5">
      
      </div>
  </div>
  
  <div v-else class="container py-4">
    <div class="p-3 mb-4">
        <div class="h4 m-4 d-flex justify-content-center">
          <div class="spinner-border m-5" role="status">
            <span class="sr-only"></span>
          </div>
        </div> 
    </div>
  </div>


  <div class="modal fade" tabindex="-1" id="confirmDelete">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>{{modalBody}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bezár</button>
        <button type="button" @click="confirmDelete()" data-bs-dismiss="modal" class="btn btn-primary">Igen</button>
      </div>
    </div>
  </div>
</div>


 <!-- Modal -->
<div class="modal fade" id="newTest" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Új teszt</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="submitSaveTest" class="needs-validation">
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">teszt ID</span>
            <input v-model="test_id" :class="{'form-control':false, 'is-invalid' : !isValid}" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
            <div v-if="!isValid" class="invalid-feedback">
              Ilyen id már létezik!
            </div>
          </div>
          <div class="input-group mb-3">
            <label class="input-group-text" >programozási nyelv</label>
            <select class="form-select" v-model="programmingLanguageName" required>
              <option selected value="javascript">javascript</option>
              <option value="python">python</option>
            </select>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">időtartam (perc)</span>
            <input v-model="testDurationMinutes" type="number" class="form-control" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bezár</button>
          <button type="submit" class="btn btn-primary">Mentés</button>
        </div>
      </form>
    </div>
  </div>
</div >









</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css');

.arrow {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid black;
  display: inline-block;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
</style>