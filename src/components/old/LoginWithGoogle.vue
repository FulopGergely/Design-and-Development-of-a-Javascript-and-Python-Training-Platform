<script>
import { ref, onMounted } from 'vue';
//firebase
import firebaseConfig from '@/firebase/firebaseConfig.js'
import firebase from 'firebase/compat/app';
firebase.initializeApp(firebaseConfig)
import * as firebaseui from 'firebaseui'
//firabase auth
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);


export default {
    name: "LoginWithGoogle",
    data() {
        return {
        }
    },
    components: {},
    setup() {
        const user = ref(null)
        const isSignedIn = ref(null)
        const uiConfig = {
            signInFlow: 'popup',
            //signInSuccessUrl: 'http://localhost:8080/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult) {
                    user.value = authResult.user.displayName
                    console.log(authResult)
                    isSignedIn.value = true
                    console.log('bejelentkezve: ' + user.value)
                    return false;
                }

            }
        }

        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        ui.start('#firebaseui-auth-container', uiConfig);
        onMounted(() => {
            console.log(user.value);
            console.log(db);
            console.log(auth);

        });
        return {
            user
        }


    },
}

</script>

<template>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
</template>






