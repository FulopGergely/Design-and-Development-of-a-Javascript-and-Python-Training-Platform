<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { getAllTest } from '@/firebase/test.js';
import { ref, onMounted, computed, watch  } from 'vue';
import router from '@/router/index.js';
import store from '@/store/store.js';
//PrimeVue
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const show = () => {
      toast.add({ severity: 'error', summary: 'Nincs ilyen teszt', life: 3000 });
};

//const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy



const testID = ref()

async function login() {
    if(testID.value){
        let tests = await getAllTest()
        tests.map(test => {
            if (test.tid == testID.value && test.available) {
                signInWithGoogle().then(() => {
                    router.push('/' + testID.value);
                }).catch(error => {
                    console.error('Bejelentkezés sikertelen:', error);
                });
            } else {
                show()
            }
        })
        
    }
        //signInWithGoogle()
} 

</script>
<template>



<img src="/pictureW.webp" style="width: 100%;" alt="">

    <div>
        <div class="flex justify-content-center flex-wrap mt-5">
            <div
                class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                <h2>Python és JavaScript oktató platform. </h2>

                Ha készen állsz,
                írd
                be a teszt nevét, majd jelentkezz be Google-fiókoddal, hogy elindíthasd a tesztet.
                Legyen sikeres a tanulás és a fejlődés útja!

                <InputGroup class="mt-5">
                    <InputGroupAddon>https://kvizmester-ace48.firebaseapp.com/</InputGroupAddon>
                    <InputText v-model="testID"/>
                    <Button @click="login()" label="Kezdés" />
                </InputGroup>
                <Toast />
            </div>

        </div>
    </div>


    
    



</template>