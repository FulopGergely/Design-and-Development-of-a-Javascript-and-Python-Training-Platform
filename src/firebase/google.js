import firebaseObjects from '@/firebase/index.js'
import { collection, doc, deleteDoc, addDoc, getDocs, query } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect } from 'firebase/auth'
import store from '@/store/store.js';
const db = firebaseObjects.db;
const auth = firebaseObjects.auth;
const provider = new GoogleAuthProvider();

//visszad egy arrayt ami az összes docot visszaadja ami van a collectionba, ezt a store initbe kell tenni hogy itt már tudjuk használni
async function getAllDocument(collectionName) {
    const querySnap = await getDocs(query(collection(db, collectionName)));
    const arr = []
    /*if (collectionName == 'tests') {
        querySnap.forEach((doc) => {
            this.tests.push(doc.data())
            //console.log(doc.data())
        })
    }*/
    if (collectionName == 'users') {
        querySnap.forEach((doc) => {
            arr.push(doc.data())
        })
        return arr
        //this.$store.dispatch('setLoading', false)
    }

}
/** firebase-re 1 user rekordot hozzá ad
 * 
 * @param {string} uid
 * @param {string} email
 * @param {string} displayName
 * @param {string} photoURL
 */
async function addUser(uid, email, displayName, photoURL) {
    await addDoc(collection(db, 'users'), {
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
    })
}
// Ez fut le a bejelentkezés gombbal.
async function signInWithGoogle() {
    try {
        store.commit('resetStates')
        const result = await signInWithPopup(auth, provider); //ezt az obj-et adja vissza firebase auth bejelentkezésnél
        const users = await getAllDocument('users'); //ezek az eddigi reisztrált felhasználók adatbázisban
        const currentUser = { //csak ezt akarjuk tárolni firebase objectből
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
        }
        store.commit('setCurrentUser', currentUser);//vuexben tároljuk aki bejelentkezett (user obj-et.)
        let AlreadyRegistered = false;
        for (var user of users) { //megnézzük hogy regisztált-e már korábban
            if (result.user.uid == user.uid) {
                AlreadyRegistered = true
            }
        }
        if (!AlreadyRegistered) {//új usereket elmentjük firebase-en
            addUser(result.user.uid, result.user.email, result.user.displayName, result.user.photoURL)
        }
    } catch (error) {
        console.log(error);
    }

}

function signOutWithGoogle() {
    signOut(auth).then(() => {
        store.commit('resetUserState')
    }).catch((error) => {
        console.error(error);
    });
}


////////////////////////////////////////

function signIn() {
    console.log(auth)
    console.log(provider)
    signInWithRedirect(auth, provider)
}

/** 
 * @param {string} collectionName - collection name in Firestore (tests, users)
 * @param {string} username
 * @param {string} email
 * @param {number} test_id
 * @param {number} score
 */
async function addDocument(collectionName, name, email, test_id, score) {
    const docRef = await addDoc(collection(db, collectionName), {
        name: name,
        email: email,
        test_id: test_id,
        score: score,
    })
    //miután létrehozta firebase a docId-t az adatokkal, utána vuex-ben tároljuk a docId-t.
    //bejelentkezés után tudni fogjuk melyik docId van bejelentkezve: this.$store.state.auth.docRef
    this.$store.commit('appendToAuth', {
        docRef: docRef.id
    });
}

export { signInWithGoogle, signOutWithGoogle, signIn, addDocument, addUser, getAllDocument, auth }