<script setup>
import { ref, onMounted, computed, watch, inject, onBeforeMount } from 'vue';
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import store from '@/store/store.js';
import { getAllTest } from '@/firebase/test.js';
import { useRoute } from "vue-router";
//PrimeVue
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const show = () => {
    if(store.getters.getScoreEarned[store.getters.getCurrentTestSide -1] == undefined){ //hogy ne fusson le akkor is amikor visszalépek egy megoldott feladatra
        toast.add({ severity: 'success', summary: 'Helyes válasz!', detail: '', life: 3000 });
    }
};

//hljs
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
const py = inject('py');

//components
import NavBar from '@/components/home/NavBar.vue'
import CasesTable from '@/components/test/CasesTable.vue'
import StepSide from '../../components/maker/StepSide.vue';
import CodeRunnerTestFiller from '../../components/test/CodeRunnerTestFiller.vue';
import FootSteps from '../../components/test/FootSteps.vue';
import Score from '@/components/test/Score.vue'

//const emit = defineEmits(['update:taskCode'])

const testSheet = ref(store.getters.getTestSheet); //testID testlap összes mezője
const user = 'testFiller'
const totalScore = ref()
const finished = ref(false)

onMounted(() => {
    initTest().then(() => { //előbb szerverről lekérjük az adatot, aztán init a többi szükséges adatokat
        let score = 0
        store.getters.getTestSheet.task.forEach(task => {
            score = score + task.score
        })
        totalScore.value = score
    }); 
    signInWithGoogle()
});
const scoreAchieved = computed(() => {
    let sum = 0
    store.getters.getScoreEarned.forEach(score => {
        sum += score
    })
    return sum == null ? 0 : sum
});


async function initTest() {
    const router = useRoute() //címsorba beírt testID
    const tests = await getAllTest() //létező összes tesztet lekéri a szerverről
    //többszöri frissítés miatt, megnézzük hogy már be van-e töltve ez a tesztlap:
   
    if (!store.getters.getTestSheet) { //falsy (itt majd a felkiáltójelet el kell venni ha sessionba tárolod)
        if (testSheet.value.tid == router.params.testID) {
            console.log('be van töltve a: ' + testSheet.value.tid + ', nem csinálunk semmit')
        } else {
            console.log('másik tesztfeladatlpot kitöltése')
        }
    } else {
        console.log('üres, még nem volt betöltve semmi')
        tests.forEach(test => { //megkeressük a testID-jü tesztlapot
            if (test.tid == router.params.testID) {
                //mielőtt tároljuk a code-ot modosítjuk (ha esetleg kell megodlásnak a kód azt itt tudjuk kezelni, vagy lekérjuk fire-baseről)
                modyfiCode(test.task)
                console.log('1')
                store.commit('addTestSheet', test)
                testSheet.value = test
            }
        });
    }
    store.commit('setLoading', true)
}
function modyfiCode(codes) { //modosítjuk, hogy a teszkitöltő csak a függvény törzset lássa. Betöltés után modosítjuk az egészet, így könnyebb lesz később a kezelése.
    
    codes.forEach(code => {
        try {
            code.output = [] //itt fogjuk tárolni a kimeneti eredményeket feladatonként.
            code.displayTest = false //segédváltozó, a tesztesetek ne látszódjon csak futtatás után. isTest a tárolt érték ami azt tárolja hogy látszódjon a tesztesetek. 

            if (code.programmingLanguageName && code.programmingLanguageName.value == 'javascript' && code.code) { //js kód, és van kód beírva
                //console.log(code.programmingLanguageName.value)
                const functionName = code.code.replace(/^(function|\s+function)\s+/, '').match(/\w+/)[0];
                const paramsName = code.code.match(/\(.*\)/)[0]
                code.code = 'function ' + functionName + paramsName + '{\nreturn 0\n}'
                code.functionName = functionName //tároljuk a functionName-t
                //paraméterek kellenének még

            }
            if (code.programmingLanguageName && code.programmingLanguageName.value == 'python' && code.code) {
                const functionName = code.code.replace(/^(def|\s+def)\s+/, '').match(/\w+/)[0];
                const paramsName = code.code.match(/\(.*\)/)[0]
                code.code = 'def ' + functionName + paramsName + ':\n  return 0'
                code.functionName = functionName //tároljuk a functionName-t
                //console.log(code.code)
                //console.log(functionName)
                //store.commit('', codeCopy.match(/\w+/)[0])
            }
        } catch {
            console.log('hiba a kód átírása közben')
        }
    })
}
function testFinish(finishTest) {
    finished.value = finishTest // megjelenik a teszteredmény html-nél
    
}
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy


</script>

<template>
    <Toast/>
    <div v-if="hasCurrentUser">
        <NavBar :user="user" />
        <div v-if="store.getters.getLoading">
            
            <div v-if="finished">
                <Score :scoreAchieved="scoreAchieved" />
            
            </div>
            <div v-else>
                <!--This is a comment. Comments are not displayed in the browser-->
            <!-- {{ this.$route.params.testID }}  --> 

            <StepSide :tasks="store.getters.getTestSheet.task" currentSide="setCurrentTestSide" />
                <div v-for="task in store.getters.getTestSheet.task" :key="task.side">
                    <div v-if="task.side == store.getters.getCurrentTestSide" class="flex justify-content-center flex-wrap ">
                        <div class=" border-round surface-border mt-5 mb-3 p-4 w-full">
                            <div>
                                <div class="flex justify-content-between flex-wrap">
                                    <h2>{{ task.side }}. Oldal</h2>
                                </div>
                                <div
                                    class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                                    <div class="flex justify-content-end flex-wrap mr-5">{{store.getters.getScoreBySide}} pont ( {{scoreAchieved}} / {{ totalScore }} )</div>
                                    <div class="m-5" v-html="task.text"></div> 
                                    <div v-if="task.programmingLanguageName">
                                        <CodeRunnerTestFiller
                                            v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                            v-model:taskCode="task.code" :selectLanguage="task.programmingLanguageName.value"
                                            :tests="task.tests" />
                                    </div>
                                    <div v-if="store.getters.getDisplayTest" class="flex justify-content-center flex-wrap ">
                                    <div class=" border-round surface-border mt-5 mb-3 p-4 w-full">
                                        <CasesTable  @showToast="show" />
                                    </div>

                                </div>

                                </div>
                                <div
                                    class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-8 mb-3 p-4 ">
                                    <FootSteps @finish="testFinish" :scoreAchieved="scoreAchieved" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <div v-else>
            <div class="card">
                <div class="border-round border-1 surface-border p-4 surface-card">
                    <div class="flex mb-3">
                        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                        <div>
                            <Skeleton width="10rem" class="mb-2"></Skeleton>
                            <Skeleton width="5rem" class="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="150px"></Skeleton>
                    <div class="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div v-else>
       
               
        
    </div>

    
    

    
       
       
        
    
</template>

<style scoped>
.custom-area {
    overflow: auto;

}
</style>
