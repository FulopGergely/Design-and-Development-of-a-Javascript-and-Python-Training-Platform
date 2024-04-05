//test tábla
import firebaseObjects from '@/firebase/index.js'
import { collection, doc, deleteDoc, addDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import store from '@/store/store.js';
const db = firebaseObjects.db;


//visszad egy arrayt ami az összes docot visszaadja ami van a collectionba (tests)
async function getAllTest() {
  const querySnap = await getDocs(query(collection(db, 'tests')));
  const arr = []
  querySnap.forEach((doc) => {
    arr.push(doc.data())
  })
  return arr
}

async function getDocId(tid) {
  const querySnap = await getDocs(query(collection(db, 'tests')));
  let docId;
  querySnap.forEach((doc) => {
    if (doc.data().tid == tid) {
      docId = doc.id
    }
  })
  return docId
}


async function setAvailable(tid, bool) {
  updateDoc(doc(db, 'tests', await getDocId(tid)), {
    available: bool
  })
}

async function deleteTest(tid) {
  await deleteDoc(doc(db, 'tests', await getDocId(tid)))
}


/*

Table tests {
  id varchar [primary key]
  userId integer
  password varchar
  testDurationMinutes integer
  task_id integer [note: '1 teszben több kérdés van']
}
Table tasks {
  id integer [primary key]
  side integer [note: 'oldalszám']
  programmingLanguageName varchar [note: 'js/py']
  text varchar [note: 'feladat szövege html formátumban']
  code varchar
  tests array [note: 'tesztesetek (paraméterek, végeredmény és típusok)']
  isTest bool [note: 'pontszám és teszteset ellenőrzés ki/be kapcsolása']
  score integer [note: 'hány pontot ér ez a feladat/kérdés']
}

*/

/** 
 * 
 * @param {string} uid //userid
 * @param {string} tid //teszt id
 * @param {boolean} available
 * @param {boolean} private
 * @param {task} task //teszt kérdései (task array)  
 * @param {integer} testDurationMinutes
 */
async function addTest(uid, tid, available, task, testDurationMinutes) {
  try {
    await addDoc(collection(db, 'tests'), {
      uid: uid || null,
      tid: tid || null,
      available: available,
      task: task || null,
      testDurationMinutes: testDurationMinutes || null,
    });
  } catch (error) {
    return error
  }

}



export { getAllTest, addTest, setAvailable, deleteTest }