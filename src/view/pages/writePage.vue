<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { getAllTest } from '@/firebase/test.js';
import { ref, onMounted, computed, watch  } from 'vue';
import router from '@/router/index.js';
import store from '@/store/store.js';
//Component
import NavBar from '@/components/home/NavBar.vue'
//PrimeVue
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const show = () => {
      toast.add({ severity: 'error', summary: 'Nincs ilyen teszt', life: 3000 });
};

const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy



const testID = ref()
const tests = ref([])

onMounted(() => {
    init()

});

async function init() {
    store.commit('setLoading', false)
    tests.value = await getAllTest()
    store.commit('setLoading', true)
}

async function login() {
    //window.open('/' + testID.value, '_blank');
    if(testID.value){
        //let tests = await getAllTest()
        let bool = false
        tests.value.map(test => {
            if (test.tid == testID.value && test.available) {
                bool = true
                signInWithGoogle().then(() => {
                    router.push('/' + testID.value);
                }).catch(error => {
                    console.error('Bejelentkezés sikertelen:', error);
                });
            }
        })
        if (!bool) {
                show()
            }
    }
        //signInWithGoogle()
} 

</script>
<template>



    <NavBar></NavBar>
    <Toast/>
    <div >
        <div v-if="store.getters.getLoading">
        <div class="flex justify-content-center flex-wrap mt-5">
            <div
                class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                <h2>Python és JavaScript oktató platform. </h2>

                Ha készen állsz,
                írd
                be a teszt nevét, majd jelentkezz be Google-fiókoddal, hogy elindíthasd a tesztet.
                Legyen sikeres a tanulás és a fejlődés útja!

                <InputGroup class="mt-5">
                    <InputGroupAddon>https://progmester.hu/</InputGroupAddon>
                    <InputText v-model="testID"/>
                    <Button @click="login()" label="Kezdés" />
                </InputGroup>
                <Toast />
            </div>

        </div>
       </div> 
       <div v-else>
            <div class="flex justify-content-center flex-wrap">
                <ProgressSpinner />
            </div>
        </div>
    </div>

   
        
  


    
    



</template>