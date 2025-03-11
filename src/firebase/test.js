//test tábla
import firebaseObjects from '@/firebase/index.js'
import { collection, doc, deleteDoc, addDoc, getDocs, query, updateDoc, getDoc } from 'firebase/firestore';
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

//segéd, visszadja a docID-t
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

async function setReview(tid, ratingMap, review) {
  const testDocId = await getDocId(tid);
  const testRef = doc(db, 'tests', testDocId);

  // Először kiolvassuk az aktuális értékeket
  const testDoc = await getDoc(testRef);
  const currentReview = testDoc.data().review || [];

  // Hozzáadjuk az új értéket az aktuális értékekhez
  if(review.value != '') {
    currentReview.push(review.value)
  }
  

  // Firestore közvetlenül nem támogatja a map objectet, ezért átalakítjuk
  const ratingObject = Object.fromEntries(ratingMap);

  // Majd az új értékeket beállítjuk a Firestore-ban
  await updateDoc(testRef, {
    rating: ratingObject,
    review: currentReview
  });

}
async function deletedReview(tid) {
  const testDocId = await getDocId(tid);
  const testRef = doc(db, 'tests', testDocId);
  await updateDoc(testRef, {
    review: []
  });
}


async function setAvailable(tid, bool) {
  updateDoc(doc(db, 'tests', await getDocId(tid)), {
    available: bool
  })
}

async function deleteTest(tid) {
  await deleteDoc(doc(db, 'tests', await getDocId(tid)))
}

/** 
 * 
 * @param {string} uid //userid
 * @param {string} tid //teszt id
 * @param {boolean} available
 * @param {boolean} private
 * @param {task} task //teszt kérdései (task array)  
 * @param {integer} testDurationMinutes //teszt ideje
 * @param {string} details //leírás
 * @param {string} difficulty //teszt ideje 1-4ig, ahol 1 a könnyű
 */
async function addTest(uid, tid, available, task, testDurationMinutes, details, difficulty) {
  try {
    await addDoc(collection(db, 'tests'), {
      uid: uid || null,
      tid: tid || null,
      available: available,
      task: task || null,
      testDurationMinutes: testDurationMinutes || null,
      rating: [],
      review: [],
      details: details || null,
      difficulty: difficulty || null,
    });
  } catch (error) {
    return error
  }

}
async function updateTest(tid, available, task, testDurationMinutes, details, difficulty) {
  try {
    await updateDoc(doc(db, 'tests', await getDocId(tid)), {
      tid: tid || null,
      available: available,
      task: task || null,
      testDurationMinutes: testDurationMinutes || null,
      details: details || null,
      difficulty: difficulty || null,
    })

  } catch (error) {
    return error
  }
}



export { getAllTest, addTest, setAvailable, deleteTest, setReview, deletedReview, updateTest }