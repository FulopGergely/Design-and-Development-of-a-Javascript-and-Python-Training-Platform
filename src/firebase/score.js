//score tábla
import firebaseObjects from '@/firebase/index.js'
import { collection, doc, deleteDoc, addDoc, getDocs, query } from 'firebase/firestore';
const db = firebaseObjects.db;




/** 
 * 
 * @param {string} uid //userid
 * @param {string} tid //teszt id
 * @param {integer} score
 * @param {date} date
 */
async function addScore(uid, tid, score, date) {
    try {
        await addDoc(collection(db, 'scores'), {
            uid: uid || null,
            tid: tid || null,
            score: score || 0,
            date: date || null,
        });
    } catch (error) {
        return error
    }

}
async function getDocId(tid) {
    const querySnap = await getDocs(query(collection(db, 'scores')));
    let docId;
    querySnap.forEach((doc) => {
        if (doc.data().tid == tid) {
            docId = doc.id
        }
    })
    return docId
}
//(visszaadja az egész scores táblát) visszad egy arrayt ami az összes docot visszaadja ami van a collectionba (scores)
async function getAllScore() {
    const querySnap = await getDocs(query(collection(db, 'scores')));
    const arr = []
    querySnap.forEach((doc) => {
        arr.push(doc.data())
    })
    return arr
}
async function deleteScore(tid) {
    let allScore = await getAllScore()
    for (const x of allScore) {
        if (tid == x.tid) {
            await deleteDoc(doc(db, 'scores', await getDocId(tid)));
        }
    }
    return await getAllScore() //visszatérünk az egész scores táblával úgy, hogy a tid nevű tesztek törölve vannak
}

export { getAllScore, addScore, deleteScore }